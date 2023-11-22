import Inner from "@/components/Inner"
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword} from "firebase/auth"
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled, {css} from "styled-components"

type SignForm = {
    email: string;
    password: string;
}

const SignIn = () => {

    const [signForm, setSignForm] = useState<SignForm>({
        email:"",
        password: ""
    });

    type HandleClickSigninProps = {
        email:string;
        password:string;
    }

    const navigate = useNavigate();

    const handleClickSignForm = ({email, password}: HandleClickSigninProps) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('회원가입 완료');
            navigate("/Login");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            switch (errorCode) {
                case "auth/invalid-email": 
                    alert('잘못된 이메일 형식입니다.');
                    break;
                case "auth/email-already-in-use": 
                    alert('이미 사용중인 이메일입니다.');
                    break;
                case "auth/missing-password" :
                    alert('비밀번호를 입력해주세요.');
                    break;
                case "auth/invalid-login-credentials" :
                    alert('잘못된 아이디/비밀번호 입니다.');
                    break;
                case "auth/weak-password" :
                    alert('비밀번호가 너무 짧습니다');
                    break;
                case "auth/too-many-requests" :
                    alert('잠시후 다시 시도해주세요.');
                    break;
                case "auth/network-request-failed":
                    alert( "네트워크 연결에 실패 하였습니다.");
                    break;
                case "auth/internal-error":
                    alert( "잘못된 요청입니다.");
                    break;
                default :
                    alert(errorCode);
                    break;
            }
        });
    }

    const handleChangeInput = (event:ChangeEvent<HTMLInputElement>)=> {
        setSignForm((prev)=> ({
            ...prev,
            [event.target.name]:event.target.value
        }))  
    }

    return (
        <Inner>
            <SigninForm>
                    <InputWrapper>
                        <InputTitle>아이디</InputTitle>
                        <InputBox  name="email" type="text" placeholder="아이디를 입력하세요" onChange={handleChangeInput} />
                    </InputWrapper>
                    <InputWrapper>
                        <InputTitle>비밀번호</InputTitle>
                        <InputBox  name="password" type="password" placeholder="비밀번호를 입력하세요" onChange={handleChangeInput} />
                    </InputWrapper>
                    <ButtonWrapper>
                        <button type="submit" onClick={()=> handleClickSignForm({
                            email: signForm.email,
                            password: signForm.password
                        })}>회원가입</button>
                    </ButtonWrapper>
            </SigninForm>
        </Inner>
    )
}
export default SignIn


const SigninForm = styled.div `
    
`


export const InputWrapper = styled.div`
    position: relative;
	margin-top: 12px;
	text-align: left;
`

export const InputTitle = styled.strong`
    display: block;
    color: ${props=>props.theme.colors.black};
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
`

export const InputBox = styled.input `
    padding: 0 14px;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #111;

    &+input {
        margin-top: 8px;
    }
`

export const ButtonWrapper = styled.div `
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;

    button {
        width: 120px;
        height: 42px;
        font-size: 16px;
        font-weight: 700;
        border: none;
        border-radius: 12px;
        ${({theme})=>css`
            color: ${theme.colors.white};
            background-color: ${theme.colors.black};;
        `};
        cursor: pointer;
    }
`
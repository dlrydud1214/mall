
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import { auth } from "@/firebase";
import Inner from "@/components/Inner";

type LoginForm = {
    email:string;
    password:string;
    name:string;
}

const LoginTab = () => {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email:"",
        password:"",
        name:""
    });

    const navigate = useNavigate();

    const goToSign = () => {
        navigate("/SignIn");
    }

    type HandleClickLoginProps = {
        email:string;
        password:string,
        name: string;
    }

    const handleClickLogin = ({email, password}: HandleClickLoginProps) => {
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            //signed in
            alert("로그인성공");
            navigate("/Home");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            switch (errorCode) {
                case "auth/invalid-email": 
                    alert('잘못된 이메일 형식입니다.');
                    break;
                case "auth/missing-password" :
                    alert('비밀번호를 입력해주세요.');
                    break;
                case "auth/invalid-login-credentials" :
                    alert('잘못된 아이디/비밀번호 입니다.');
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
                    alert(errorMessage) ;
                    break;
            }
        });
    }

    const handleChangeInput = (event:ChangeEvent<HTMLInputElement>)=> {
        setLoginForm((prev)=> ({
            ...prev,
            [event.target.name]:event.target.value
        }))  
    }


    return (
        <LoginContetns>
            <h1>로그인</h1>
            <Inner>
                <FormWrapper >
                    <InputWrapper>
                        <InputTitle>아이디</InputTitle>
                        <InputBox  name="email" placeholder="아이디를 입력하세요" onChange={handleChangeInput} />
                    </InputWrapper>
                    <InputWrapper>
                        <InputTitle>비밀번호</InputTitle>
                        <InputBox name="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete="off" onChange={handleChangeInput}/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputTitle>이름</InputTitle>
                        <InputBox name="name" type="text" placeholder="이름을 입력하세요" onChange={handleChangeInput}/>
                    </InputWrapper>

                    <ButtonWrapper>
                        <button type="submit" onClick={()=> handleClickLogin({
                            email:loginForm.email,
                            password:loginForm.password,
                            name:loginForm.name
                        })}>로그인</button>
                        <button onClick={goToSign}>회원가입</button>
                    </ButtonWrapper>
                </FormWrapper>
            </Inner>
        </LoginContetns>
    )
}

export default LoginTab


export const LoginContetns = styled.div`
    padding-top: 80px;
    padding-bottom: 120px;

    h1 {
        font-size: 36px;
        line-height: 42px;
        font-weight: 700;
        text-align: center;
    }
`

export const FormWrapper = styled.div`
    margin-top: 80px;
    max-width: 400px;
    margin: 0 auto;
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
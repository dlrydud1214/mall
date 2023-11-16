import { ChangeEvent, FormEventHandler, useState } from "react";
import styled, { css } from "styled-components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId:process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId:process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const analytics = getAnalytics(app);

type LoginForm = {
    email:string;
    password:string;
    name:string;
}

const LoginTab = ()=> { 
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email:"",
        password:"",
        name:""
    })

    
    type HandleClickLoginProps = {
        email:string;
        password:string,
        name: string;
    }

    const handleClickLogin = ({email, password, name}: HandleClickLoginProps) => {
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signed in
            const user = userCredential.user;
            alert("로그인성공");
            const myName = document.querySelector('.myname');
            if (myName !== null) {
                myName.innerHTML=`${name}님 환영합니다`
            } 
            

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

            // if(errorCode == "auth/invalid-email") {
            //     alert('이메일을 입력해주세요')
            // } else {
            //     alert(errorCode)
            // }
        });
    }
    
    const handleChangeInput = (event:ChangeEvent<HTMLInputElement>)=> {
        setLoginForm((prev)=> ({
            ...prev,
            [event.target.name]:event.target.value
        }))  
    }

    // const handleSetInputForm = <P extends keyof LoginForm>(key: P, value:LoginForm[P])=> {
    //     setLoginForm((prev)=> ({
    //         ...prev,
    //         [key]:value
    //     }))  
    // }

    // handleSetInputForm('age', 12)

    return (
        <LoginContetns>
            <h1>로그인</h1>
                <FormWrapper>
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
                        <InputBox name="name" type="text" placeholder="비밀번호를 입력하세요" onChange={handleChangeInput}/>
                    </InputWrapper>

                    <ButtonWrapper>
                        <button type="submit" onClick={()=> handleClickLogin({
                            email:loginForm.email,
                            password:loginForm.password,
                            name:loginForm.name
                        })}>로그인</button>
                        <button>회원가입</button>
                        <p className="myname"></p>
                    </ButtonWrapper>
                </FormWrapper>
        </LoginContetns>
    )
}

export default LoginTab;

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
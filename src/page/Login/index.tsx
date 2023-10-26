import Inner from "@/components/Inner";
import styled, { css } from "styled-components";


const LoginTab = () => { 
    return (
        <LoginContetns>
            <h1>로그인</h1>
            <Inner>
                <FormWrapper>
                    <InputWrapper>
                        <InputTitle>아이디</InputTitle>
                        <InputBox name="id" placeholder="아이디를 입력하세요"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputTitle>비밀번호</InputTitle>
                        <InputBox name="password" type="password" placeholder="비밀번호를 입력하세요" />
                    </InputWrapper>
                    <ButtonWrapper>
                        <button>로그인</button>
                        <button>회원가입</button>
                    </ButtonWrapper>
                </FormWrapper>
            </Inner>
        </LoginContetns>
    )
}

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

export default LoginTab;
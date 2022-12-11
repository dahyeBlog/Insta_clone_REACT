import React from 'react'
import styled from 'styled-components'

const Login = () => {
  return (
    <Container>
      <Main>
        <Form>
          <Logo><img src='./instagram-text-logo.png' alt="" /></Logo>
        <InputContainer>
          <input type="email" placeholder='Email' />
        </InputContainer>
        <InputContainer>
          <input type="password" placeholder='Password' />
        </InputContainer>

        <button>Log in</button>
        </Form>

        <SignUpContainer>
          <p>인스타 계정이 없으세요? <span>Sign Up</span> </p>
        </SignUpContainer>
      </Main>
    </Container>
  )
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Main = styled.main`
`
const Form = styled.form`
  background: #fff;
  border: 1px solid #eee;
  padding: 20px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  
  button {
   height: 33px;
   width: 230px;
   background: #0095f6;
   border: none;
   outline: none;
   border-radius: 5px;
   margin-top: 30px;
   font-size: 14px;
   color: #fff;
   cursor: pointer;
  }
`
const Logo = styled.div`
  width: 250px;
  img {
    width: 100%;
  }
`
const InputContainer = styled.div`
  height: 25px;
  width: 250px;
  margin-top: 20px;
  input {
    height: 100%;
    width: 100%;
    background-color: #fafafa;
    border: 1px solid #eee;
    padding: 5px;
  }
`
const SignUpContainer = styled.div`
  border: 1px solid #eee;
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 14px;

    span {
      color: #18a4f8;
      font-weight: 600;
      cursor: pointer;
    }
  }
`

export default Login
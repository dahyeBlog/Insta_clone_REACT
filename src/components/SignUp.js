import React, {useState} from 'react'
import styled from 'styled-components'
import {query,getDocs,collection,where, setDoc,doc} from 'firebase/firestore'
import db, {auth} from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const navigate = useNavigate()

  const createAccount = async (e) => {
    e.preventDefault()
    const username_query = await query(
        collection(db, 'users'),
        where('userName', '==', userName)
      )
    
      const username_exists = await getDocs(username_query)

      if(username_exists.docs.length === 0) {
        if(userName.length > 0 && email.length > 0 && password.length > 0) {
          createUserWithEmailAndPassword(auth, email, password)
           .then(async (userCredential) => {
            updateProfile(userCredential.user, {
              displayName: userName,
              photoURL: photoURL,
            })

            await setDoc(doc(db, 'users', userCredential.user.uid), {
              email,
              userName,
              photoURL
            })

            setEmail("")
            setPassword("");
            setPhotoURL("");
            setUserName("");

            alert("계정이 생성되었습니다.")
            navigate('/login')
          })
          .catch((err) => alert(err))
        } else {
          alert('정보를 입력해주세요.');
        }
      } else {
        alert('당신은 이미 가입하셨습니다. ');
      }
      
    }
  
  return (
    <Container>
    <Main>
      <Form onSubmit={createAccount}>
        <Logo><img src='./instagram-text-logo.png' alt="" /></Logo>
      <InputContainer>
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <input type="text" placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <input type="text" placeholder='PhotoURL (Optional)' value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
      </InputContainer>

      <button onClick={createAccount}>Sign Up</button>
      </Form>

      <LoginContainer>
        <p>인스타 계정이 있으세요? <span onClick={() => navigate('/login')}>Log in</span> </p>
      </LoginContainer>
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
const LoginContainer = styled.div`
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

export default SignUp
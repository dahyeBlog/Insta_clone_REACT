import React, { useState } from "react";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useStateValue } from "../StateProvier";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{}, dispatch] = useStateValue();

  const navigate = useNavigate();

  const emailHandler = (e) => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (regex.test(e.target.value) === true) {
      setEmail(e.target.value);
    } else {
      setEmail(e.target.value);
      setError("이메일 형식에 맞게 입력하세요.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        const newUser = {
          userName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };

        dispatch({
          type: "SET_USER",
          user: newUser,
        });

        localStorage.setItem("user", JSON.stringify(newUser));
        navigate("/");
      })
      .catch((err) => alert(err));
  };
  return (
    <LoginContainer>
      <LoginWrapper>
        <LogoImg>
          <img src="./instagram-text-logo.png" alt="" />
        </LogoImg>
        <LoginForm onSubmit={loginHandler}>
          <div className="inputAlign">
            <EmailIcon className="icon" />
            <input
              type="text"
              placeholder="Email을 입력하세요."
              value={email}
              onChange={emailHandler}
            />
          </div>
          <div className="inputAlign">
            <LockIcon className="icon" />
            <input
              type="password"
              maxLength="10"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <LoginButton type="submit" onClick={loginHandler}>
            로그인
          </LoginButton>
          {error && <div className="error">{error}</div>}
        </LoginForm>
        <SignContainer>
          <p>
            인스타 계정이 없으세요?
            <span onClick={() => navigate("/signup")}>Sign up</span>{" "}
          </p>
        </SignContainer>
      </LoginWrapper>
    </LoginContainer>
  );
};
const LoginContainer = styled.div`
  height: calc(100vh-7rem);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
`;
const LoginWrapper = styled.div`
  width: 400px;
  height: 400px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #eee;
`;
const LogoImg = styled.div`
  img {
    width: 200px;
    margin: 30px 0;
  }
`;
const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .inputAlign {
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    z-index: 1;
    opacity: 1;
  }
  input {
    width: 250px;
    height: 30px;
    border: none;
    text-shadow: center;
    margin-left: 10px;
    overflow: auto;
    z-index: -1;
    font-size: 14px;
    -webkit-appearance: none;
  }
  input:focus {
    width: 250px;
    border: none;
    outline: none;
  }

  .error {
    color: #dc3535;
    font-size: 14px;
    margin-top: 2rem;
  }

  .icon {
    color: #d8d9cf;
    font-size: 16px;
  }
`;
const LoginButton = styled.button`
  color: #fff;
  background: #0095f6;
  border: none;
  padding: 10px;
  width: 5rem;
  border-radius: 10px;
  cursor: pointer;
`;
const SignContainer = styled.div`
  border-top: 1px solid #eee;
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 20px;
    font-size: 14px;

    span {
      color: #0095f6;
      font-weight: 500;
      cursor: pointer;
      padding-left: 10px;
    }
  }
`;
export default Login;

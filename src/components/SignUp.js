import React, { useState } from "react";
import styled from "styled-components";
import db, { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import PhotoIcon from "@mui/icons-material/Photo";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [photoURL, setPhotoURL] = useState("");

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

  const phoneHandler = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhone(e.target.value);
    } else {
      setError("전화번호를 숫자로 입력해주세요.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    const username_query = await query(
      collection(db, "users"),
      where("userName", "==", userName)
    );
    const username_exists = await getDocs(username_query);

    if (username_exists.docs.length === 0) {
      if (
        userName.length > 0 &&
        password.length > 0 &&
        phone.length > 0 &&
        email.length > 0
      ) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // console.log(userCredential.user);

            updateProfile(userCredential.user, {
              displayName: userName,
              photoURL: photoURL,
            });

            await setDoc(doc(db, "users", userCredential.user.uid), {
              email,
              userName,
              phone,
              photoURL,
            });

            setEmail("");
            setPassword("");
            setPhotoURL("");
            setUserName("");

            alert("가입이 완료되었습니다.");
            setTimeout(() => {
              setError("");
            }, 3000);
            navigate("/login");
          })
          .catch((error) => {
            setError("이미 가입된 이메일 계정입니다.");
            setTimeout(() => {
              setError("");
            }, 3000);
          });
      } else {
        setError("입력창에 입력을 해주세요.");

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } else {
      setError("이미 사용중인 사용자 이름이 있습니다.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <SignupContainer>
      <SignupWrapper>
        <LogoImg>
          <img src="./instagram-text-logo.png" alt="" />
        </LogoImg>
        <SignupForm onSubmit={signupHandler}>
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
          <div className="inputAlign">
            <PersonIcon className="icon" />
            <input
              type="text"
              maxLength="20"
              placeholder="이름을 입력하세요."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="inputAlign">
            <PhoneIcon className="icon" />
            <input
              type="tel"
              maxLength="10"
              placeholder="전화번호를 입력하세요."
              value={phone}
              onChange={phoneHandler}
            />
          </div>

          <div className="inputAlign">
            <PhotoIcon className="icon" />
            <input
              type="test"
              placeholder="프로필를 입력하세요.(선택사항)"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <SignupButton onClick={signupHandler}>가입</SignupButton>
          {error && <div className="error">{error}</div>}
        </SignupForm>
        <LoginContainer>
          <p>
            인스타 계정이 있으세요?
            <span onClick={() => navigate("/login")}>Log in</span>{" "}
          </p>
        </LoginContainer>
      </SignupWrapper>
    </SignupContainer>
  );
};
const SignupContainer = styled.div`
  height: calc(100vh-7rem);
  /* height: 100vh; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
  /* justify-content: center; */
`;
const SignupWrapper = styled.div`
  width: 400px;
  height: 500px;
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
const SignupForm = styled.form`
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
    /* padding: 10px 15px;
    line-height: 10px;
    outline: none;
    border-radius: 3px; */
  }
  input:focus {
    width: 250px;
    border: none;
    outline: none;
    /* border: 1px solid gainsboro; */
  }

  .error {
    color: #dc3535;
    font-size: 14px;
    margin-top: 2rem;
  }

  .icon {
    color: #d8d9cf;
    /* margin-right: 5px; */
    font-size: 16px;
  }
`;
const SignupButton = styled.button`
  color: #fff;
  background: #0095f6;
  border: none;
  padding: 10px;
  width: 5rem;
  border-radius: 10px;
  cursor: pointer;
`;
const LoginContainer = styled.div`
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
export default SignUp;

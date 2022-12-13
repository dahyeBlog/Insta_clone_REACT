import React from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvier";

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);

  const navigate = useNavigate();

  const logout = (e) => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");

      dispatch({ type: "SET_USER", user: null });
    });
    navigate('login')
  };

  return (
    <NavContainer>
      <NavHeaderWrapper>
        <img src="./instagram-text-logo.png" alt="logo" />
        <NavHeaderButton>
          <button>LogIn</button>
          <button>SignUp</button>
          <button onClick={logout}>LogOut</button>
        </NavHeaderButton>
      </NavHeaderWrapper>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  background: #fff;
  height: 54px;
  width: 100vw;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const NavHeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    height: 50px;
  }
`;
const NavHeaderButton = styled.div`
  button {
    margin-left: 1rem;
    cursor: pointer;
    font-size: 14px;
    border: 1px solid transparent;
    border-radius: 3px;
    color: #0095f6;
    background: #fff;
    padding: 0.5rem;
  }
`;

export default Navbar;

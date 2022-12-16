import React, { useState } from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import db, { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvier";
import PostImgModal from "../UI/PostImgModal";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setModalOpen(true);
  };

  const logout = (e) => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");

      dispatch({ type: "SET_USER", user: null });
    });
    navigate("/login");
  };

  return (
    <>
      {modalOpen && <PostImgModal setModalOpen={setModalOpen} />}
      <NavContainer>
        <Link to={"/"}>
          <Logo>
            <img src="./instagram-text-logo.png" alt="logo" />
          </Logo>
        </Link>

        <Icons>
          <Link to={"/"}>
            <Icon>
              <img src="./home.svg" alt="" />
            </Icon>
          </Link>
          <Icon>
            <img src="./card.svg" onClick={showModal} alt="" />
          </Icon>
          <Icon>
            <img src="./chat.svg" alt="" />
          </Icon>
          <Icon>
            <img
              src={user?.photoURL === null ? "./user.png" : user?.photoURL}
              alt=""
            />
          </Icon>
        </Icons>

        <Menu>
          <MenuElement onClick={() => navigate("/profile")}>
            Profile
          </MenuElement>
          <MenuElement onClick={logout}>Logout</MenuElement>
        </Menu>
      </NavContainer>
    </>
  );
};

const NavContainer = styled.div`
  height: 60px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  border-bottom: 1px solid lightgray;
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  @media only screen and (max-width: 768px) {
    justify-content: space-around;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    width: 120px;
  }
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  justify-content: space-evenly;
  height: 40px;
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
  }

  &:nth-child(4) {
    img {
      border-radius: 50%;
      border: 1px solid #eee;
    }
    position: relative;
  }
`;

const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`;
const MenuElement = styled.div`
  color: #000;
  /* border: 1px solid #eee; */
  padding: 10px;
  &:nth-child(1) {
    border-right: 1px solid #eee;
  }
  &:hover {
    background-color: #e4e4e4;
    cursor: pointer;
  }
`;

export default Navbar;

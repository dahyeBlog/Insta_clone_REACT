import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import db, { auth } from "../firebase";
import { useStateValue } from "../StateProvier";
const PostImgModal = ({ setModalOpen }) => {
  const [{user}] = useStateValue()
  const [imageURL, setImageURL] = useState("");
  const [caption, setCaption] = useState("")
    
  const closeModal = () => {
    setModalOpen(false);
  };

  const createPost = (e) => {
    e.preventDefault();
    // console.log(imageURL,caption);
    addDoc(collection(db,  "posts"), {
      caption,
      imageURL,
      userName: user.userName,
      photoURL: user.photoURL === null ? './user.png' : user.photoURL,
      timeStamp: serverTimestamp()
    })
    alert('사진이 등록되었습니다 🚀🚀🚀🚀')

    setCaption("")
    setImageURL("")
    closeModal()
  }


  return (
    <CreatePostForm onSubmit={createPost}>
      <h2>사진 올리기</h2>
      <InputContainer>
        <input
          type="text"
          placeholder="ImageURL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <textarea
          type="text"
          placeholder="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </InputContainer>
      <PostButton>
      <button className="cancel-button" onClick={closeModal}>
        취소
      </button>
      <button className="post-button"  onClick={createPost}>
        등록
      </button>
      </PostButton>
    </CreatePostForm>
          
  );
};

const CreatePostForm = styled.form`
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: #eee;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
   
  h2 {
  margin: 20px;
  }
`;
const InputContainer = styled.div`
width: 90%;
height: 33px;
margin-bottom: 20px;
input {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  padding: 5px;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
}
textarea {
    width: 100%;
    height: 200px;
    resize: none;
    border: 1px solid #eee;
    padding: 5px;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  }
`;
const PostButton = styled.div`
  position: absolute;
  bottom: 0;
  button {
    width: 100px;
    height: 33px;
    margin-right: 10px;
    margin-bottom:10px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
  }
    .cancel-button{
    background-color: #E26868;
    }
    .post-button {
    background-color: #34B3F1;
  }

`

export default PostImgModal;

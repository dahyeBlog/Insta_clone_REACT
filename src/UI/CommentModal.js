import React from "react";
import styled from "styled-components";

const CommentModal = ({setOpenCommentModal,commentsOnPost}) => {

  const closeModal = () => {
    setOpenCommentModal(false)
  };

  return (
    <CreatePostForm onSubmit={() => {}}>
      <h2>모든 댓글보기</h2>
      <AllCommentContainer>
        {commentsOnPost.map((comment) => (
          <div key={comment.id} className="post-comment">
            <div className="user-image">
              <img src={comment?.data().photoURL} alt="" />
            </div>
            <div className="user-comment">
              <strong>{comment?.data().userName}</strong>
              <p>{comment?.data().commentInput}</p>
            </div>
          </div>
        ))}
      </AllCommentContainer>

      <PostButton>
      <button className="close-button" onClick={closeModal}>
        확인
      </button>
      </PostButton>
    </CreatePostForm>
          
  );
};

const CreatePostForm = styled.form`
  width: 30%;
  height: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  position: absolute;
  background-color: #eee;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
   
  h2 {
  margin: 20px;
  }
`;

const AllCommentContainer = styled.div`
  padding: 15px;
  .post-comment {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .user-image {
      margin-right: 20px;
      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
    }

    .user-comment{
      display: flex;
      font-size: 13px;
      strong {
        margin-right: 10px;
      }
    }
  }
`

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
    .close-button{
      background-color: #34B3F1;
    }
`

export default CommentModal;

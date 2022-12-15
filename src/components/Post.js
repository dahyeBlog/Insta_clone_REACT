import React, { useState, useEffect } from "react";
import {
  serverTimestamp,
  doc,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";
import db from "../firebase";
import styled from "styled-components";
import { useStateValue } from "../StateProvier";
import CommentModal from "../UI/CommentModal";
import { async } from "@firebase/util";

const Post = ({ userName, photoURL, caption, imageURL, postId }) => {
  const [{ user }] = useStateValue();
  const [moreButton, setMoreButton] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  const [likesOnPost, setLikesOnPost] = useState({
    likes: [],
  });

  const [likeState, setLikeState] = useState({
    like: likesOnPost?.likes.length > 0 ? likesOnPost?.likes.length : 0,
    likeActive: false,
  });

  const [commentsOnPost, setCommentsOnPost] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleLike = async (e) => {
    e.preventDefault();
    if (likesOnPost?.likes.includes(user?.userName)) {
      //dislike part
      const likePayload = {
        likes: likesOnPost?.likes.filter((likedUser) => {
          return likedUser !== user?.userName;
        }),
      };
      await setDoc(doc(db, "likes", postId), likePayload);
      setLikesOnPost({
        likes: likePayload.likes,
      });
    } else {
      //like part
      const likePayload = {
        likes: [...likesOnPost.likes, user?.userName],
      };

      setLikesOnPost(likePayload);

      await setDoc(doc(db, "likes", postId), likePayload);

      setLikesOnPost({
        likes: likePayload.likes,
      });
    }
  };

  const getLikes = async () => {
    const docRef = doc(db, "likes", postId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLikesOnPost(docSnap.data());
    }

    setLikeState({
      like: docSnap.data()?.likes.length ? docSnap.data()?.likes.length : 0,
      likeActive: docSnap.data()?.likes.includes(user.userName) ? true : false,
    });
  };

  useEffect(() => {
    getLikes();
  }, [likeState]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (commentInput.length > 0) {
      let payload = {
        commentInput,
        userName: user.userName,
        photoURL: user.photoURL,
        timeStamp: serverTimestamp(),
      };

      const docRef = doc(db, "comments", postId);

      addDoc(collection(docRef, "list"), payload);

      setCommentInput("");
    } else {
      alert("댓글을 입력하세요.");
    }
  };

  const getComments = async () => {
    const q = query(
      collection(db, "comments", postId, "list"),
      orderBy("timeStamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setCommentsOnPost(snapshot.docs);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Container>
      {openCommentModal ? (
        <CommentModal
          setOpenCommentModal={setOpenCommentModal}
          commentsOnPost={commentsOnPost}
        />
      ) : (
        ""
      )}
      <UserInfo>
        <img src={photoURL} alt="" />
        <p>{userName}</p>
      </UserInfo>
      <Content>
        <img src={imageURL} alt="" />
      </Content>

      <PostCTA>
        <CTAButtons>
          {likeState.likeActive ? (
            <img src="./heart (1).png" alt="" onClick={handleLike} />
          ) : (
            <img src="./heart.png" alt="" onClick={handleLike} />
          )}
          <img
            onClick={() => setOpenCommentModal(true)}
            src="./chat 1.png"
            alt=""
          />
        </CTAButtons>

        <LikeCount>
          <p>{likesOnPost.likes.length}</p>
        </LikeCount>

        <PostDescription moreButton={moreButton}>
          <h5>{caption}</h5>

          <div className="recent-comment">
            <strong>{commentsOnPost[0]?.data().userName}</strong>
            <p>{commentsOnPost[0]?.data().commentInput}</p>
          </div>
          <div className="recent-comment">
            <strong>{commentsOnPost[1]?.data().userName}</strong>
            <p>{commentsOnPost[1]?.data().commentInput}</p>
          </div>

          <div className="description-buttons">
            <p onClick={() => setOpenCommentModal(true)}>모든 댓글 보기</p>
            <p onClick={() => setMoreButton(!moreButton)}>
              {moreButton ? "less" : "more"}
            </p>
          </div>
        </PostDescription>

        <CommentInput>
          <input
            type="text"
            placeholder="댓글 작성하기"
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          />
          <button type="submit" onClick={handleComment}>
            등록
          </button>
        </CommentInput>
      </PostCTA>
    </Container>
  );
};

const Container = styled.div`
  height: fit-content;
  width: 100%;
  border: 1px solid #eee;
  background-color: #fff;
  margin-top: 20px;
`;
const UserInfo = styled.div`
  height: 60px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;

  img {
    width: 38px;
    height: 38px;
    border-radius: 100%;
    margin-left: 10px;
    border: 1px solid #eee;
  }

  p {
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    margin-left: 10px;
  }
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #eee;

  img {
    width: 100%;
  }
`;

const PostCTA = styled.div`
  width: 90%;
  margin: auto;
`;
const CTAButtons = styled.div`
  height: 54px;
  display: flex;
  align-items: center;

  img {
    width: 22px;
    height: 22px;
    margin-right: 10px;
    cursor: pointer;
  }
`;
const LikeCount = styled.div`
  p {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const PostDescription = styled.div`
  display: flex;
  flex-direction: column;

  h5 {
    font-size: 14px;
    line-height: 20px;
    border: none;
    width: 100%;
    height: ${(props) => (props.moreButton ? "fit-content" : "40px")};
    overflow-y: hidden;
    word-break: break-all;
    min-height: 40px;
    font-weight: 500;
  }

  .description-buttons {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    color: gray;
    p {
      cursor: pointer;
    }
  }
  .recent-comment {
    margin-top: 10px;
    font-size: 13px;
    display: flex;
    align-items: center;
    strong {
      margin-right: 10px;
    }
  }
`;
const CommentInput = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eee;

  input {
    width: 80%;
    height: 30px;
    border: none;
    margin-right: 10px;
    outline: none;
  }

  button {
    background-color: transparent;
    border: 1px solid #eee;
    outline: none;
    padding: 10px;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #eee;
  }
`;

export default Post;

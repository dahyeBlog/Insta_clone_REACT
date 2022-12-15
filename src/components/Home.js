import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import Post from "./Post";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import db from "../firebase";
const Home = () => {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    const fetchPost = () => {
      const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));

      onSnapshot(q, (snapshot) => {
        setAllPost(snapshot.docs);
      });
    };

    fetchPost();
  }, []);

  return (
    <Container>
      <Navbar />
      <Inner>
        <Main>
          <PostContainer>
            {allPost.map((post) => (
              <Post
                userName={post.data().userName}
                photoURL={post.data().photoURL}
                caption={post.data().caption}
                imageURL={post.data().imageURL}
                postId={post.id}
                key={post.id}
              />
            ))}
          </PostContainer>
        </Main>
      </Inner>
    </Container>
  );
};
const Container = styled.div``;
const Inner = styled.div`
  width: 100%;
  margin-top: 60px;
`;
const Main = styled.div`
  max-width: 935px;
  margin: 20px auto;
  height: 680px;
  display: flex;
  justify-content: space-evenly;
`;
const PostContainer = styled.div`
  max-width: 620px;
  width: 100%;
`;

export default Home;

import React from 'react'
import styled from 'styled-components'

const Post = ({ userName, photoURL, caption, imageURL, postID}) => {
  return (
    <Container>
    <UserInfo>
      <img src={photoURL} alt="" />
      <p>{userName}</p>
    </UserInfo>
    <Content>
      <img src={imageURL} alt="" />
    </Content>
    </Container>
  )
}

const Container = styled.div`
  height: fit-content;
  width: 100%;
  border: 1px solid #eee;
  background-color: #fff;
  margin-top: 20px;
`
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
font-size:14px;
line-height: 18px;
font-weight: 600;
margin-left: 10px;
}

`
const Content = styled.div`
width: 100%;
display: flex;
border-bottom: 1px solid #eee;

img {
width: 100%;
}
`

export default Post
import { collection , query} from 'firebase/firestore'
import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import db from '../firebase'
import { useStateValue } from '../StateProvier'
import Post from './Post'

const Home = () => {
const [{user}] = useStateValue() 


const fetchPost = () => { 
  const q = query(collection(db, 'posts'))

  console.log(q);
  
}

useEffect(() => {
  fetchPost()
}, [])


  return (
    <Container>
    <Navbar />
      <Inner>
        <Main>
          <PostContainer>
            <Post />
          </PostContainer>
        </Main>
      </Inner>
    </Container>
  )
}
const Container = styled.div`
`
const Inner = styled.div`
  width: 100%;
  margin-top: 60px;
`
const Main = styled.main`
  max-width: 935px;
  margin: 20px auto;
  height: 680px;
  display: flex;
  justify-content: space-evenly;
`
const PostContainer = styled.div`
  max-width: 620px;
  width: 100%;
`

export default Home
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/signup' element={<SignUp />} />
         <Route path='/login' element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div``;
export default App;

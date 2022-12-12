# 인스타그램 클론 코딩

## 사용한 라이브러리
- react-router-dom v6.3.0
- styled-components
- npm install @mui/material @emotion/react @emotion/styled

## 폴더 상세설명 
 -components
  -Home.js
  -Login.js
  -SignUp.js
  -Navbar.js
  
## firebase를 이용해 인증 데이터 생성
- createUserWithEmailAndPassword : 사용자의 새로운 계정을 생성할 수 있게 email, password를 받아 User Account를 생성시키고 바로 로그인하며, 나중에 Account를 가지고 로그인 할수 있다. (계정이 이미 존재하거나, 타당하지 않은 값인 경우 return)

## 인증 기능 Context 구현
- 회원 가입 후 로그인을 하면 서버로 부터 발급받은 토큰을 locaStorage에 저장하게 되고, 이 로그인 정보를 전체페이지에서 사용하게 된다. 
- 로그인 여부를 확인하거나, 로그아웃 기능을 별도로 구현하는 번거로움을 줄이기 위해 authContext라는 별도의 context를 별도로 만들어 필요한 컴포넌트에서 이를 사용할 수 있도록 하였다.


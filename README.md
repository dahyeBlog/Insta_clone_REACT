# 인스타그램 클론 코딩
- React 를 통해 앱을 Firebase 로 백엔드에 연결하여 가입하고 게시물 업로드 및 게시물에 댓글 추가 기능을 구현해봤다.

## 사용한 라이브러리
- react-router-dom v6.3.0
- styled-components
- npm install @mui/material @emotion/react @emotion/styled

## 폴더 상세설명 
```bash
src
 ┣ UI
 ┃ ┣ CommentModal.js
 ┃ ┗ PostImgModal.js
 ┣ components
 ┃ ┣ Home.js
 ┃ ┣ Login.js
 ┃ ┣ Navbar.js
 ┃ ┣ Post.js
 ┃ ┣ Profile.js
 ┃ ┗ SignUp.js
 ┣ App.js
 ┣ StateProvier.js
 ┣ firebase.js
 ┣ index.css
 ┣ index.js
 ┗ reducer.js
```
### Home.js
- 업로드한 포스트를 데이터베이스에서 가져오는 기능수행
- 포스트한 데이터를 가져와 Post.js에 전달함

### SignUp.js
- firebase를 이용해 인증 데이터 생성
- createUserWithEmailAndPassword : 사용자의 새로운 계정을 생성할 수 있게 email, password를 받아 User Account를 생성시키고 바로 로그인하며, 나중에 Account를 가지고 로그인 할수 있다. (계정이 이미 존재하거나, 타당하지 않은 값인 경우 return)

### Login.js
- 로그인 기능 넣기
- 인증 기능 Context 구현
- 회원 가입 후 로그인을 하면 서버로 부터 발급받은 토큰을 locaStorage에 저장하게 되고, 이 로그인 정보를 전체페이지에서 사용하게 된다. 
- 로그인 여부를 확인하거나, 로그아웃 기능을 별도로 구현하는 번거로움을 줄이기 위해 별도의 context를 별도로 만들어 필요한 컴포넌트에서 이를 사용할 수 있도록 하였다.

### Navbar.js
- 로그아웃 기능 넣기
- 상단 메뉴아이콘을 이용해 사진을 등록할 수 있도록 함

### PostImgModal.js
- modal 창을 이용해 이미지의 포스팅 창을 열수 있도록 함
- 입력한 url 및 캡션 사항을 입력해 firebase 데이터 베이스에 저장함.

### CommentModal.js
- 모든 댓글을 볼 수 있도록함.

### Profile.js
- 로그인한 계정에서 등록한 post들을 볼 수 있음.

### Post.js
- 포스트한 이미지를 가져와 화면에 나타나도록함
- 댓글기능 및 좋아요 기능 추가


## 배운 내용
- firebase의 사용량을 초과하는 바람에 프로젝트를 다시 생성하고 오류를 잡았다. 잊고 있었는데 다시한번 상기 시킬 수 있었다.
- PERMISSION_DENIED: Missing or insufficient permissions 이라는 오류가 계속 뜨는 바람에 계속 찾아 보다가 해결방법을 찾아 규칙을 수정 했지만 (allow read, write:  if request.auth != null;) 보안 규칙에 취약하기 때문에 프로덕트 환경에서 쓸 수 있는 해결방법은 아니다라는 것을 알게 되었다. 

## 해결한 내용
- Netlify에 배포를 했지만 화면이 보이지 않는 오류가 계속 발생했다. env 값이 반영이 되지 않아 배포가 되지 않았다.
- 구글에 계속 찾아본 결과 netlify의 환경 변수를 기입해야한다는 것을 찾았다.
- Build & deploy -> Environment -> Environment variables -> Edit variables 의 경로로 들어가 환경 변수를 기입했다.
- netlify.toml 파일을 생성하고 아래와 같은 내용을 붙여 넣고 다시 deploy를 했더니 해결이 되었다. 


```bash
[build]
  command = "sed -i s/API_KEY_PLACEHOLDER/$API_KEY/g netlify.toml && npm run build"
  publish = "build"

[context.production]
  TOML_ENV_VAR = "From netlify.toml"
  REACT_APP_TOML_ENV_VAR = "From netlify.toml (REACT_APP_)"

```
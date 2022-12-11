📌 12/10

새롭게 배운 기능

1. React.Suspense
- Suspense는 아직 렌더링이 준비되지 않은 컴포넌트가 있을때 로딩 화면을 보여주고 로딩이 완료되면 해당 컴포넌트를 보여주는 React에 내장되어 있는 기능

공식문서 : https://ko.reactjs.org/docs/react-api.html#reactsuspense

2. React.lazy
- 렌더링 최적화의 성능을 개선하기 위해서 서버 측에서 렌더링을 하지 않는 경우에 React.lazy()로 자바스크립트 번들을 분할하는 방법이다. 
즉, 사용하지 않는 자바스크립트를 줄여 여러파일들이 하나의 파일로 번들링 되는 것을 막을 수 있다.

- lazy 컴포넌트는 반드시 Suspense 컴포넌트 하위에서 렌더링 되어야하며, Suspense는 lazy 컴포넌트가 로드되길 기다리는 동안 로딩 화면과 같은 예비 컨텐츠를 보여줄 수 있게 해준다.


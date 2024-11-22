import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store';
import { Provider } from 'react-redux';

import { login } from './store/memberSlice';



export const Context = createContext();

// index.js: 앱의 시작점
// 앱이 시작될때 스토리지에 있는 로그인 정보를 확인하여 로그인 상태를 유지
// 로컬 스토리지에서 로그인 데이터 꺼내기
let info = localStorage.getItem('info');
let token = localStorage.getItem('token');

//dispatch를 사용하여 login 액션 함수 호출
if(info !== null) {
  // JSON string => object로 변경
  const loginData = {user: JSON.parse(info), token: token}
  
  store.dispatch(login(loginData));
}


// API 서버 주소
// let host = 'http://localhost:8080';

// AWS 서버의 API 주소로 변경
// let host = 'http://52.79.52.54:8080';

// 로컬 컴퓨터에서 React App을 실행할때는 API 주소도 localhost로 설정
// 그렇지 않으면 AWS 서버로 설정
let host;

if(window.location.hostname === 'localhost') {
  host = 'http://localhost:8080';
} else {
  host = 'http://ec2-52-79-52-54.ap-northeast-2.compute.amazonaws.com:8080';
}

console.log(host);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Context.Provider value={{host}}>
      {/* Provider를 통해 앱에 store 주입 */}
      {/* 하위컴포넌트들이 state를 공유 */}
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  </BrowserRouter>
);
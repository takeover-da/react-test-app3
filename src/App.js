import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './features/Home';
import Register from './features/Register';
import Login from './features/Login';
import BoardList from './features/BoardList';
import BoardDetail from './features/BoardDetail';
import BoardRegister from './features/BoardRegister';
import BoardModify from './features/BoardModify';


function App() {

  // Route: 주소에 따라 컴포넌트를 생성하는 기능
  // 예: / => 홈화면
  // 예: /login => 로그인 화면
  return (
    // path: URL주소 element: 화면에 표시할 컴포넌트
    // 라우트는 조건문처럼 동작하여, 특정 주소일때 특정 컴포넌트가 생성됨

    // 중첩 라우트: 경로에 따라 부모와 자식 컴포넌트가 함께 렌더링 되는 구조
    // 부모: Layout 컴포넌트
    // 자식: Home, Register, Login...

    // 예: /login => Layout 컴포넌트 + Login 컴포넌트
    
    <div>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Home/> } ></Route>
          <Route path="/register" element={ <Register/> } ></Route>
          <Route path="/login" element={ <Login/> } ></Route>
          <Route path="/board/list" element={ <BoardList/> } ></Route>
          <Route path="/board/register" element={ <BoardRegister/> } ></Route>
          <Route path="/board/read/:no" element={ <BoardDetail/> } ></Route>
          <Route path="/board/modify/:no" element={ <BoardModify/> } ></Route>
        </Route>
      </Routes>     
    </div>
  );
}

export default App;

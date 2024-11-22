import { Form, Button } from 'react-bootstrap';
import { CustomCard,CustomContainer } from '../components/Styles';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';

import { Context } from '../index';
import { useContext } from 'react';


const BoardRegister = () => {
  
  const token = useSelector((state) => state.member.token);
  
  const navigate = useNavigate();

  const [board, setBoard] = useState({});

// 훅은 일반함수에서 사용할 수 없음
// 컴포넌트 함수에서만 사용 가능

// 컨텍스트에서 host 데이터 가져오기
const { host } = useContext(Context);

const handleChange = (e) => {
  const { name, value, files } = e.target;

  let newBoard = { ...board };

  // 파일이 첨부됬을 경우
  if (name === 'uploadFile') {
    newBoard[name] = files[0];  // value는 파일의 이름. files[0]이 실제 파일
  } else {
    // 제목이나 내용이 변경되었을 경우
    newBoard[name] = value;
  }

  setBoard(newBoard);
};


const handleSubmit = async (e) => {
  // 링크 이동 방지
  e.preventDefault();

  // Form 객체를 생성하여 게시물 데이터 담기
  // 파일스트림은 JSON데이터로 전송할 수 없음

  const formData = new FormData();
  formData.append('title', board.title);
  formData.append('content', board.content);

  // 사용자가 입력한 파일이 없다면 폼데이터에서 빼기!
  if (board.uploadFile !== undefined) {
    formData.append('uploadFile', board.uploadFile);
  }

  const response = await axios.post(
    `${host}/board/register`,
    formData,
    {
      headers: {
      Authorization: token
    }
  });

  if (response.status !== 201) {
    throw new Error(`api error: ${response.status} ${response.statusText}`);
  } else {
    navigate('/board/list');
  }

};

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 등록</h3>

        <form onSubmit={handleSubmit}>

        <Form.Group className='mb-3' controlId="board.title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId="board.content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={3} name="content" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId="board.uploadFile">
          <Form.Label>이미지</Form.Label>
          <Form.Control type="file" name="uploadFile" onChange={handleChange}/>
        </Form.Group>
        {/* multiple */}
        <Button variant="secondary" type='submit'>등록</Button>

        </form>
      </CustomContainer>
    </CustomCard>
  );
}

export default BoardRegister
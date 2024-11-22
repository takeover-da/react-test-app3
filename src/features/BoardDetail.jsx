import React from 'react';

import { CustomCard, CustomContainer } from '../components/Styles';
import { Form, Button } from 'react-bootstrap';

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useSelector } from 'react-redux';

import { Context } from '../index';
import { useContext } from 'react';


const BoardDetail = () => {

  // 파일 경로
  // const IMG_PATH = 'C://uploadfile/';
  const IMG_PATH = '/image/';

  // 스토어에서 token state를 가져오기
  const token = useSelector((state) => state.member.token);

  const navigate = new useNavigate();

  const params = useParams();

  let [board, setBoard] = useState(null);

  // 컨텍스트에서 host 데이터 가져오기
  const { host } = useContext(Context);

    // 1. useEffect를 사용하면 처음에 화면이 렌더링되고
    // 2. useEffect 안에 있는 apicall이 실행되고
    // 3. setState로 화면이 다시 렌더링 되면서 board 데이터가 출력됨
    // 처음 렌더링 될때: 화면에 데이터 없음
    // 두번째로 렌더링 될때: 화면에 데이터 있음

    useEffect(()=>{

      // 함수 정의
      const apicall = async () => {

        // const response = await axios.get(`${host}/board/read?no=${params.no}`, {
        //   headers: {
        //     Authorization: token
        //   }

        const response = await axios.get(`${host}/board/read?no=${params.no}`, {
          headers: {
            Authorization: token
          }
        });
        if (response.status !== 200) {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        } else {
          setBoard(response.data);
        }
      
      }
      // 함수 호출
      apicall();
    }, []); //빈배열을 넣어서 처음 렌더링 때만 호출

  return (
        <CustomCard>
            <CustomContainer>
                <h3>게시물 상세</h3>
                {
                  board !==null &&
                  <>
                    <Form.Group controlId="board.title">
                      <Form.Label>제목</Form.Label>
                      <Form.Control type="text" value={board.title} readOnly></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="board.content">
                      <Form.Label>내용</Form.Label>
                      <Form.Control as="textarea" rows={3} value={board.content} readOnly/>
                    </Form.Group>

                    <Form.Group controlId="board.content">
                      <Form.Label>작성자</Form.Label>
                      <Form.Control type="text" value={board.writer} readOnly></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="board.content">
                      <Form.Label>등록일</Form.Label>
                      <Form.Control type="text" value={board.regDate} readOnly></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="board.content">
                      <Form.Label>수정일</Form.Label>
                      <Form.Control type="text" value={board.modDate} readOnly></Form.Control>
                    </Form.Group>

                    {
                      board.imgPath !== null &&
                      <img src={`${IMG_PATH}${board.imgPath}`}></img>
                    }
                    
                    <Button variant="primary" onClick={()=>{
                        navigate(`/board/modify/${params.no}`);
                    }}>게시물 수정</Button>
                  </>
                }
            </CustomContainer>
        </CustomCard>
    );
  };

export default BoardDetail;
/*
슬라이더
npm install react-slick
npm install slick-carousel
설치해주세요
*/

import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import NoticeDetailComponent from "../components/NoticeDetailComponent";

const Content = styled.div `
  display: flex;
  flex-direction: column; 
  align-items: center;
`;

function NoticeDetail() {
  return (
    <>
      <Header type="default" />  
      <Content>
        <NoticeDetailComponent />
      </Content>
    </>
  );
}

export default NoticeDetail;

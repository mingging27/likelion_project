import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 7vw;
  margin-bottom: 7vw;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 0;
`;

const Description = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin-top: 10px;
  color: #ffffff60;
`;

const InquiryContent = styled.form`
  margin-top: 38px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 38px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #ffffff80;
  margin-bottom: 13px;
`;

const Select = styled.select`
  width: 587px;
  height: 48px;
  border-radius: 6px;
  border: 1px solid #4B67D850;
  background-color: #ffffff00;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  padding-left: 24px;
`;

const Option = styled.option`
  color: #000000;
`;

const InquiryDetail = styled.textarea`
  width: 570px;
  height: 184px;
  border-radius: 6px;
  border: 1px solid #4B67D850;
  background-color: #ffffff00;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  padding-left: 10px;
  padding-top: 10px;
`;

const Submit = styled.button`
  width: 203px;
  height: 55px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 17.58px;
  background-color: #5E89E2;
`;

// 모달창 스타일링
const Modal = styled.div`
  background-color: #ffffff90;
  width: 788px;
  height: 465px;
  border-radius: 30px;
  box-shadow: 20px 20px 60px #27add950;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px auto; /* 화면의 가운데에 위치하게 만듦 */
`;

const ModalTitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
`;

const ModalDetail = styled.p`
  margin-top: 0;
  font-size: 24px;
  font-weight: 500;
`;

function Inquiry() {
  const [club, setClub] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [showModal, setShowModal] = useState(false);
  const clubRef = useRef(null);
  const inquiryRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!club) {
      clubRef.current.focus();
      return;
    }
    if (inquiry.length < 1) {
      inquiryRef.current.focus();
      return;
    }
    // 모든 유효성 검사를 통과한 경우
    setShowModal(true);
  };

  return (
    <>
      <Header type="default" />
      <Content>
        {/* 폼을 제출하면 사라지고 모달만 보이도록 처리 */}
        <Title>1:1 문의</Title>
        <Description>동아리 운영진에게 궁금한 점을 물어보세요! 운영진에게 전달하여 빠르게 답변을 드리겠습니다.</Description>
        {!showModal ? (
          <>
            <InquiryContent onSubmit={handleSubmit}>
              <InputBlock>
                <Label htmlFor="club">문의 동아리 선택</Label>
                <Select
                  name="club"
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  ref={clubRef}
                >
                  <Option value="" disabled selected hidden>
                    {" "}
                  </Option>
                  <Option value="option1">옵션 1</Option>
                </Select>
              </InputBlock>
              <InputBlock>
                <Label htmlFor="inquiry">문의 내용</Label>
                <InquiryDetail
                  name="inquiry"
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  ref={inquiryRef}
                ></InquiryDetail>
              </InputBlock>
              <Submit type="submit">문의하기</Submit>
            </InquiryContent>
          </>
        ) : (
          <Modal>
            <ModalTitle>문의가 성공적으로 제출되었습니다!</ModalTitle>
            <ModalDetail>운영진이 확인 후 빠르게 답변드리겠습니다. 감사합니다.</ModalDetail>
          </Modal>
        )}
      </Content>
    </>
  );
}

export default Inquiry;
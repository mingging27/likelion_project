import React, { useState, useEffect } from "react";  // Import useEffect here
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

const RecentEdit = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin-top: 10px;
  color: #ffffff60;
`;

const EditInfo = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PersonalInfo = styled.div`
  width: 906px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 61px;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 calc(33.333% - 24px); /* 3개씩 배치되도록 너비 설정 */
  min-width: 200px;
  margin-bottom: 32px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 13px;
`;

const Input = styled.input`
  width: 266px;
  height: 48px;
  border-radius: 6px;
  border: 1px solid #4B67D850;
  background-color: #ffffff00;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  padding-left: 24px;
`;

const ClubInfo = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
`;

const LabelStrong = styled.span`
  font-weight: 600;
`;

const InputLong = styled(Input)`
  width: 906px;
`;

const Submit = styled.button`
  width: 179px;
  height: 48px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 17.58px;
  background-color: #5E89E2;
`;

function MypageEdit() {
  const [email, setEmail] = useState("");  // 입력된 이메일 상태
  const [maskedEmail, setMaskedEmail] = useState("");  // 마스킹된 이메일 상태
  const [phone, setPhone] = useState("");  // 입력된 전화번호 상태
  const [maskedPhone, setMaskedPhone] = useState("");  // 마스킹된 전화번호 상태
  const [maskTimers, setMaskTimers] = useState([]);  // 마스킹 타이머 추적

  // 전화번호 입력 시 처리
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    setPhone(inputValue);

    // 기존 타이머들을 정리
    maskTimers.forEach((timer) => clearTimeout(timer));

    // 즉시 마스킹 처리 (5번째~10번째 외에는 그대로, 그 구간만 문자 처리)
    setMaskedPhone(maskPhoneImmediately(inputValue));

    // 0.2초 뒤에 마스킹 처리
    const newTimer = setTimeout(() => {
      setMaskedPhone((prevMaskedPhone) =>
        prevMaskedPhone.split("").map((char, idx) => (idx >= 4 && idx <= 9 ? "*" : char)).join("")
      );
    }, 200);  // 0.2초 뒤에 마스킹

    // 타이머 저장
    setMaskTimers([newTimer]);  // 이전 타이머는 하나만 남도록 갱신
  };

  // 즉시 마스킹 처리: 5번째~10번째 외의 자리만 즉시 노출
  const maskPhoneImmediately = (phone) => {
    return phone
      .split("")
      .map((char, idx) => (idx >= 4 && idx <= 9 ? char : char))  // 5~10번째만 변환, 나머지 즉시
      .join("");
  };

  // 이메일 입력 시 처리
  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // 기존 타이머들을 정리
    maskTimers.forEach((timer) => clearTimeout(timer));

    let newFlag = 0;  // flag: 0 - 아이디, 1 - 도메인, 2 - 최상위 도메인
    let masked = inputValue;

    // 즉시 마스킹 처리
    masked = inputValue
      .split("")
      .map((char, idx) => {
        if (newFlag === 0) {
          // 아이디 부분 처리
          if (idx < 2) return char; // 첫 두 글자는 그대로
          if (char === "@") {
            newFlag = 1; // @ 등장 시 flag를 1로 변경하여 도메인 부분으로
            return char; // @는 그대로
          }
          return "*"; // 세 번째 글자부터 '*' 처리
        } else if (newFlag === 1) {
          // @ 이후, 도메인 부분 처리
          if (idx === inputValue.indexOf("@") + 1) {
            return char; // @뒤 첫 글자는 그대로
          }
          if (char === ".") {
            newFlag = 2; // . 등장 시 flag를 2로 변경하여 최상위 도메인 이후는 그대로 처리
            return char;
          }
          return "*"; // 그 이후 글자는 '*' 처리
        } else if (newFlag === 2) {
          // 최상위 도메인 이후, 모든 글자는 그대로
          return char;
        }
      })
      .join("");

    setMaskedEmail(masked);  // 마스킹된 이메일 상태 업데이트

    // 0.2초 뒤에 마스킹 처리
    const newTimer = setTimeout(() => {
      let finalMasked = masked.split("").map((char, idx) => {
        if (idx >= 2 && idx < inputValue.indexOf("@")) {
          return "*"; // 아이디 부분 이후 마스킹 처리
        }
        return char;
      }).join("");
      setMaskedEmail(finalMasked);
    }, 500);  // 0.2초 뒤에 마스킹

    // 타이머 저장
    setMaskTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  // 타이머 정리
  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트되면 타이머 정리
      maskTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [maskTimers]);

  return (
    <>
      <Header type="default" />
      <Content>
        <Title>회원정보</Title>
        <RecentEdit>최근 수정일 ~~</RecentEdit>
        <EditInfo>
          <PersonalInfo>
            <InputBlock>
              <Label htmlFor="name">이름</Label>
              <Input type="text" name="name" />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="stdid">학번</Label>
              <Input type="text" name="stdid" />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="major">학과</Label>
              <Input type="text" name="major" />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="nickname">닉네임</Label>
              <Input type="text" name="nickname" />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="phone">전화번호</Label>
              <Input 
                type="tel" 
                name="phone" 
                value={maskedPhone}  // 마스킹된 값 표시
                onChange={handlePhoneChange}  // 입력 시 호출
              />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="email">이메일</Label>
              <Input 
                type="email" 
                name="email" 
                value={maskedEmail}  // 마스킹된 값 표시
                onChange={handleEmailChange}  // 입력 시 호출
              />
            </InputBlock>
          </PersonalInfo>
          <ClubInfo>
            <InputBlock>
              <Label htmlFor="club"><LabelStrong>운영진이신가요?</LabelStrong> 운영진이라면 소속 동아리명을 작성해 주세요. 모집 공고와 활동 소식 작성 권한이 부여됩니다.</Label>
              <InputLong type="text" name="club" />
            </InputBlock>
          </ClubInfo>
          <Submit type="submit">회원정보 수정</Submit>
        </EditInfo>
      </Content>
    </>
  );
}

export default MypageEdit

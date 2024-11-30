import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "./pages/Main";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import MypageEdit from "./pages/MypageEdit";
import Notice from "./pages/Notice";
import NoticeDetail from "./pages/NoticeDetail";
import Session from "./pages/Session";
import Inquiry from "./pages/Inquiry";
import ClubList from "./pages/ClubList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/mypage" element={<Mypage />} />
        <Route exact path="/myedit" element={<MypageEdit />} />
        <Route exact path="/notice" element={<Notice />} />
        <Route exact path="/notice-detail" element={<NoticeDetail />} />
        <Route exact path="/inquiry" element={<Inquiry />} />
        <Route exact path="/session" element={<Session />} />
        <Route exact path="/clublist" element={<ClubList />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use 'Routes' from v6
import './App.css';
import UserRegistrationForm from './component/UserRegistrationForm';
import LandingPage from './component/LandingPage';
import UserList from "./component/UserList";
import ChatRoom from "./component/ChatRoom";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<UserRegistrationForm />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="/user-list" element={<UserList />} />
                    <Route path="/chat-room" element={<ChatRoom />} />
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

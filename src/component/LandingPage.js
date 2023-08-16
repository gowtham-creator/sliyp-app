import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";



function LandingPage() {
    const [users, setUsers] = useState([]);

    return (
        <div>
            <h1>Welcome to Our Website!</h1>
            <p>Thank you for joining us. Explore our services and features.</p>
            <Link to="/user-list">
                <button>User List</button>
            </Link>
            <Link to="/chat-room">
                <button>Chat Room</button>
            </Link>
        </div>
    );
}

export default LandingPage;

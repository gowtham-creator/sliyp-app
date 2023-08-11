import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use 'useNavigate' from v6
import axios from 'axios';

function UserRegistrationForm() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [handle, setHandle] = useState('');
    const navigate = useNavigate(); // Use 'useNavigate' from v6

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: name,
            address: address,
            email: email,
            handle: handle,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/register', payload, {
                headers: {
                    'authority': 'qa-oms.msme.jswone.in',
                    'accept': 'application/json, text/plain, */*',
                    // ... other headers ...
                }
            });

            console.log('API response:', response.data);

            navigate('/landing'); // Use 'navigate' from v6
        } catch (error) {
            console.error('API error:', error);
        }
    };

    return (
        <div>
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Handle:</label>
                    <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default UserRegistrationForm;

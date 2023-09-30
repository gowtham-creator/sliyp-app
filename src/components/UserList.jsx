import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/UserList.css';

const UserList = () => {
    const authState = useSelector(state => state.authReducer);
    const [users, setUsers] = useState([]);
    const [fetchData, { loading }] = useFetch();

    const fetchUsers = useCallback(() => {
        const config = {
            url: "/user/all", // Replace with your API endpoint
            method: "get",
            headers: { Authorization: "Bearer "+authState.token }
        };

        fetchData(config, { showSuccessToast: false }).then(data => setUsers(data));
    }, [authState.token, fetchData]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="user-list">
            <h2><i className="fas fa-users"></i> User List</h2>
            {loading ? (
                <Loader />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th><i className="fas fa-user"></i> Name</th>
                            <th><i className="fas fa-envelope"></i> Email</th>
                            {/* Add more table headers for additional user properties */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.ref}>
                                <td>{user.ref}</td>
                                <td>
                                    {/* Wrap the user name in a Link */}
                                    <Link to={`/userprofile`}>{user.name}</Link>
                                </td>
                                <td>{user.email}</td>
                                {/* Add more table cells for additional user properties */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserList;

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import '../css/UserList.css';

const UserList = () => {
    const authState = useSelector(state => state.authReducer);
    const [users, setUsers] = useState([]);
    const [fetchData, { loading }] = useFetch();

    const fetchUsers = useCallback(() => {
        const config = {
            url: "/user/all", // Replace with your API endpoint
            method: "get",
            headers: { Authorization: authState.token }
        };

        fetchData(config, { showSuccessToast: false }).then(data => setUsers(data));
    }, [authState.token, fetchData]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    return (
        <div className="user-list"> {/* Apply the user-list class */}
            <h2>User List</h2>
            {loading ? (
                <Loader />
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* Add more table headers for additional user properties */}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.ref}>
                            <td>{user.ref}</td>
                            <td>{user.name}</td>
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



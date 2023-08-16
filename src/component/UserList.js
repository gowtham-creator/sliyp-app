import React, {useEffect, useState} from 'react';
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user/all')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
            <div className="table-container" >
                <h2>User List</h2>
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        {/* Add more table headers for other fields */}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.ref}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            {/* Add more table cells for other fields */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
    );
}

export default UserList;

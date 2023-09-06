// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const UserProfile = () => {
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     axios.get('YOUR_API_ENDPOINT')
//       .then((response) => {
//         setUser(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//         setLoading(false);
//       });
//   }, []);
//
//   return (
//     <div>
//       <h1>User Profile</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <p>Joining Time: {new Date(user.joiningTime).toLocaleString()}</p>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default UserProfile;

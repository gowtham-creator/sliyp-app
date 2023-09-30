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

// UserProfile.js

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/userprofile.css'

const UserProfile = () => {
    const { userId } = useParams();
    const authState = useSelector(state => state.authReducer);
    const userProfile = useSelector(state => state.userProfileReducer);
    
    // Define your Redux state for user profiles

    // Simulate fetching user profile data based on userId (replace with actual API call)
    useEffect(() => {
        // Simulate fetching user profile data from your API based on the userId parameter
        // Update the userProfile state in Redux with the fetched data
        const userProfile = {
            username: 'ExampleUser',
            profileImage: 'example.jpg',
            followersCount: 100,
            followingCount: 50,
            isFollowed: false, // You can set this based on your logic
        };
        
        // Update the userProfile state (replace with your Redux action)
        // dispatch(updateUserProfile(fetchedUserProfile));
    }, [userId]);

    // Simulate follow/unfollow actions (replace with your logic)
    const handleFollow = () => {
        // Perform follow action here
        // Update the isFollowed state
        // For example: setFollowStatus(true);
    };

    const handleUnfollow = () => {
        // Perform unfollow action here
        // Update the isFollowed state
        // For example: setFollowStatus(false);
    };

    return (
        <div className="user-profile">
            <div className="profile-header">
                <img src={"src"} alt={"userProfile.username"} />
                <h2>{"username"}</h2>
                <p>Followers: {"userProfile.followersCount"}</p>
                <p>Following: {"userProfile.followingCount"}</p>
                {authState.userId !== userId ? (
                    userProfile.isFollowed ? (
                        <button onClick={handleUnfollow}>Unfollow</button>
                    ) : (
                        <button onClick={handleFollow}>Follow</button>
                    )
                ) : null}
            </div>
            {/* Add more user details here */}
        </div>
    );
}

export default UserProfile;



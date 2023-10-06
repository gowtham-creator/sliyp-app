import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare, faComment } from '@fortawesome/free-solid-svg-icons';
import '../css/posts.css';
import api from "../api";
import {useSelector} from "react-redux";

function PostCard({ post }) {
    const [postImage, setPostImage] = useState(null);
    const authState = useSelector(state => state.authReducer);

    useEffect(() => {
        const fetchPostImage = async () => {
            try {
                if (post.imageUrl) {
                    const imageResp = await api.get(`/image/${post.imageUrl}`, {
                        headers: { Authorization: "Bearer " + authState.token },
                        responseType: 'arraybuffer',
                    });

                    if (imageResp.data && imageResp.data.byteLength > 0) {
                        // Convert binary data to base64
                        const imageBytes = new Uint8Array(imageResp.data);
                        const base64String = btoa(
                            String.fromCharCode.apply(null, imageBytes)
                        );
                        setPostImage(`data:image/jpeg;base64,${base64String}`);
                    } else {
                        console.error('Empty or invalid image data received.');
                    }
                } else {
                    console.error('No profile image ID found in user data.');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchPostImage();
    }, [authState.token]);

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="user-info">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                        alt={`shashi's Icon`}
                        className="profile-image-small"
                    />
                    <div className="user-details">
                        <h2 className="user-name">shashikanth</h2>
                        <p className="user-handle">@shashikanth</p>
                    </div>
                </div>
            </div>
            <div className="post-content">
                <p>{post.writeUp}</p>
                {postImage && (
                    <img src={postImage} alt="Post" className="post-image" />
                )}
                {/* Display other post details as needed */}
            </div>
            <div className="post-actions">
                <button>
                    <FontAwesomeIcon icon={faThumbsUp} /> Like
                </button>
                <button>
                    <FontAwesomeIcon icon={faComment} /> Comment
                </button>
                <button>
                    <FontAwesomeIcon icon={faShare} /> Share
                </button>
            </div>
        </div>
    );
}

export default PostCard;

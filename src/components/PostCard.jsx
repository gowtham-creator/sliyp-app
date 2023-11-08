import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare, faComment } from '@fortawesome/free-solid-svg-icons';
import '../css/posts.css';
import api from "../api";
import { useSelector } from "react-redux";

function PostCard({ post }) {
    const [postImage, setPostImage] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const authState = useSelector(state => state.authReducer);

    useEffect(() => {
        const fetchPostImage = async () => {
            try {
                if (post.imageUrl && !postImage) { // Fetch image only if not already fetched
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
                } else if (!post.imageUrl) {
                    console.error('No image URL found in post data.');
                }


                if(post.AuthorProfileImgId && !userImage){
                    const imageResp = await api.get(`/image/${post.AuthorProfileImgId}`, {
                        headers: { Authorization: "Bearer " + authState.token },
                        responseType: 'arraybuffer',
                    });

                    if (imageResp.data && imageResp.data.byteLength > 0) {
                        // Convert binary data to base64
                        const imageBytes = new Uint8Array(imageResp.data);
                        const base64String = btoa(
                            String.fromCharCode.apply(null, imageBytes)
                        );
                        setUserImage(`data:image/jpeg;base64,${base64String}`);
                    } else {
                        console.error('Empty or invalid image data received.');
                    }
                } else if (!post.AuthorProfileImgId) {
                    console.error('No image URL found in post data.');
                }


            } catch (error) {
                console.error('Error fetching post image:', error);
            }
        };

        fetchPostImage();
    }, [authState.token, post, postImage,userImage]);

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="user-info">
                    {userImage ?
                        (<img
                        src={userImage}
                        alt={`shashi's Icon`}
                        className="profile-image-small"
                    />): (<img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                        alt={`shashi's Icon`}
                        className="profile-image-small"
                    />)}
                    <div className="user-details">
                        <h2 className="user-name">{post.AuthorName}</h2>
                        <p className="user-handle">@{post.AuthorHandle}</p>
                    </div>
                </div>
            </div>
            <div className="post-content">
                <p>{post.writeUp}</p>
                {post.post && (
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

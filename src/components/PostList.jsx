import React, { useState, useEffect } from 'react';
import api from '../api'; // Import your API module
import PostCard from './PostCard';
import {useSelector} from "react-redux";
import  "../css/posts.css";
import CreatePost from "./CreatePost";


function PostList() {
    const [posts, setPosts] = useState([]);
    const authState = useSelector((state) => state.authReducer);

    useEffect(() => {
        // Fetch the list of posts when the component mounts
        const fetchPosts = async () => {
            try {
                const response = await api.get(`/post?offset=0&limit=10`, {
                    headers: { Authorization: 'Bearer ' + authState.token }} );
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="post-list">
            <div className="post-card">
                <CreatePost/>
            </div>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostList;

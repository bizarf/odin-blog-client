import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostsType from "../types/posts";

const Post = () => {
    const { id } = useParams();

    const [post, setPost] = useState<PostsType>();

    const fetchPost = () => {
        fetch(`https://odin-blog-api-ofv2.onrender.com/api/post/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPost(data);
            });
    };

    useEffect(() => {
        // fetchPost();
        fetch(`https://odin-blog-api-ofv2.onrender.com/api/post/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPost(data);
            });
    }, [id]);

    return (
        <div>
            <h1>Post</h1>
            <div>{post?.title}</div>
            <div>{post?.textContent}</div>
            <div>{post?.user}</div>
        </div>
    );
};

export default Post;

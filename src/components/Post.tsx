import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import PostsType from "../types/posts";
import CommentsType from "../types/comments";
import UserType from "../types/user";

type Props = {
    user: UserType | null;
};

const Post = ({ user }: Props) => {
    const { id } = useParams();

    const [post, setPost] = useState<PostsType>();
    const [comments, setComments] = useState<CommentsType[]>();

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
        // fetch post
        fetch(`https://odin-blog-api-ofv2.onrender.com/api/post/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPost(data);
            });
        // fetch comments on post
        fetch(`https://odin-blog-api-ofv2.onrender.com/api/post/${id}/comments`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setComments(data.allComments);
            });
    }, [id]);

    return (
        <div>
            <h1>Post</h1>
            {/* post container */}
            <div className="">
                <div>{post?.title}</div>
                <div>{post?.textContent}</div>
                <div>
                    {post?.user.firstname} {post?.user.lastname}
                </div>
            </div>
            {/* comment container */}
            {comments &&
                comments.map((comment, index) => {
                    return (
                        <div key={index}>
                            <div>
                                {comment.user.firstname} {comment.user.lastname}
                            </div>
                            <div>{comment.text}</div>
                            <div>
                                {dayjs(comment.timestamp).format(
                                    "ddd DD, YYYY, hh:mma"
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Post;

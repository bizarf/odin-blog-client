import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import PostsType from "../types/posts";
import CommentsType from "../types/comments";
import UserType from "../types/user";
import CommentBox from "./CommentBox";

type Props = {
    user: UserType | null;
};

const Post = ({ user }: Props) => {
    const { id } = useParams();

    const [post, setPost] = useState<PostsType>();
    const [comments, setComments] = useState<CommentsType[]>();

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
        <div className="mx-10">
            {/* post container */}
            <div className="my-4 flex flex-col rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
                <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
                    {post?.title}
                </h2>
                <p className="mt-1 text-gray-800 dark:text-white">
                    {post?.textContent}
                </p>
                <p className="mt-1 text-gray-800 dark:text-white">
                    Written by: {post?.user.firstname} {post?.user.lastname}
                </p>
                <p className="mt-5 text-xs text-gray-500 dark:text-gray-400">
                    Created on:
                    {dayjs(post?.timestamp).format(" ddd DD, YYYY, hh:mma")}
                </p>
            </div>
            {/* comment container */}
            <h4 className="text-center text-xl font-bold text-gray-800 dark:text-white">
                Comments
            </h4>
            {comments &&
                comments.map((comment, index) => {
                    return (
                        <div
                            key={index}
                            className="my-3 flex flex-col rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-gray-800 dark:text-white">
                                    Posted by: {comment.user.firstname}{" "}
                                    {comment.user.lastname}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Posted on:
                                    {dayjs(post?.timestamp).format(
                                        " ddd DD, YYYY, hh:mma"
                                    )}
                                </p>
                            </div>
                            <p className="mt-1 text-gray-800 dark:text-white">
                                {comment.text}
                            </p>
                        </div>
                    );
                })}
            {user && <CommentBox id={id} />}
        </div>
    );
};

export default Post;

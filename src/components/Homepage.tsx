import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import PostsType from "../types/posts";

const Homepage = () => {
    const [posts, setPosts] = useState<PostsType[]>([]);
    const [totalPosts, setTotalPosts] = useState<number>();

    const fetchPosts = () => {
        fetch("https://odin-blog-api-ofv2.onrender.com/api/posts")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPosts(data.allPosts);
                setTotalPosts(data.totalPublishedPostsCount);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="">
            <h1 className="py-4 text-center text-4xl font-bold italic text-gray-800 dark:text-white">
                Welcome to the blog
            </h1>
            <div>
                <h2 className="py-4 text-center text-3xl font-bold text-gray-800 dark:text-white">
                    Articles
                </h2>
                <div className="mx-6 grid gap-6 sm:grid-cols-2 md:mx-20 md:grid-cols-3">
                    {posts &&
                        posts.map((post, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]"
                                >
                                    <div className="p-4 md:p-5">
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                            <Link to={`/posts/${post._id}`}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-gray-800 dark:text-gray-400">
                                            {post.textContent}
                                        </p>
                                        <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
                                            Posted on:
                                            {dayjs(post.timestamp).format(
                                                " ddd DD, YYYY, hh:mma"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Homepage;

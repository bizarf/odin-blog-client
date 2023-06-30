import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import User from "../types/user";
import Header from "./Header";
import { Link } from "react-router-dom";
import PostsType from "../types/posts";

type Props = {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const Homepage = ({ user, setUser }: Props) => {
    const [posts, setPosts] = useState<PostsType[]>([]);

    const fetchPosts = () => {
        fetch("https://odin-blog-api-ofv2.onrender.com/api/posts")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPosts(data.allPosts);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <Header user={user} setUser={setUser} />
            <div>
                <h1>Welcome to the blog</h1>
                <div>
                    <h2>Articles</h2>
                    <h3>Latest</h3>
                    <div className="grid grid-cols-3">
                        {posts &&
                            posts.map((post, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]"
                                    >
                                        <img
                                            className="h-auto w-full rounded-t-xl"
                                            src="../docs/assets/img/500x300/img1.jpg"
                                            alt="Image Description"
                                        />
                                        <div className="p-4 md:p-5">
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                                <Link to={`/posts/${post._id}`}>
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-gray-800 dark:text-gray-400">
                                                Some quick example text to build
                                                on the card title and make up
                                                the bulk of the card's content.
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
        </div>
    );
};

export default Homepage;

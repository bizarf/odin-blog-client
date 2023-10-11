import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link, useSearchParams } from "react-router-dom";
import PostsType from "../types/posts";
import ReactPaginate from "react-paginate";

const Homepage = () => {
    const [posts, setPosts] = useState<PostsType[]>([]);
    const [totalPosts, setTotalPosts] = useState<number>();

    // get the current page number from the search parameters
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPageNumber = Number(searchParams.get("page"));

    const fetchPosts = () => {
        fetch(
            `https://odin-blog-api-ofv2.onrender.com/api/posts?page=${currentPageNumber}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setPosts(data.allPosts);
                    setTotalPosts(data.totalPublishedPostsCount);
                }
            });
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPageNumber]);

    const totalPages = Math.ceil(totalPosts! / 10);

    // pagination functions
    const handlePageClick = (e: { selected: number }) => {
        // e.selected returns values starting from 0. I'll need to add 1 to this or else the wrong pages will be returned.
        const page = e.selected + 1;
        // searchParams set takes in a name and a value. e.selected returns a number, so need to convert that to string to use in search params
        searchParams.set("page", page.toString());
        // once that's done update the search params
        setSearchParams(searchParams);
    };

    return (
        <>
            <h1 className="py-4 text-center text-4xl font-bold italic text-gray-800 dark:text-white">
                Welcome to the blog
            </h1>
            <h2 className="py-4 text-center text-3xl font-bold text-gray-800 dark:text-white">
                Articles
            </h2>
            <div className="mx-6 grid gap-6 sm:grid-cols-2 md:mx-20 md:grid-cols-3">
                {posts &&
                    posts.map((post) => {
                        return (
                            <div
                                key={post._id}
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
            {totalPages && (
                <ReactPaginate
                    pageCount={totalPages}
                    breakLabel="..."
                    nextLabel="Next >"
                    pageRangeDisplayed={5}
                    previousLabel="< Previous"
                    renderOnZeroPageCount={null}
                    onPageChange={handlePageClick}
                    className="flex items-center justify-center space-x-4 py-2"
                    activeClassName="bg-blue-500 justify-center"
                    pageClassName="w-10 h-10 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full dark:text-white"
                    previousClassName="dark:text-white hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                    nextClassName="dark:text-white hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                    disabledClassName="pointer-events-none"
                    breakClassName="dark:text-white"
                />
            )}
        </>
    );
};

export default Homepage;

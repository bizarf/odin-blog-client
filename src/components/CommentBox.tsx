import React, { useState } from "react";
import ErrorsType from "../types/errors";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

type Props = {
    id: string | undefined;
};

const CommentBox = ({ id }: Props) => {
    const [comment, setComment] = useState<string>();
    const [error, setError] = useState<[ErrorsType] | []>([]);

    const cookies = new Cookies();
    const navigate = useNavigate();

    const sendComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // make an object with the comment input states
        const data = { comment, id };
        // get the jwt from the cookies and send that as an authorization header
        const jwt = cookies.get("jwt_auth");
        // start fetch api, with a post method and set the header content type to json
        fetch(
            `https://odin-blog-api-ofv2.onrender.com/api/post/${id}/comment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                // need to stringify the username and password to be able to send them as JSON objects
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                // data object can either return a token or errors. if we get the token object, then we decode the token and set that as the user state. we store the jwt in the cookie.
                if (data.success) {
                    // clear the error array
                    setError([]);
                    // disable the submit button, and then refresh the current page.
                    const submitBtn =
                        document.querySelector<HTMLButtonElement>(
                            ".commentSubmitBtn"
                        );
                    if (submitBtn) {
                        submitBtn.disabled = true;
                    }
                    navigate(0);
                } else {
                    // error messages go here
                    setError(data.errors);
                }
            });
    };

    return (
        <div>
            <form
                onSubmit={(e) => sendComment(e)}
                className="mx-auto mb-4 max-w-2xl"
            >
                <label htmlFor="comment" className="sr-only">
                    Comment box
                </label>
                <textarea
                    className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                    rows={3}
                    placeholder="Share your thoughts on this article"
                    name="comment"
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                {error.map((errors, index) => (
                    <div key={index} className="text-sm text-red-600">
                        {errors.msg}
                    </div>
                ))}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="commentSubmitBtn mt-3 rounded-md border border-transparent bg-blue-600 px-10 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-offset-gray-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentBox;

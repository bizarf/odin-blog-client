import React, { useState } from "react";
import ErrorsType from "../types/errors";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
    id: string | undefined;
};

const CommentBox = ({ id }: Props) => {
    const [error, setError] = useState<[ErrorsType] | []>([]);

    const cookies = new Cookies();
    const navigate = useNavigate();

    const commentFormSchema = z.object({
        comment: z.string().min(1, { message: "Comment cannot be empty" }),
    });

    const form = useForm<z.infer<typeof commentFormSchema>>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            comment: "",
        },
    });

    const sendComment = async (values: z.infer<typeof commentFormSchema>) => {
        // make an object with the comment input states
        const data = { comment: values.comment, id };
        // get the jwt from the cookies and send that as an authorization header
        const jwt = cookies.get("jwt_auth");
        // start fetch api, with a post method and set the header content type to json
        fetch(`${import.meta.env.VITE_API_HOST}/api/post/${id}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            // need to stringify the username and password to be able to send them as JSON objects
            body: JSON.stringify(data),
        })
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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(sendComment)}
                    className="mx-auto mb-4 max-w-2xl"
                >
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">
                                    Comment box
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Share your thoughts on this article"
                                        {...field}
                                        className="dark:bg-slate-900"
                                        maxLength={500}
                                        rows={3}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error.map((errors, index) => (
                        <div
                            key={index}
                            className="text-sm text-red-600 dark:text-red-500"
                        >
                            {errors.msg}
                        </div>
                    ))}
                    <Button
                        type="submit"
                        className="bg-blue-500 dark:text-white block mx-auto mt-2"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CommentBox;

import { http, HttpResponse } from "msw";

const allPosts = [
    {
        _id: "64f7a382801d417e9755e382",
        title: "This is a test blog post",
        textContent: "Test text content",
        timestamp: new Date(),
        published: "yes",
        user: {
            _id: "64f89f20e9476b3f083b9a2f",
            firstname: "John",
            lastname: "Doe",
            isAuthor: true,
            username: "john@doe.com",
        },
    },
];

const testPost = {
    _id: "64f7a382801d417e9755e382",
    title: "This is a test blog post",
    textContent: "Test text content",
    timestamp: new Date(),
    published: "yes",
    user: {
        _id: "64f89f20e9476b3f083b9a2f",
        firstname: "John",
        lastname: "Doe",
        isAuthor: true,
        username: "john@doe.com",
    },
};

const testAllComments = [
    {
        _id: "64f907735994abc37890b4a0",
        user: {
            _id: "64f89f20e9476b3f083b9a2f",
            firstname: "John",
            lastname: "Doe",
            isAuthor: true,
            username: "john@doe.com",
        },
        text: "This is a test comment",
        postId: "64f7a382801d417e9755e382",
        timestamp: new Date(),
    },
];

const mockUser = {
    _id: "64f89f20e9476b3f083b9a2f",
    firstname: "John",
    lastname: "Doe",
    isAuthor: true,
    username: "john@doe.com",
};

const token = "E2323";

export const handlers = [
    // fetch published posts
    http.get(`${import.meta.env.VITE_API_HOST}/api/posts/published`, () => {
        return HttpResponse.json({
            success: true,
            allPosts,

            totalPublishedPostsCount: allPosts.length,
        });
    }),

    // fetch the test post
    http.get(
        `${import.meta.env.VITE_API_HOST}/api/post/64f7a382801d417e9755e382`,
        () => {
            return HttpResponse.json({ success: true, post: testPost });
        }
    ),

    // fetch the comments from the test post
    http.get(
        `${import.meta.env.VITE_API_HOST}/api/post/64f7a382801d417e9755e382/comments`,
        () => {
            return HttpResponse.json({
                success: true,
                allComments: testAllComments,
            });
        }
    ),

    // user makes a comment
    http.post(
        `${import.meta.env.VITE_API_HOST}/api/post/64f7a382801d417e9755e382/comment`,
        () => {
            if (req.comment) {
                const newTestComment = {
                    id: "64f907edea893fecfaaf6d18",
                    user: {
                        _id: "64f89f20e9476b3f083b9a2f",
                        firstname: "John",
                        lastname: "Doe",
                        isAuthor: true,
                        username: "john@doe.com",
                    },
                    text: "This is a new test comment",
                    postId: "64f7a382801d417e9755e382",
                    timestamp: new Date(),
                };
                testAllComments.push(newTestComment);
                return HttpResponse.json({ success: true });
            } else {
                return HttpResponse.json({
                    success: false,
                    errors: [{ msg: "Your comment cannot be empty" }],
                });
            }
        }
    ),

    // login route
    http.post(`${import.meta.env.VITE_API_HOST}/api/login`, () => {
        return HttpResponse.json({ success: true, token });
    }),

    http.get(
        `${import.meta.env.VITE_API_HOST}/api/user/64f89f20e9476b3f083b9a2f`,
        () => {
            return HttpResponse.json({ success: true });
        }
    ),
];

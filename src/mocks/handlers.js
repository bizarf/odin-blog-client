import { rest } from "msw";

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
    rest.get(
        "https://odin-blog-api-ofv2.onrender.com/api/posts",
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ success: true, allPosts }));
        }
    ),

    // fetch the test post
    rest.get(
        "https://odin-blog-api-ofv2.onrender.com/api/post/64f7a382801d417e9755e382",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({ success: true, post: testPost })
            );
        }
    ),

    // fetch the comments from the test post
    rest.get(
        "https://odin-blog-api-ofv2.onrender.com/api/post/64f7a382801d417e9755e382/comments",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({ success: true, allComments: testAllComments })
            );
        }
    ),

    // user makes a comment
    rest.post(
        "https://odin-blog-api-ofv2.onrender.com/api/post/64f7a382801d417e9755e382/comment",
        (req, res, ctx) => {
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
                return res(ctx.status(200), ctx.json({ success: true }));
            } else {
                return res(
                    ctx.status(400),
                    ctx.json({
                        success: false,
                        errors: [{ msg: "Your comment cannot be empty" }],
                    })
                );
            }
        }
    ),

    // login route
    rest.post(
        "https://odin-blog-api-ofv2.onrender.com/api/login",
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ success: true, token }));
        }
    ),

    rest.get(
        "https://odin-blog-api-ofv2.onrender.com/api/user/64f89f20e9476b3f083b9a2f",
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ success: true }));
        }
    ),
];

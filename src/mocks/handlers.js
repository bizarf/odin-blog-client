import { rest } from "msw";

const allPosts = [
    {
        _id: "64f7a382801d417e9755e382",
        title: "This is a test blog post",
        textContent: "Test text content",
        timestamp: new Date(),
        published: "yes",
        user: {
            firstname: "John",
            lastname: "Doe",
            isAuthor: true,
            username: "john@doe.com",
        },
    },
];

export const handlers = [
    rest.get(
        "https://odin-blog-api-ofv2.onrender.com/api/posts",
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ success: true, allPosts }));
        }
    ),
];

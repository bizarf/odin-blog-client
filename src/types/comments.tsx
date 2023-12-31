type CommentsType = {
    _id: string;
    user: {
        firstname: string;
        lastname: string;
        isAuthor: boolean;
        username: string;
    };
    text: string;
    postId: string;
    timestamp: string;
};

export default CommentsType;

import UserType from "./user";

type JwtDecodeType = {
    exp: number;
    iat: number;
    user: string;
};

export default JwtDecodeType;

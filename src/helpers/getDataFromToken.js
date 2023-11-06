import Jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedeToken= Jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        return decodedeToken.id;
    } catch (error) {
        throw new Error(error.message);
    }
}
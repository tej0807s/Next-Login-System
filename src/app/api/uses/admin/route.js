
import { NextResponse } from "next/server";
import User from "@/models/user";
import { connect } from "@/lib/db";
import Jwt from "jsonwebtoken";

connect();


export async function GET(request) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = Jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const isAdmin = decodedToken.admin; // Assuming you have isAdmin as a Boolean in the decoded token

        if (isAdmin === true) { // Compare isAdmin with true
            const users = await User.find().select("-password -isAdmin"); // Assuming you want to exclude "password" and "isAdmin" fields
            return NextResponse.json({ message: "Users found", data: users });
        } else {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

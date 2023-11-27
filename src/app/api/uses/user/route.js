import { NextResponse } from "next/server";
import User from "@/models/user";
import { connect } from "@/lib/db";
import SignUp from "@/models/signup";
import Jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();


export async function GET(request) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = Jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const isAdmin = decodedToken.admin; 

        const userId = await getDataFromToken(request);

       

        if (!isAdmin === true) { // Compare isAdmin with true
            const user = await SignUp.findOne({ _id: userId }).select("-password, -isAdmin");
            return NextResponse.json({ message: "User found", data: user });
        } else {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

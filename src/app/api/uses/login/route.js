import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { connect } from "@/lib/db";
import User from '@/models/user';
import SignUp from "@/models/signup";
import  Jwt  from "jsonwebtoken";


connect();

export async function POST(req) {

    try {

        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await SignUp.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        console.log("user exists");

        const validpassword = await bcrypt.compare(password, user.password);
        if (!validpassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        //create token data
        const tokenData = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            admin: user.isAdmin
        }

        const admin = user.isAdmin;

        const token = await Jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });

        const res = NextResponse.json({ message: "Login Successful", success: 200, admin  });

        res.cookies.set("token", token, {
            httpOnly: true,
        });

        return res;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
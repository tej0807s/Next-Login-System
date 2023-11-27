import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Signup from "@/models/signup";


export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const requestData = await req.json();

        const { fullname, email , password,} = requestData;
        await connect();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
         
        const signup = await Signup.findByIdAndUpdate(id, { fullname, email, password: hashedPassword, });

            if (!signup) {
                return NextResponse.json({ message: "User not found." }, { status: 404 });
            }
        
        return NextResponse.json({ message: "User Updated!!" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "User Update Fail!!!" }, { status: 500 });
    }
}


export async function GET(req, { params }) {
    try {
        const { id } = params;
        const signup = await Signup.findOne({ _id: id });

        if (signup) {
            const userData = {
                fullname: signup.fullname,
                email: signup.email,
                password: signup.password,
            };
            return NextResponse.json({ message: "User found", data: userData });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}





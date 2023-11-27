import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { connect } from "@/lib/db";
import SignUp from "@/models/signup";


export async function POST(req) {

    try {

        connect();
        const reqBody = await req.json();
        const { fullname, email, password, } = reqBody;


        const user = await SignUp.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new SignUp({ fullname, email, password: hashedPassword, });

        const savedUser = await newUser.save();

        const id = await SignUp.findOne({ email: email });
        const userId = id._id;
        console.log(savedUser);

        // send email

        //await sendEmail({ fullname, username, email, address, nationality, zipcode, occupation, about, gender });

        return NextResponse.json({ message: "User created Successfully!!", success: true, data: userId });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import PersonalInfo from "@/models/personalinfo";


export async function POST(req) {

    try {

        
        connect();
        const reqBody = await req.json();
        const { nickname, username } = reqBody;

        const user = await PersonalInfo.findOne({ username });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const newUser = new PersonalInfo({ nickname, username });

        const savedUser = await newUser.save();
        const id = await PersonalInfo.findOne({ username: username });
        const userId = id._id;
        console.log(savedUser);

        return NextResponse.json({ message: "User created Successfully!!", success: true, data: userId });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
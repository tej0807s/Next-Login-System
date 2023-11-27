import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import OtherInfo from "@/models/otherinfo";
import { sendEmail } from "@/helpers/sendEmail";


export async function POST(req) {

    try {

        connect();
        const reqBody = await req.json();
        const { fullname, username, email, address, nationality, zipcode, occupation, about, gender } = reqBody;

        const newUser = new OtherInfo({ occupation, about, gender });

        const savedUser = await newUser.save();
        const id = await OtherInfo.findOne({ about: about });
        const userId = id._id;
        console.log(savedUser);

        await sendEmail({ fullname, username, email, address, nationality, zipcode, occupation, about, gender });

        return NextResponse.json({ message: "User created Successfully!!", success: true, data: userId });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
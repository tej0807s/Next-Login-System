import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { connect } from "@/lib/db";
import User from '@/models/user';
import { sendEmail } from "@/helpers/sendEmail";



export async function POST(req) {

    try {

        // const reqBody = await req.json()
        // const { firstname, lastname, address, password, email, postalcode, region, city, country } = reqBody

        connect();
        const reqBody = await req.json()
        const { fullname, username, password, nickname, email, address, nationality, zipcode, occupation, about, gender } = reqBody;

    
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User ({ fullname, username, password: hashedPassword, nickname, email, address, nationality, zipcode, occupation, about, gender });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send email

        await sendEmail({fullname, username, email, address, nationality, zipcode, occupation, about, gender});

        return NextResponse.json({ message: "User created Successfully!!", success: true });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
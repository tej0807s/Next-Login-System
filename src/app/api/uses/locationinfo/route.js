import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import LocationInfo from "@/models/locationinfo"


export async function POST(req) {

    try {

        connect();
        const reqBody = await req.json();
        const { address, nationality, zipcode } = reqBody;

        const newUser = new LocationInfo({ address, nationality, zipcode });

        const savedUser = await newUser.save();

        const id = await LocationInfo.findOne({ address: address });
        const userId = id._id;
        console.log(savedUser);

        return NextResponse.json({ message: "User created Successfully!!", success: true, data: userId });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
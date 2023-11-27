import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import OtherInfo from '@/models/otherinfo';


export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const requestData = await req.json();

        const { occupation, about, gender } = requestData;
        await connect();

        const otherInfo = await OtherInfo.findByIdAndUpdate(id, { occupation, about, gender });

        if (!otherInfo) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }
        return NextResponse.json({ message: "User Updated!!" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "User Update Fail!!!" }, { status: 500 });
    }
}



export async function GET(request, { params }) {
    try {
        const { id } = params;

        const otherinfo = await OtherInfo.findOne({ _id: id });

        if (otherinfo) {
            const userData = {
                occupation: otherinfo.occupation,
                about: otherinfo.about,
                gender: otherinfo.gender,
            };
            return NextResponse.json({ message: "User found", data: userData });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}






// const otherinfo = await OtherInfo.findByIdAndUpdate(otherInfo, { occupation, about, gender });

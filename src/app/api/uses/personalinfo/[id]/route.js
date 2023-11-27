import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import PersonalInfo from '@/models/personalinfo';


export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const requestData = await req.json();

        const { nickname, username } = requestData;
        await connect();

        const locationInfo = await PersonalInfo.findByIdAndUpdate(id, { nickname, username });

        if (!locationInfo) {
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

        // const otherinfo = await OtherInfo.findOne({ _id: otherInfo });
        const personalinfo = await PersonalInfo.findOne({ _id: id });
        
        if (personalinfo) {
            const userData = {
                nickname: personalinfo.nickname,
                username: personalinfo.username,
            };
            return NextResponse.json({ message: "User found", data: userData });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}



// occupation: otherinfo.occupation,
// about: otherinfo.about,
// gender: otherinfo.gender,
// isAdmin: signup.isAdmin,



// const otherinfo = await OtherInfo.findByIdAndUpdate(otherInfo, { occupation, about, gender });

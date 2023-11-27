import User from '@/models/user';
import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import LocationInfo from "@/models/locationinfo";
import OtherInfo from "@/models/otherinfo";
import PersonalInfo from "@/models/personalinfo";
import Signup from "@/models/signup";


export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const requestData = await req.json();
        const regex = /locationInfo=(\w+)&otherInfo=(\w+)&personalInfo=(\w+)/;
        const match = id.match(regex);

        const { fullname, isAdmin,  username, password, nickname, email, address, nationality, zipcode, occupation, about, gender } = requestData;
        await connect();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (match) {
            const [, locationInfo, otherInfo, personalInfo] = match;
           
            const [splitId] = id.split("&");

            const locationinfo = await LocationInfo.findByIdAndUpdate(locationInfo, { address, nationality, zipcode });
            const otherinfo = await OtherInfo.findByIdAndUpdate(otherInfo, { occupation, about, gender });
            const personalinfo = await PersonalInfo.findByIdAndUpdate(personalInfo, { nickname, username  });
            const signup = await Signup.findByIdAndUpdate(splitId, { fullname, email, password: hashedPassword, isAdmin });

            if (!locationinfo && !otherinfo && !personalinfo && !signup) {
                return NextResponse.json({ message: "User not found." }, { status: 404 });
            }
        }
        return NextResponse.json({ message: "User Updated!!" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "User Update Fail!!!" }, { status: 500 });
    }
}



export async function GET(request, { params }) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = Jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const isAdmin = decodedToken.admin;

        if (isAdmin === true) {
            const { id } = params;

            const regex = /locationInfo=(\w+)&otherInfo=(\w+)&personalInfo=(\w+)/;
            const match = id.match(regex);

            if (match) {
                const [, locationInfo, otherInfo, personalInfo] = match;
                const [splitId] = id.split("&");

                const locationinfo = await LocationInfo.findOne({ _id: locationInfo });
                const otherinfo = await OtherInfo.findOne({ _id: otherInfo });
                const personalinfo = await PersonalInfo.findOne({ _id: personalInfo });
                const signup = await Signup.findOne({ _id: splitId });

                if (signup) {
                    const userData = {
                        _id: signup._id,
                        fullname: signup.fullname,
                        username: personalinfo.username,
                        password: signup.password,
                        nickname: personalinfo.nickname,
                        email: signup.email,
                        occupation: otherinfo.occupation,
                        about: otherinfo.about,
                        gender: otherinfo.gender,
                        address: locationinfo.address,
                        nationality: locationinfo.nationality,
                        zipcode: locationinfo.zipcode,
                        isAdmin: signup.isAdmin,
                    };

                    return NextResponse.json({ message: "User found", data: userData });
                } else {
                    return NextResponse.json({ message: "User not found" }, { status: 404 });
                }
            }
        } else {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
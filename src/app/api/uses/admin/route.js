
import { NextResponse } from "next/server";
import User from "@/models/user";
import { connect } from "@/lib/db";
import Jwt from "jsonwebtoken";
import LocationInfo from "@/models/locationinfo";
import OtherInfo from "@/models/otherinfo";
import PersonalInfo from "@/models/personalinfo";
import Signup from "@/models/signup";

connect();

export async function GET(request) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = Jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const isAdmin = decodedToken.admin; // Assuming you have isAdmin as a Boolean in the decoded token

        if (isAdmin === true) { // Compare isAdmin with true
            //const users = await User.find().select("-password -isAdmin");

            const locationInfos = await LocationInfo.find();
            const otherInfos = await OtherInfo.find();
            const personalInfos = await PersonalInfo.find();
            const signups = await Signup.find().select("-password");

            //const allData = [...locationInfos, ...otherInfos, ...personalInfos, ...signups];

            const allData = signups.map((signup, index) => {
                //const signup = signups[index] || {};
                const personalInfo = personalInfos[index] || {};
                const otherInfo = otherInfos[index] || {};
                const locationInfo = locationInfos[index] || {};

                return {
                    _id: signup._id,
                    fullname: signup.fullname,
                    username: personalInfo.username,
                    nickname: personalInfo.nickname,
                    email: signup.email,
                    occupation: otherInfo.occupation,
                    about: otherInfo.about,
                    gender: otherInfo.gender,
                    address: locationInfo.address,
                    nationality: locationInfo.nationality,
                    zipcode: locationInfo.zipcode,
                };
            });

            const idsToDelete = {
                signUp: signups.map((signup) => signup._id),
                locationInfo: locationInfos.map((info) => info._id),
                otherInfo: otherInfos.map((info) => info._id),
                personalInfo: personalInfos.map((info) => info._id),
            };

            return NextResponse.json({ message: "Users found", data: allData, idsToDelete });
        } else {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
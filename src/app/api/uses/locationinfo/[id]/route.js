import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import LocationInfo from '@/models/locationinfo';


export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const requestData = await req.json();

        const { address, nationality, zipcode } = requestData;
        await connect();

        const locationInfo = await LocationInfo.findByIdAndUpdate(id, { address, nationality, zipcode });

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

        const locationinfo = await LocationInfo.findOne({ _id: id });
        if (locationinfo) {
            const userData = {
                address: locationinfo.address,
                nationality: locationinfo.nationality,
                zipcode: locationinfo.zipcode,
            };
            return NextResponse.json({ message: "User found", data: userData });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

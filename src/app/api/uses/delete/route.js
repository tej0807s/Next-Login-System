// import { connect } from "@/lib/db";
// import User from "@/models/user";
// import { NextResponse, NextRequest } from "next/server";

// export default async function handler(NextRequest) {
//     const { id } = NextRequest.query;

//     if (NextRequest.method === 'DELETE') {
//         console.log('Received DELETE request for id:', id);
//         try {
//             await connect();
//             const user = await User.findById(id);

//             if (!user) {
//                 return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
//             }

//             await user.remove();
//             return new NextResponse(JSON.stringify({ message: 'User deleted successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
//         } catch (error) {
//             console.error('Error deleting user:', error);
//             return new NextResponse(JSON.stringify({ message: 'Error deleting user' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
//         }
//     } else {
//         return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
//     }
// }

import { connect } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req) {

    //const { id } = req.query;

    const id = req.nextUrl.searchParams.get('id');


    console.log("Received DELETE request for id:", id);
    try {
        await connect();


        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        // }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // return new NextResponse(JSON.stringify({ message: "User deleted successfully" }), {
        //     status: 200,
        //     headers: { "Content-Type": "application/json" },
        // });

        return NextResponse.json({ message: "User deleted successfully", success: 200 });

    } catch (error) {
        console.error("Error deleting user:", error);
        return new NextResponse(JSON.stringify({ message: "Error deleting user" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

}
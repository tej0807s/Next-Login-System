
import { connect } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req, {params}) {

    try {

        //const { id } = params;
        const id = req.nextUrl.searchParams.get('id');
        console.log("Received DELETE request for id:", id);
        
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
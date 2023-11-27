import { NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import SignUp from '@/models/signup';
import LocationInfo from '@/models/locationinfo';
import OtherInfo from '@/models/otherinfo';
import PersonalInfo from '@/models/personalinfo';

export  async function DELETE(req) {
    try {
        await connect(); // Connect to the database
        
        const id = req.nextUrl.searchParams.get('id');
        const locationinfo = req.nextUrl.searchParams.get('locationInfo');
        const otherinfo = req.nextUrl.searchParams.get('otherInfo');
        const personalinfo = req.nextUrl.searchParams.get('personalInfo');
      
        console.log("server id:", id)

        // Delete the corresponding records
        const deletePromises = [
            SignUp.findByIdAndDelete(id),
            locationinfo ? LocationInfo.findByIdAndDelete(locationinfo) : Promise.resolve(),
            otherinfo ? OtherInfo.findByIdAndDelete(otherinfo) : Promise.resolve(),
            personalinfo ? PersonalInfo.findByIdAndDelete(personalinfo) : Promise.resolve(),
        ];

        await Promise.all(deletePromises);

        if (!SignUp) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Return success response
        return new NextResponse(
            JSON.stringify({ message: 'User deleted successfully', success: 200 }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error deleting user:', error);
        // Return error response
        return new NextResponse(
            JSON.stringify({ message: 'Error deleting user' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
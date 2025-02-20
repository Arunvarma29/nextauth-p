import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { getDataFromToken } from '@/helpers/getDataFromToken';


connect()


export async function POST(request: NextRequest) {
    try {
        // extratct data from token
        const userId = await getDataFromToken(request)
        const user = await User.findOne({ _id: userId }).select("-password")

        // check if there is no user
        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({ error: "check your credentials" },
            { status: 400 })
    }
}
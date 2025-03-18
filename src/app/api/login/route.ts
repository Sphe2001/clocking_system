import { connect } from '@/dbConfig/dbConfig';
import Student from '@/models/studentModel';
import Supervisor from '@/models/supervisorModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {role, email, password} = reqBody;
        if(role === "student"){
            const user = await Student.findOne({email})
            if(!user){
                return NextResponse.json({error: 'User does not exist'}, {status: 400})
            }

            //check if password is correct
            const validPassword = await bcryptjs.compare(password, user.password)

            if(!validPassword){
                return NextResponse.json({error: 'Invalid password'}, {status: 400})
            }

            // const isVerified = user.isVerified;
            // if(!isVerified){
            //     return NextResponse.json({error: 'Please verify your account before login'}, {status: 400})
            // }

            //Create token data
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            //create token
            const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: '1d'})

            const response = NextResponse.json({
                message: 'Login successful',
                success: true,
            })
            response.cookies.set('token', token, {
                httpOnly: true,
            })
            return response;

        }else if(role === "supervisor"){
            const user = await Student.findOne({email})
            if(!user){
                return NextResponse.json({error: 'User does not exist'}, {status: 400})
            }

            
            const validPassword = await bcryptjs.compare(password, user.password)

            if(!validPassword){
                return NextResponse.json({error: 'Invalid password'}, {status: 400})
            }

            // const isVerified = user.isVerified;
            // if(!isVerified){
            //     return NextResponse.json({error: 'Please verify your account before login'}, {status: 400})
            // }

            
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            
            const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: '1d'})

            const response = NextResponse.json({
                message: 'Login successful',
                success: true,
            })
            response.cookies.set('token', token, {
                httpOnly: true,
            })
            return response;
        }
        } catch (error: any) {
            return NextResponse.json(
                { error: error.message || 'Internal Server Error' },
                { status: 500 }
            );
        }
    
}
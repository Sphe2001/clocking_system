import { connect } from '@/dbConfig/dbConfig';
import Student from '@/models/studentModel';
import Supervisor from '@/models/supervisorModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
//import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, surname, initials, contactNo, role, password } = reqBody;

        
        if (!username || !email ||!surname || !initials || !contactNo || !role || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        if(role === "student"){
            const existingUsername = await Student.findOne({ username });
            if (existingUsername) {
                return NextResponse.json({ error: 'Student number has already been used' }, { status: 409 });
            }

            // Check if email already exists
            const existingEmail = await Student.findOne({ email });
            if (existingEmail) {
                return NextResponse.json({ error: 'Email has already been used' }, { status: 409 });
            }

            // Hash password
            const hashedPassword = await bcryptjs.hash(password, 10);

            // save new user
            const newUser = new Student({
                username,
                email,
                surname,
                initials, 
                contactNo,
                role,
                password: hashedPassword,
            });

            await newUser.save();
            //const savedUser = await newUser.save();

            //send verification email
           // await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})

            return NextResponse.json({
                message: 'Student created successfully',
                success: true,
            }, { status: 201 });
    
            
        } else if(role === "supervisor"){
            const existingUsername = await Supervisor.findOne({ username });
            if (existingUsername) {
                return NextResponse.json({ error: 'Staff number has already been used' }, { status: 409 });
            }

            // Check if email already exists
            const existingEmail = await Supervisor.findOne({ email });
            if (existingEmail) {
                return NextResponse.json({ error: 'Email has already been used' }, { status: 409 });
            }

            // Hash password
            const hashedPassword = await bcryptjs.hash(password, 10);

            // save new user
            const newUser = new Supervisor({
                username,
                email,
                surname,
                initials, 
                contactNo,
                role,
                password: hashedPassword,
            });

            await newUser.save();
            //const savedUser = await newUser.save();

            //send verification email
           // await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})

            return NextResponse.json({
                message: 'Supervisor created successfully',
                success: true,
            }, { status: 201 });

        }} catch (error: any) {
            return NextResponse.json(
                { error: error.message || 'Internal Server Error' },
                { status: 500 }
            );
        };

        
}

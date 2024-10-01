import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const POST = async (request: Request) => {
  try {
    // Extract email and password from the request body
    const { email, password } = await request.json();
  
    await connect();

    const ADMIN_EMAIL = "chandraM@gmail.com"; 
    const ADMIN_PASSWORD = "chandhu@123"; 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        return NextResponse.redirect('/product');
      } else {
        return new NextResponse("Wrong credentials", { status: 400 });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.redirect('/product');
    }

    return new NextResponse("User created successfully", { status: 201 });
  } catch (err: any) {
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
};

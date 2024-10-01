// src/app/api/admin.ts

import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    await connect();

    // Check for existing user (admin)
    const existingAdmin = await User.findOne({ email });
    if (!existingAdmin) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordValid) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Redirect to the product page upon successful login
    return new NextResponse("Login successful", { status: 200 });
  } catch (err: any) {
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
};

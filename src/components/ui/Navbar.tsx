"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./button";

const Navbar = () => {
  const { data: session }: any = useSession();

  return (
    <div className="bg-gray-400 h-[70px] flex items-center">
      <ul className="flex text-white w-[80%] m-auto justify-between p-2 items-center">
        <div className="flex items-center">
          <Link href="/" className="relative group">
            Home
            <span className="absolute block h-1 w-full bg-orange-400 bottom-0 left-0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
        </div>
        <div className="flex gap-10 items-center">
          <Link href="/getAll" className="relative group">
            <li>
              Product
              <span className="absolute block h-1 w-full bg-orange-400 bottom-0 left-0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </li>
          </Link>
          <Link href="/cart" className="relative group">
            <li>
              Add Cart
              <span className="absolute block h-1 w-full bg-orange-400 bottom-0 left-0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </li>
          </Link>
          {!session ? (
            <>
              <Link href="/login" className="relative group">
                <li>
                  Login
                  <span className="absolute block h-1 w-full bg-orange-400 bottom-0 left-0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </li>
              </Link>
              <Link href="/register" className="flex items-center">
                <img
                  className="w-[50px] h-[30px] bg-white rounded-[50%] border-transparent hover:border hover:border-orange-500 cursor-pointer"
                  src="/user.svg"
                  alt="User"
                />
                <li></li>
              </Link>
            </>
          ) : (
            <>
              <span>{session.user?.email}</span>
              <li>
                <Button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 hover:bg-blue-700 rounded-full"
                >
                  Logout
                </Button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

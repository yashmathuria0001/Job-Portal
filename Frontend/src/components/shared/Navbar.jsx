import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.Jsx";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
const Navbar = () => {
    const User=false;
  return (
   
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold underline offset-1 hover:underline-offset-4">
            Job{"     "}
            <span className="text-[#F83002] underline offset-1 hover:underline-offset-4">
              Hunt
            </span>
          </h1>
        </div>
        <div className="flex gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {
          !User?(
            <div className="flex items-center gap-2">
                <Button variant="outline">Login</Button>
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button>
            </div>
          ):(
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent ClassName="w-8px">
              <div className="flex gap-4 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <div>
                  <h4 ClassName="font-medium">Yash</h4>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-gray-600">
                <div className="flex w-fit items-center gap-1 cursor-pointer">
                  <User2 />
                  <Button variant="link">View Profile</Button>
                </div>
                <div className="flex w-fit items-center gap-1 cursor-pointer">
                  <LogOut />
                  <Button variant="link">Logout</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          )
        }
        </div>
      </div>
    </div>
  );
};
export default Navbar;

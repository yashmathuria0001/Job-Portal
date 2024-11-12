import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.Jsx";
import { Button } from "../ui/button";
import {Avatar,AvatarImage} from "../ui/avatar"
const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold underline offset-1 hover:underline-offset-4">
            Carrer{" "}
            <span className="text-[#1e90ff] underline offset-1 hover:underline-offset-4">
              Hunt
            </span>
          </h1>
        </div>
        <div className="flex gap-3">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <h1>hello</h1>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default Navbar;

import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?t=st=1735102135~exp=1735105735~hmac=400568e83f1140440dd4bfa2eab8fe4d247fe159b0f4b610aea42c9e85a2f324&w=740" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Comapny Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel incidunt
          repellendus vitae consequuntur doloribus non rem quae? Repellendus,
          eius eaque?
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          12 Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          Part-time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          24 LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;

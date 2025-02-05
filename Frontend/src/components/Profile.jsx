import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSelector} from "react-redux";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import AppliedJobTable from "../components/AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// const skills = ["Html", "css", "javascipt"];
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const navigate=useNavigate();
  const resume=true;

  useEffect(() => {
    if (!user) {
        navigate("/");
    }
}, []);

  return (
      <div>
          <Navbar />
          <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
              <div className='flex justify-between'>
                  <div className='flex items-center gap-4'>
                      <Avatar className="h-24 w-24">
                          <AvatarImage src={user?.profile?.profilePhoto}alt="profile" />
                      </Avatar>
                      <div>
                          <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                          <p>{user?.profile?.bio}</p>
                      </div>
                  </div>
                  <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
              </div>
              <div className='my-5'>
                  <div className='flex items-center gap-3 my-2'>
                      <Mail />
                      <span>{user?.email}</span>
                  </div>
                  <div className='flex items-center gap-3 my-2'>
                      <Contact />
                      <span>{user?.phoneNumber}</span>
                  </div>
              </div>
              <div className='my-5'>
                  <h1>Skills</h1>
                  <div className='flex items-center gap-1'>
                      {
                          user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                      }
                  </div>
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label className="text-md font-bold">Resume</Label>
                  {
                      user?.profile?.resume ? (<a target='blank' href={user?.profile?.resume} className='w-full text-blue-500 hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>) : <span>NA</span>
                    
                  }
              </div>
          </div>
          <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
              <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
              {/* Applied Job Table   */}
              <AppliedJobTable />
          </div>
          <UpdateProfileDialog open={open} setOpen={setOpen}/>
      </div>
  );
};

export default Profile;

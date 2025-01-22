import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";

const OtpAuth = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from navigation state
  const email = location?.state?.email;

  const submitHandler = async (e) => {
    e.preventDefault();

    // Debugging: Log OTP and email before proceeding
    console.log("Email:", email);
    console.log("OTP entered:", otp);

    if (!otp) {
      toast.error("Please enter the OTP");
     
      return;
    }

    try {
      setLoading(true);
      console.log("Sending OTP to the server...");
      
      const res = await axios.post(`${USER_API_END_POINT}/verify-otp`, {
        email,
        otp,
      });

      // Debugging: Log server response
      console.log("Server response:", res);

      if (res.data.success) {
        toast.success("OTP Verified Successfully!");
        navigate("/login"); // Redirect to login after successful verification
      } else {
        toast.error(res.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
      navigate("/Signup")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Verify OTP</h1>
          <p className="text-sm mb-4 text-gray-600">
            An OTP has been sent to your email: <strong>{email}</strong>
          </p>
          <div className="my-2">
            <Label>Enter OTP</Label>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
            />
          </div>
          {loading ? (
            <Button disabled className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default OtpAuth;

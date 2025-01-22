import crypto from "crypto";

const otpGenerator = () => {
    return crypto.randomInt(100000, 1000000).toString(); // Generates a secure 6-digit OTP as a string
};

export default otpGenerator;

import React, { useState } from "react";
import API from "../../services/API";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      const { data } = await API.post("/api/auth/forgot-password", { email });
      if (data.success) {
        alert(data.message);
        setStep(2);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      const { data } = await API.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        alert(data.message);
        window.location.replace("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      {step === 1 && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
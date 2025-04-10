import React from "react";
import { FaUserShield, FaKey, FaClock } from "react-icons/fa";

export default function Dashboard() {
    const user = {
        name: "John Doe", // Replace with data from context or props
        email: "johndoe@example.com",
        otpVerified: true,
        lastPasswordReset: "2025-04-08 10:32 AM"
    };

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-md-12 text-center">
                    <h2 className="text-primary">Welcome, {user.name}</h2>
                    <p className="text-muted">{user.email}</p>
                </div>
            </div>

            {/* Info Cards */}
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <FaUserShield size={30} className="text-info mb-2" />
                            <h6>OTP Verification</h6>
                            <p className={user.otpVerified ? "text-success" : "text-danger"}>
                                {user.otpVerified ? "Verified" : "Not Verified"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <FaKey size={30} className="text-warning mb-2" />
                            <h6>Password Status</h6>
                            <p>Password is active and secure.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <FaClock size={30} className="text-danger mb-2" />
                            <h6>Last Password Reset</h6>
                            <p>{user.lastPasswordReset}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="text-center mt-5">
                <button className="btn btn-outline-primary px-4">
                    Update Password
                </button>
            </div>
        </div>
    );
}

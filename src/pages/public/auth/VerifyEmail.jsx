import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AuthLayoutCard from "../../../components/common/AuthLayoutCard";
import { verifyUser } from "../../../services/authService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function VerifyEmail() {
    const { verificationToken } = useParams();

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("Trying to verify your email...");

    const hasVerified = useRef(false) 

    useEffect(() => {
        if (hasVerified.current) return; //since the app used to mount two times I used to check the user has verified or not 

        hasVerified.current = true;

        const verify = async () => {
            try {
                const result = await verifyUser(verificationToken);

                console.log("the success result", result);

                setStatus("success");
                setMessage(result.message);
            } catch (err) {
                console.log("verification error", err);

                setStatus("error");
                setMessage(err.message);
            }
        };

        if (verificationToken) {
            verify();
        }
    }, [verificationToken]);


    return (
        <AuthLayoutCard
            title={
                status === "loading"
                    ? "VERIFYING YOUR EMAIL"
                    : status === "success"
                    ? "EMAIL VERIFIED"
                    : "VERIFICATION FAILED"
            }
            description={message}
            backLink="/login"
            backText="login now"
        >
            {status === "loading" && (
                <div className="flex justify-center items-center my-6">
                    <AiOutlineLoading3Quarters
                        size={48}
                        className="text-orange-500 animate-spin"
                    />
                </div>
            )}
            
            {status === "success" && (
                <div className="flex items-center justify-center text-green-600"><FaCheckCircle size={24} /></div>
            )}

            {status === "error" && (
                <div className="flex items-center justify-center text-red-600"><FaTimesCircle size={24} /></div>
            )}
        </AuthLayoutCard>
    );
}
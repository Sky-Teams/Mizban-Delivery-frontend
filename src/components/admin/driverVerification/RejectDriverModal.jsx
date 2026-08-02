import { useState } from "react";
import Button from "../../common/order/Button";
import toast from "react-hot-toast";
import { MdClose } from 'react-icons/md'; 

export default function RejectDriverModal({ isOpen, onClose, onConfirm, loading = false}) {
    const [reason, setReason] = useState("");

    if (!isOpen) return null;

    const handleReject = () => {
        if (!reason.trim()) {
            toast.error('Provide rejection reason')
            return
        };
        onConfirm(reason);
        setReason("");
    };

    const handleClose = () => {
        setReason("");
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
            <div
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {t('REJECT_DRIVER_REGISTRATION')}
                    </h2>
                    <span className="hover:cursor-pointer hover:text-orange-500 duration-100 transition">
                        <MdClose 
                            onClick={handleClose}
                        />
                    </span>

                </div>
                

                <p className="mt-2 text-sm text-gray-500">
                    {('DRIVER_REJECTION_REASON')}
                </p>

                <textarea
                    className="mt-6 h-36 w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500"
                    placeholder={t("WRITE_REJECTION_REASON")}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        text={t("CANCEL")}
                        variant="secondary"
                        onClick={handleClose}
                    />

                    <Button
                        text={t("REJECT")}
                        variant="primary"
                        disabled={!reason.trim() || loading}
                        onClick={handleReject}
                    />
                </div>
            </div>
        </div>
    );
}
import { useTranslation } from "react-i18next";
import { HiX } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { isRTL } from "../../utils/IsRTLDirection";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, TITLE, MESSAGE }) {
  const {t} = useTranslation()
  useLockBodyScroll(isOpen)
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all">
        <div className={isRTL() ? "flex justify-start p-2" : "flex justify-end p-2"}>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-orange-100 rounded-full cursor-pointer transition-colors"
          >
            <HiX className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="px-6 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
            <IoWarningOutline className="w-8 h-8 text-[#FF5722]" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t(TITLE)}
          </h3>
          <p className="text-gray-500 mb-8">
            {t(MESSAGE)}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {t("CANCEL")}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-[#FF5722] hover:bg-orange-600 text-white font-medium rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95 cursor-pointer"
            >
              {t("CONFIRM")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
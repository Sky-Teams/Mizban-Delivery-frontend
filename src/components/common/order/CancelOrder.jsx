import { useState } from "react";
// import { X, AlertTriangle } from "lucide-react";
import useOrderStore from "../../../store/admin/useOrderStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";

export default function CancelOrder({orderId, isOpen, onClose }) {
  if (!isOpen) return null;
  const {t, i18n} = useTranslation()
  const [reason, setReason] = useState(null)
  const [text, setText] = useState("")
  const cancelOrder = useOrderStore((state)=> state.cancelOrder)

  const confirmCancel = ()=>{
    if(!reason || reason.trim() === ""){
       toast.error(t("Please enter the reason to cancel order"))
       return;
    }

    cancelOrder(orderId, reason)
    onClose()
  }

  const isLength200 = text.length === 200 ? "absolute bottom-4 right-4 text-xs md:text-sm text-red-400" : "absolute bottom-4 right-4 text-xs md:text-sm text-gray-400"
  const isLTR = i18n.dir() === "lrt"
  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl z-10 overflow-hidden transform transition-all">
        <div className="p-6"> 
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <FiAlertTriangle size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t("Cancel Order")}</h2>
          </div>

          <p className = {isLTR  ? "text-gray-600 text-sm mb-6 text-start" : "text-gray-600 text-sm mb-6 text-start" }>
           {t("Cancel confirmation text")}
          </p>

          <div  className={ isLTR ? "space-y-2  relative" : "space-y-2  relative text-start"}>
            <label className= "text-sm font-semibold text-gray-700 block ml-1">
              {t("Cancellation Reason")}
            </label>
            <textarea 
              className="w-full min-h-[120px] p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none placeholder:text-gray-400" 
              placeholder={t("Cancel textarea placeholder")}
              onChange={(e)=> {setReason(e.target.value)
                setText(e.target.value)
              }}
              maxLength={200}
            /> 
            <div className={isLength200}><span>{text.length}</span> / 200</div>
          </div>

          <div className="flex gap-3 mt-8">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-3 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
            > 
             {t("Cancel")}
            </button>
            <button 
              onClick={()=> confirmCancel()}
              className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-200 transition-all cursor-pointer" 
            > 
              {t("Confirm")} 
            </button>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        > 
          <FiX size={20} /> 
        </button>
      </div>
    </div>
  );
}

import { useState, useRef } from 'react';
import { 
  LuPencil, 
  LuBan, 
  LuCheck,   
  LuUserPlus,
  LuTrash,
  LuPackageCheck
} from "react-icons/lu";
import { MdMoreVert } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../../store/admin/useOrderStore';
import AssignCourier from './AssignCourier';
import CancelOrder from './CancelOrder';
import toast from 'react-hot-toast';
import { useClickOutside } from '../../../hooks/useOutsideClick';
import { useTranslation } from 'react-i18next';
import { hasAccess } from '../../../utils/hasAccess';
import { ALL_PERMISSIONS } from '../../../constants/permissions';
import i18next from 'i18next';

const OrderActions = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAssignCourierModalOPen, setAssignCourierModalOpen] = useState(false)
  const [isCancelOrderModalOpen, setCancelOrderModalOpen] = useState(false)
  const getOrderDetailsToShow = useOrderStore((state)=> state.getOrderDetailsToShow)
  const markOrderDelivered = useOrderStore((state)=> state.markOrderDelivered)
  const deleteOrder = useOrderStore((state)=> state.deleteOrder)
  const pickupOrder = useOrderStore((state)=>state.pickupOrder)
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isRTL = i18next.language === "fa" || i18next.language === "ps"

  useClickOutside(menuRef, () => setIsOpen(false));
  const handleCancelOrder = () => {
    if (order.status === "cancelled") {
      toast.error(t("The order is already cancelled!"));
      return;
    }
    if (order.status === "delivered") {
      toast.error(t("You cannot cancel a delivered order!"));
      return;
    }
    setCancelOrderModalOpen(true);
  };
  const handleDeleteOrder = () => {
    const isPaid = order.paymentStatus === "paid";
    const isDelivered = order.status === "delivered";
    if (isPaid || isDelivered) {
      toast.error(t("Cannot delete paid or delivered order!"));
      return;
    }
    deleteOrder(order.id);
    toast.success(t("Order deleted successfully!"));
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
      >
        <MdMoreVert size={18} />
      </button>

      {isOpen && (
        <div
          className={`absolute ltr:right-0 rtl:left-0 mt-2 z-50 w-56 
            bg-white cursor-pointer rounded-xl shadow-xl border 
            border-gray-100 py-2 animate-in fade-in zoom-in 
            duration-150 origin-top-right 
          `}
        >
          {hasAccess(ALL_PERMISSIONS.EDIT_ORDER) && (
            <button
              onClick={() => {
                navigate(`/orders/edit-order/${order.id || order._id}`);
                getOrderDetailsToShow(order, false, true);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <LuPencil size={16} /> {t("Edit Details")}
            </button>
          )}
          {hasAccess(ALL_PERMISSIONS.ASSIGN_ORDER) && (
          <button
            onClick={() => {
              setAssignCourierModalOpen(true);
              setIsOpen(false);
              console.log(isAssignCourierModalOPen);
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <LuUserPlus size={16} /> {t("Assign Courier")}
          </button>
          )}
          {hasAccess(ALL_PERMISSIONS.PICKUP_ORDER) && (
          <button
          onClick={()=>{
             setIsOpen(false)
             pickupOrder(order._id)
          }}
          className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer hover:text-orange-600 text-sm text-gray-600 hover:bg-orange-50 transition-colors"
          >
            <LuPackageCheck size={16}/> {t("Pick Up")}
          </button>
          )}
          {hasAccess(ALL_PERMISSIONS.MARK_DELIVERED)&&(
          <button
            onClick={() => {
              markOrderDelivered(order._id);
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <LuCheck size={16} /> {t("Mark Delivered")}
          </button>
          )}
          {hasAccess(ALL_PERMISSIONS.CANCEL_ORDER) &&(
          <button
            onClick={() => {
              handleCancelOrder();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 cursor-pointer py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LuBan size={16} /> {t("Cancel Order")}
          </button>
          )}
          {hasAccess(ALL_PERMISSIONS.DELETE_ORDER)&& (
          <button
            onClick={() => {
              handleDeleteOrder();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 cursor-pointer py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LuTrash size={16} /> {t("Delete Order")}
          </button>
          )}
        </div>
      )}
      {isAssignCourierModalOPen && (
        <AssignCourier
          isOpen={isAssignCourierModalOPen}
          orderId={order._id}
          onClose={() => setAssignCourierModalOpen(false)}
        />
      )}
      {isCancelOrderModalOpen && (
        <CancelOrder
          isOpen={isCancelOrderModalOpen}
          orderId={order._id}
          onClose={() => setCancelOrderModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderActions;

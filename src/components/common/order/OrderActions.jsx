import { useState, useRef } from 'react';
import { 
  MoreVertical, 
  Pencil, 
  Ban, 
  CheckCircle, 
  UserPlus,
  Trash, 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../../store/admin/useOrderStore';
import AssignCourier from './AssignCourier';
import CancelOrder from './CancelOrder';
import toast from 'react-hot-toast';
import { useClickOutside } from '../../../hooks/useOutsideClick';

const OrderActions = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAssignCourierModalOPen, setAssignCourierModalOpen] = useState(false)
  const [isCancelOrderModalOpen, setCancelOrderModalOpen] = useState(false)
  const editOrder = useOrderStore((state)=> state.editOrder)
  const markOrderDelivered = useOrderStore((state)=> state.markOrderDelivered)
  const deleteOrder = useOrderStore((state)=> state.deleteOrder)
  const menuRef = useRef(null);
  const navigate = useNavigate();
   useClickOutside(menuRef,()=> setIsOpen(false))
  const handleCancelOrder = ()=>{
    if(order.status === "cancelled"){
     toast.error("The order is already cancelled!")
     return
    }
    if(order.status === "delivered"){
      toast.error("You cannot cancel a delivered order!")
      return
    }
    setCancelOrderModalOpen(true)
  }
  const handleDeleteOrder = ()=> {
   const isPaid = order.payment.paymentStatus === "Paid"
   const isDelivered = order.status === "delivered"
   if(isPaid || isDelivered){
      toast.error("Cannot delete paid or delivered order!")
      return
   }
   deleteOrder(order.id)
   toast.success("Order deleted successfully!")
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-[100] w-56 bg-white cursor-pointer rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-150 origin-top-right">
          
          <button 
            onClick={() => {
              navigate(`/orders/edit-order/${order.id}`)
              editOrder(order)
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <Pencil size={16} /> Edit Details
          </button>

          <button 
            onClick={() => {
              setAssignCourierModalOpen(true)
              setIsOpen(false);
              console.log(isAssignCourierModalOPen)
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <UserPlus size={16} /> Assign Courier
          </button>

          <button 
            onClick={() => {
              markOrderDelivered(order.id)
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <CheckCircle size={16} /> Mark Delivered
          </button>

          <button 
            onClick={() => {
              handleCancelOrder()
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 cursor-pointer py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <Ban size={16} /> Cancel Order
          </button>
          <button 
            onClick={() => {
              handleDeleteOrder()
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 cursor-pointer py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <Trash size={16} /> Delete Order
          </button>


        </div>
      )}
       {isAssignCourierModalOPen &&(
          <AssignCourier isOpen={isAssignCourierModalOPen} orderId={order.id} onClose={()=>setAssignCourierModalOpen(false)} />
       )} 
       {
        isCancelOrderModalOpen &&(
          <CancelOrder  isOpen={isCancelOrderModalOpen} orderId={order.id} onClose={()=> setCancelOrderModalOpen(false)} />
        )
       }
    </div>
  );
};

export default OrderActions;
import { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, 
  Pencil, 
  Ban, 
  CheckCircle, 
  UserPlus, 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../store/admin/useOrderStore';

const OrderActions = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const editOrder = useOrderStore((state)=> state.editOrder)
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
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
              console.log("Assigning courier for order:", order.id);
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <UserPlus size={16} /> Assign Courier
          </button>

          <button 
            onClick={() => {
              console.log("Marking as delivered:", order.id);
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 cursor-pointer text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <CheckCircle size={16} /> Mark Delivered
          </button>

          <div className="my-1 border-t border-gray-100" />

          <button 
            onClick={() => {
              console.log("Opening cancel reason modal for:", order.id);
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 cursor-pointer py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <Ban size={16} /> Cancel Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderActions;
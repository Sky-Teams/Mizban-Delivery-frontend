import Button from "../../components/common/order/Button";
import { Link } from "react-router-dom";
import OrdersTable from "../../components/common/order/OrdersTable";
import useOrderStore from "../../store/admin/useOrderStore";
import { Plus, ShoppingBag } from "lucide-react";

export default function Orders() {
  const orders = useOrderStore((state) => state.orders);
  const createNewOrder = useOrderStore((state)=> state.createNewOrder)

  
  return (
    <div className="min-h-screen bg-gray-100 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header  */}
        <div className="flex items-center flex-wrap gap-4 justify-center items-center md:justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg shadow-orange-100 shadow-lg">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-none">
                Orders
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track all customer purchases
              </p>
            </div>
          </div>

          <Link to="/order/create-order">
            <Button 
              text="Create Order" 
              onClick={()=> createNewOrder()}
              variant="primary" 
              icon={<Plus size={18} className="inline"/>}
              className="px-6 rounded-xl font-bold shadow-md hover:shadow-lg transition-all" 
            />
          </Link>
        </div>

        {/* Orders Table*/}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <OrdersTable orders={orders} />
        {orders.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-medium">No orders found. Start by creating one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
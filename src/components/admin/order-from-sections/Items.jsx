
import { useState } from "react";
import AddItemModal from "../../common/order/AddItemModal";
import Button from "../../common/order/Button";
import { LuPackage, LuPlus, LuMinus, LuTrash2, LuShoppingBag } from "react-icons/lu";
import useOrderStore from "../../../store/admin/useOrderStore";

export default function Items() {
  const [isModalOpen, setModalOPen] = useState(false)
  const items = useOrderStore((state)=> state.orderData.items)
  const increaseQuantity = useOrderStore((state)=> state.increaseQuantity)
  const decreaseQuantity = useOrderStore((state)=> state.decreaseQuantity)
  const deleteItem = useOrderStore((state)=> state.deleteItem)
  const type = useOrderStore((state)=> state.orderData.type)
  const visited = useOrderStore((state)=>state.visited)

  const itemsError = type !== "parcel" && visited["items"] && items.length === 0
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-orange-600">
          <LuShoppingBag size={22} />
          <h2 className="text-lg font-bold text-gray-800">Items Details</h2>
        </div>
        <Button 
          onClick={()=> setModalOPen(true)}
          text="Add Item" 
          icon={<LuPlus size={18} />} 
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-semibold"
        />
      </div>

      <div className="overflow-x-auto">
        {items.length === 0  || itemsError ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
            <LuPackage className="mx-auto mb-2 opacity-20" size={40} />
           {itemsError ? (<p className="text-red-500 text-sm">Add at least one item</p>) : (<p>No items added yet!</p>)}
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-2 text-sm font-bold text-gray-600">Item Name</th>
                <th className="py-4 px-2 text-sm font-bold text-gray-600">Quantity</th>
                <th className="py-4 px-2 text-sm font-bold text-gray-600">Unit Price</th>
                <th className="py-4 px-2 text-sm font-bold text-gray-600 text-right">Total</th>
                <th className="py-4 px-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-2 text-sm font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3 bg-gray-100 w-fit rounded-lg p-1">
                      <button type="button"
                       className="p-1  cursor-pointer hover:text-orange-600 bg-white rounded-md transition-all"
                       onClick={()=> decreaseQuantity(item.id)}
                       >
                        <LuMinus size={14} />
                      </button>
                      <span className="text-sm font-bold min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button  type="button"
                      onClick={()=> increaseQuantity(item.id)}
                      className="p-1 cursor-pointer  hover:text-orange-600 bg-white rounded-md transition-all"
                      >
                        <LuPlus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-600 font-medium">
                    {item.unitPrice} AFN
                  </td>
                  <td className="py-4 px-2 text-sm font-bold text-gray-900 text-right">
                    {item.quantity * item.unitPrice} AFN
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button type="button" 
                    onClick={()=>  deleteItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <LuTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
          {isModalOpen && <AddItemModal isOpen={isModalOpen} onClose={()=> setModalOPen(false)}/> }
    </div>
  );
}
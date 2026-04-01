
import { LuPackage, LuTriangleAlert } from "react-icons/lu";
import Dropdown from "../../common/Dropdown"; 
import useOrderStore from  "../../../store/admin/useOrderStore"
import { useEffect } from "react";
export default function PackageInfo() {
  const sizes = [
    { id: 1, name: "Small ", value: "small" },
    { id: 2, name: "Medium ", value: "medium" },
    { id: 3, name: "Large ", value: "large" },
  ];
const packageDetails = useOrderStore((state)=> state.orderData.packageDetails)
const type = useOrderStore((state)=> state.orderData.type)
const updateOrderData = useOrderStore((state)=> state.updateOrderData)
const visited = useOrderStore((state)=> state.visited)

const sizeError = type === "parcel" && packageDetails.size === "" && visited["packageDetails.size"]
const weightError = type === "parcel" && (packageDetails.weight === 0 || packageDetails.weight === "")&& visited["packageDetails.weight"]
const errorStyle =  "text-red-500 text-sm"
  return (
    <div className="bg-white  p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 text-orange-600">
        <LuPackage size={22} />
        <h2 className="text-lg font-bold text-gray-800">Package Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Package Weight */}
        <div className="flex flex-col">
          <label htmlFor="weight" className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
            Package Weight
          </label>
          <div className="relative">
          <input 
            type="number" 
            min={0} 
            step="any"
            inputmode="decimal" 
            id="weight" 
            onWheel={(e) => e.target.blur()} 
            value={packageDetails.weight}
            onChange={(e)=> updateOrderData("packageDetails.weight", e.target.value)}
            placeholder="0.00"
            className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all w-full text-sm font-medium pr-12" 
          />
          <span className="absolute right-4 pl-5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-black">Kg</span>
          </div>
          {weightError && <span className={errorStyle}>Weight must be greater than 0</span>}
        </div>

        {/* Package Size */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">
            Package Size
          </label>
          <Dropdown 
            options={sizes} 
            placeholder="Select Size"
            value={packageDetails.size}
            onSelect={(val) => updateOrderData("packageDetails.size", val)} 
          />
          {sizeError && <span className={errorStyle}>Select the size</span>}
        </div>
  

        <div className="flex flex-col md:flex-row gap-6 w-full items-stretch md:col-span-2">

          <div className="flex flex-col flex-1">
            <label htmlFor="note" className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1">
              Notes
            </label>
            <textarea
              value={packageDetails.note}
              onChange={(e) => updateOrderData("packageDetails.note", e.target.value)}
              id="note"
              maxLength={200}
              placeholder="Add any specific delivery instructions here..."
              className="p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all w-full min-h-[120px] resize-none text-sm"
            ></textarea>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-sm font-bold mb-1.5 opacity-0 hidden md:block">
              Spacing
            </label>
            <label className="flex items-center gap-3 p-5 bg-orange-50/50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors h-full min-h-[120px]">
              <input
                type="checkbox"
                id="isFragile"
                checked={packageDetails.fragile}
                onChange={(e) => updateOrderData("packageDetails.fragile", e.target.checked)}
                className="w-5 h-5 accent-orange-600 cursor-pointer shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 flex items-center gap-1">
                  <LuTriangleAlert className="text-orange-500" size={18} /> Fragile Package
                </span>
                <span className="text-xs text-gray-500 leading-relaxed">
                  Handle with extra care during transit
                </span>
              </div>
            </label>
          </div>
        </div>



      </div>
    </div>
  );
}
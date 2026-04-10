import React, { useEffect, useMemo, useState } from 'react';
import { LuWallet, LuTag, LuTruck, LuBanknote, LuCalculator, LuCoins } from "react-icons/lu";
import Dropdown from "../../common/Dropdown";
import useOrderStore from '../../../store/admin/useOrderStore';

export default function PaymentAndPrice() {
  const paymentMethods = [
    { id: 1, name: "Cash on Delivery (COD)", value: "COD" },
    { id: 2, name: "Online Payment", value: "online" },
  ];
  const paymentType = useOrderStore((state)=> state.orderData.paymentType)
  const amountToCollect  = useOrderStore((state)=> state.orderData.amountToCollect)
  const deliveryPrice = useOrderStore((state)=> state.orderData.deliveryPrice)
  const finalPrice = useOrderStore((state)=> state.orderData.finalPrice)
  const items = useOrderStore((state)=> state.orderData.items)
  const updateOrderData  = useOrderStore((state)=> state.updateOrderData)
  const visited = useOrderStore((state)=> state.visited)
  const totalItemsPrice = useMemo(()=>{
    return items.reduce((sum, item)=> {
    return sum + item.quantity * item.unitPrice
   }, 0)
  }, [items])

   useEffect(()=>{
    updateOrderData("deliveryPrice.total", totalItemsPrice)
   }, [totalItemsPrice])  
    
   const paymentTypeError = paymentType === "" && visited["paymentType"]

   const [discountError, setDiscountError] = useState(false)
  const subtotal = Number(deliveryPrice.total) || 0;
  const discount = Number(deliveryPrice.discount) || 0;
  const shipping = Number(amountToCollect) || 0;
  
  useEffect(() => {
      if (subtotal > 0 && discount > subtotal || shipping> 0 && discount > shipping){
        setDiscountError(true);
      }
      else {
        setDiscountError(false);
      }
    }, [discount, subtotal, shipping])

    const totalAmountToPay = useMemo(() => {
      const calculated = subtotal + shipping - discount;
      return Math.max(0, calculated);
    }, [subtotal, shipping, discount]);

   useEffect(()=>{
      updateOrderData("finalPrice", totalAmountToPay)
   }, [totalAmountToPay])

  const inputStyle = "p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all w-full text-sm font-medium pr-12";
  const readOnlyStyle = "p-3.5 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 outline-none w-full pr-12";
  const labelStyle = "text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2";

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 text-orange-600">
        <div className="p-2 bg-orange-50 rounded-lg">
          <LuWallet size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Financial Summary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
        
        {/* Items Subtotal */}
        <div className="flex flex-col">
          <label htmlFor="amountToCollect" className={labelStyle}>
          Items Subtotal
          </label>
          <div className="relative">
            <input type="number" id="amountToCollect" 
            value={deliveryPrice.total}        
            readOnly className={readOnlyStyle} placeholder="0.00" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-black">AFN</span>
          </div>
        </div>

        {/* Discount */}
        <div className="flex flex-col">
          <label htmlFor="discount" className={labelStyle}>
           Applied Discount
          </label>
          <div className="relative">
            <input type="number" id="discount" className={inputStyle} min={0} 
             onWheel={(e) => e.target.blur()} 
            value={deliveryPrice.discount}
            onChange={(e)=> updateOrderData("deliveryPrice.discount", e.target.value)}
            placeholder="0.00" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-black">AFN</span>
          </div>
          {discountError && <span className="text-red-500 text-sm">Discount is too much</span>}
        </div>

        {/* Delivery Price */}
        <div className="flex flex-col">
          <label htmlFor="total" className={labelStyle}>
           Shipping Fee
          </label>
          <div className="relative">
            <input type="number" id="total" className={inputStyle} min={0} 
             onWheel={(e) => e.target.blur()} 
            value={amountToCollect}
            onChange={(e)=> updateOrderData("amountToCollect", e.target.value)}
            placeholder="0.00" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-black">AFN</span>
          </div>
        </div>

        {/* Final Price */}
        <div className="flex flex-col">
          <label htmlFor="finalPrice" className="text-sm font-bold text-orange-600 mb-1.5 flex items-center gap-2">
         Total Payable Amount
          </label>
          <div className="relative">
            <input 
            value={finalPrice}
              type="number" 
              min={0}
              id="finalPrice" 
              readOnly 
              className="p-2.5 bg-orange-50 border border-orange-200 rounded-xl outline-none text-lg font-black text-orange-700 w-full pr-12" 
              placeholder="0.00"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-orange-400 font-black">AFN</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="pt-8 border-t border-gray-100">
        <div className="max-w-md">
          <label className={labelStyle}>
           Payment Selection
          </label>
          <div className="max-w-xs">
            <Dropdown 
              options={paymentMethods} 
              placeholder="Choose Method"
              value={paymentType}
              onSelect={(val) => updateOrderData("paymentType", val)} 
            />
            {paymentTypeError && <span className='text-red-500 text-sm'>Select payment type</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
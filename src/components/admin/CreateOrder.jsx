import React, { useState } from 'react';
import useOrderStore from "../../store/admin/useOrderStore";
import Button from "../common/Button";
import Map from "../common/Map";
import { User, Package, CreditCard, ClipboardList, Trash2, Plus } from "lucide-react";
import AddItemModal from '../common/AddItemModal';

export default function CreateOrder() {
    const orderData = useOrderStore((state) => state.orderData);
    const setOrderData = useOrderStore((state) => state.setOrderData);
    const isItemModalOpen = useOrderStore((state)=> state.isItemModalOpen)
    const setItemModalOpen = useOrderStore((state)=> state.setItemModalOpen)
    const [items, setItems] = useState([
        { id: 1, name: "Industrial Control Module", qty: 2, price: 120 }
    ]);


    return (
        <div className="bg-gray-50 min-h-screen p-8 font-sans" dir="ltr">
            <div className="max-w-5xl mx-auto">
                <form className="space-y-6">
                    
                    {/* --- Header --- */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="font-bold text-2xl text-gray-900 tracking-tight">New Order Entry</h1>
                            <p className="text-gray-500 text-sm">Fill in the details below to create a new delivery task.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button text="Discard Draft" variant="secondary" type="button" />
                            <Button text="Create Order" type="submit" variant="primary" />
                        </div>
                    </div>

                    {/* --- Section 1: Customer Info --- */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-orange-600">
                            <User size={20} strokeWidth={3} />
                            <h2 className="text-lg font-bold text-gray-800">Customer Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Ahmad Shah" 
                                    value={orderData.customer.customerName || ""} 
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all" 
                                    onChange={(e) => setOrderData("customer", "customerName", e.target.value)}  
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="+93 700 000 000" 
                                    value={orderData.customer.phoneNumber || ""}
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all" 
                                    onChange={(e) => setOrderData("customer", "phoneNumber", e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Delivery Address <span className="text-red-500">*</span></label>
                                <textarea 
                                    rows="3" 
                                    placeholder="Enter full street address, apartment, or suite" 
                                    value={orderData.customer.deliveryAddress || ""} 
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all" 
                                    onChange={(e) => setOrderData("customer", "deliveryAddress", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* --- Geo Location (Map Integration) --- */}
                        <div className="mt-6 overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                {/* Interactive Map Component */}
                                <div className="w-full md:w-80 h-64 bg-gray-100 relative">
                                    <Map />
                                </div>

                                {/* Coordinates*/}
                                <div className="flex-1 p-6 bg-orange-50/20 flex flex-col justify-between">
                                    <div>
                                        <div className="space-y-3 mt-4">
                                            <div className="flex justify-between items-center border-b border-orange-100 pb-2">
                                                <span className="text-xs font-bold text-gray-500 uppercase">Latitude</span>
                                                <span className="text-sm font-mono font-bold text-gray-800">
                                                    {orderData.customer.latitude || "0.000000"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-orange-100 pb-2">
                                                <span className="text-xs font-bold text-gray-500 uppercase">Longitude</span>
                                                <span className="text-sm font-mono font-bold text-gray-800">
                                                    {orderData.customer.longitude || "0.000000"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex gap-2">
                                        <p className="text-xs text-gray-400 italic">Marker updates automatically on click</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Section 2: Order Details (Table) --- */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-orange-600">
                                <Package size={20} strokeWidth={3} />
                                <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
                            </div>
                            <Button
                                text="Add Item"
                                onClick={() => setItemModalOpen(true)}
                                variant="primary"
                                icon={<Plus size={16} className="inline mr-1" />}
                                type="button"
                            />
                        </div>
                     {isItemModalOpen &&(
                        <AddItemModal isOpen={isItemModalOpen} onClose={()=> setItemModalOpen(false)}/>
                     )}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-400 text-xs uppercase border-b border-gray-100">
                                        <th className="pb-4 font-semibold text-center">Item Name</th>
                                        <th className="pb-4 font-semibold text-center">Quantity</th>
                                        <th className="pb-4 font-semibold text-center">Unit Price</th>
                                        <th className="pb-4 font-semibold text-center">Line Total</th>
                                        <th className="pb-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {items.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-50">
                                            <td className="py-4 font-medium text-gray-800 text-center">{item.name}</td>
                                            <td className="py-4 text-center">
                                                <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                                                    <button type="button" className="px-3 py-1 text-gray-600 hover:bg-gray-200">-</button>
                                                    <span className="px-3 font-bold text-gray-800">{String(item.qty).padStart(2, '0')}</span>
                                                    <button type="button" className="px-3 py-1 text-gray-600 hover:bg-gray-200">+</button>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-600 text-center">AFN {item.price.toFixed(2)}</td>
                                            <td className="py-4 font-bold text-gray-900 text-center">AFN {(item.qty * item.price).toFixed(2)}</td>
                                            <td className="py-4 text-right">
                                                <button type="button" className="p-2 hover:bg-red-50 rounded-full transition-colors group">
                                                    <Trash2 size={16} className="text-gray-300 group-hover:text-red-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- Section 3: Payment & Summary --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 text-orange-600">
                                <CreditCard size={20} strokeWidth={3} />
                                <h2 className="text-lg font-bold text-gray-800">Payment</h2>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-700">Payment Method</label>
                                <div className="flex gap-2 pt-1">
                                    <Button text="Credit Card" variant="primary" type="button" />
                                    <Button text="Bank Transfer" variant="secondary" type="button" />
                                    <Button text="COD" variant="secondary" type="button" />
                                </div>
                                <div className="flex flex-col gap-2 pt-4">
                                    <label className="text-sm font-bold text-gray-700">Payment Status</label>
                                    <select 
                                        className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 transition-all"
                                        value={orderData.payment.paymentStatus || "Pending"}
                                        onChange={(e) => setOrderData("payment", "paymentStatus", e.target.value)}
                                    >
                                        <option>Pending</option>
                                        <option>Paid</option>
                                        <option>Failed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                            <div className="flex items-center gap-2 mb-6 text-orange-600">
                                <ClipboardList size={20} strokeWidth={3} />
                                <h2 className="text-lg font-bold text-gray-800">Summary</h2>
                            </div>
                            <div className="space-y-4 text-sm text-gray-600 flex-1">
                                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-gray-900">AFN 240.00</span></div>
                                <div className="flex justify-between"><span>Delivery Fee</span><span className="font-bold text-gray-900">AFN 15.00</span></div>
                                <div className="flex justify-between"><span>Taxes (8%)</span><span className="font-bold text-gray-900">AFN 19.20</span></div>
                                <div className="border-t border-dashed pt-4 mt-4 flex justify-between items-end">
                                    <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                                    <span className="font-black text-orange-600 text-3xl">AFN 274.20</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
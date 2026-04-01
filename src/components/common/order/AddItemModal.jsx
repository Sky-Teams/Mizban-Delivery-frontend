import React, { useState, useEffect } from 'react';
import { LuX, LuShoppingBag, LuPlus, LuMinus } from 'react-icons/lu';
import Button from './Button';
import useOrderStore from '../../../store/admin/useOrderStore';
import toast from 'react-hot-toast';

const AddItemModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState("");
    const [productName, setProductName] = useState("");
    
    const updateOrderData = useOrderStore((state) => state.updateOrderData);
    const items = useOrderStore((state) => state.orderData.items);

    useEffect(() => {
        if (!isOpen) {
            setQuantity(1);
            setUnitPrice("");
            setProductName("");
        }
    }, [isOpen]);

    const handleItemSubmission = (e) => {
        if (e) e.preventDefault();

        if (!productName.trim()) {
            return toast.error("Enter a valid product name!");
        }
        if (!unitPrice || Number(unitPrice) <= 0) {
            return toast.error("Enter a valid unit price!");
        }

        const newItem = {
            id: Date.now(),
            name: productName.trim(), 
            quantity: Number(quantity),
            unitPrice: Number(unitPrice),
        };

        const finalItems = [...items, newItem];
        updateOrderData("items", finalItems);
        
        toast.success("Item added successfully!");
        onClose();
    };

    const totalAmount = (Number(quantity) * (Number(unitPrice) || 0));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[24px] shadow-xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="px-6 pt-6 pb-2 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Add Item</h3>
                            <p className="text-gray-400 text-xs font-medium">Enter product details</p>
                        </div>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="p-2 hover:bg-orange-50 text-gray-400 hover:text-orange-600 rounded-full transition-all"
                        >
                            <LuX size={18} />
                        </button>
                    </div>

                    {/* Form Body */}
                    <div className="px-6 py-4 space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Product Name</label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                                    <LuShoppingBag size={16} />
                                </div>
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500/50 transition-all text-sm font-medium"
                                    placeholder="e.g. Ashak"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Quantity</label>
                                <div className="flex items-center justify-between p-1 bg-gray-50 rounded-2xl border border-gray-100">
                                    <button 
                                        type="button" 
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-500 hover:text-orange-600 transition-colors shadow-sm"
                                    >
                                        <LuMinus size={14} />
                                    </button>
                                    <span className="text-sm font-bold text-gray-800">{String(quantity).padStart(2, "0")}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => setQuantity(prev => prev + 1)} 
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-500 hover:text-orange-600 transition-colors shadow-sm"
                                    >
                                        <LuPlus size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Unit Price</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">AFN</div>
                                    <input
                                        type="number"
                                        onWheel={(e) => e.target.blur()} 
                                        min={0}
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500/50 transition-all text-sm font-mono font-bold"
                                        placeholder="0"
                                        value={unitPrice}
                                        onChange={(e) => setUnitPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary Display */}
                        <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100/50 flex justify-between items-center">
                            <span className="text-xs font-bold text-orange-800/60 uppercase tracking-tight">Total Amount</span>
                            <div className="text-right">
                                <span className="text-lg font-black text-orange-600">AFN {totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="px-6 pb-8 pt-2">
                        <Button 
                            text="Add Item"
                            variant="primary"
                            type="button"
                            onClick={()=>handleItemSubmission() }
                            className='w-full'
                        />
                    </div>
            </div>
        </div>
    );
};

export default AddItemModal;
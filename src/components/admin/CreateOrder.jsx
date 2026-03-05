import Button from "../common/Button";
import { User, MapPin, Package, CreditCard, ClipboardList, Trash2, Plus } from "lucide-react";

export default function CreateOrder() {
    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="max-w-5xl mx-auto">

                {/* --- Header --- */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-bold text-2xl text-gray-900 tracking-tight">New Order Entry</h1>
                        <p className="text-gray-500 text-sm">Fill in the details below to create a new delivery task.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button text="Discard Draft" variant="secondary" />
                        <Button text="Create Order" />
                    </div>
                </div>

                <form className="space-y-6">

                    {/* --- Section 1: Customer Info --- */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-orange-600">
                            <User size={20} strokeWidth={3} />
                            <h2 className="text-lg font-bold text-gray-800">Customer Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Mahnoor Ahmadi" className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="+93 700 000 0000" className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all" />
                            </div>
                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Delivery Address <span className="text-red-500">*</span></label>
                                <textarea rows="3" placeholder="Enter full street address, apartment, or suite" className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all" />
                            </div>
                        </div>

                        {/* --- Geo Location --- */}
                        <div className="mt-6 overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                {/* Google Map */}
                                <div className="w-full md:w-80 h-48 md:h-64 bg-gray-100 relative">
                                    <iframe
                                        title="Google Map"
                                        width="100%"
                                        height="100%"
                                        src="https://maps.google.com/maps?q=34.5553,69.2075&z=14&output=embed"
                                        className="grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
                                    ></iframe>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="bg-white/90 p-1.5 rounded-full shadow-lg border border-orange-200">
                                            <MapPin className="text-orange-600 fill-orange-100" size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Coordinates & Location Details */}
                                <div className="flex-1 p-6 bg-orange-50/20 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="p-2 bg-orange-600 rounded-lg text-white">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Active Delivery Zone</p>
                                                <h3 className="text-lg font-bold text-gray-800">Kabul, Afghanistan</h3>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mt-4">
                                            <div className="flex justify-between items-center border-b border-orange-100 pb-2">
                                                <span className="text-xs font-bold text-gray-500 uppercase">Latitude</span>
                                                <span className="text-sm font-mono font-bold text-gray-800">34.5553° N</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-orange-100 pb-2">
                                                <span className="text-xs font-bold text-gray-500 uppercase">Longitude</span>
                                                <span className="text-sm font-mono font-bold text-gray-800">69.2075° E</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex gap-2">
                                        <Button text="Pick On Map" variant="secondary" />
                                        <Button text="Confirm" variant="primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Section 2: Order Details --- */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-orange-600">
                                <Package size={20} strokeWidth={3} />
                                <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
                            </div>
                            <Button
                                text=" Add Item"
                                variant="primary"
                                icon={<Plus size={16} className="inline" />}
                            />

                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-400 text-xs uppercase border-b border-gray-100">
                                        <th className="pb-4 font-semibold">Item Name</th>
                                        <th className="pb-4 font-semibold text-center">Quantity</th>
                                        <th className="pb-4 font-semibold">Unit Price</th>
                                        <th className="pb-4 font-semibold">Line Total</th>
                                        <th className="pb-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-gray-50">
                                        <td className="py-4 font-medium text-gray-800">Industrial Control Module</td>
                                        <td className="py-4 text-center">
                                            <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                                                <button type="button" className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition-colors">-</button>
                                                <span className="px-3 font-bold text-gray-800">02</span>
                                                <button type="button" className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition-colors">+</button>
                                            </div>
                                        </td>
                                        <td className="py-4 text-gray-600">AFN 120.00</td>
                                        <td className="py-4 font-bold text-gray-900">AFN 240.00</td>
                                        <td className="py-4 text-right">
                                            <button type="button" className="p-2 hover:bg-red-50 rounded-full transition-colors group">
                                                <Trash2 size={16} className="text-gray-300 group-hover:text-red-500" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- Section 3: Payment Summary --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 text-orange-600">
                                <CreditCard size={20} strokeWidth={3} />
                                <h2 className="text-lg font-bold text-gray-800">Payment</h2>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-700">Payment Method</label>
                                <div className="flex gap-2 pt-3">
                                    <Button
                                        text="Credit Card"
                                        variant="primary"
                                    />
                                    <Button
                                        text="Bank Transfer"
                                        variant="secondary"
                                    />
                                    <Button
                                        text="COD"
                                        variant="secondary"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 pt-4">
                                    <label className="text-sm font-bold text-gray-700">Payment Status</label>
                                    <select className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 transition-all">
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
                                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-gray-900">AFN 317.50</span></div>
                                <div className="flex justify-between"><span>Delivery Fee</span><span className="font-bold text-gray-900">AFN 15.00</span></div>
                                <div className="flex justify-between"><span>Taxes (8%)</span><span className="font-bold text-gray-900">AFN 25.40</span></div>
                                <div className="border-t border-dashed pt-4 mt-4 flex justify-between items-end">
                                    <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                                    <span className="font-black text-orange-600 text-3xl">AFN 357.90</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
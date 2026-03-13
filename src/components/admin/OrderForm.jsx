import React, { isValidElement, useEffect, useState } from 'react';
import useOrderStore from "../../store/admin/useOrderStore";
import Button from "../common/Button";
import Map from "../common/Map";
import { User, Package, CreditCard, ClipboardList, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import AddItemModal from '../common/AddItemModal';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import OrderStates from "../common/OrderStates"


export default function OrderForm() {
  const orderData = useOrderStore((state) => state.orderData);
  const setCustomerAndPaymentData = useOrderStore((state) => state.setCustomerAndPaymentData);
  const isItemModalOpen = useOrderStore((state) => state.isItemModalOpen);
  const setItemModalOpen = useOrderStore((state) => state.setItemModalOpen);
  const increaseQuantity = useOrderStore((state) => state.increaseQuantity);
  const decreaseQuantity = useOrderStore((state) => state.decreaseQuantity);
  const getItemTotalFee = useOrderStore((state) => state.getItemTotalFee);
  const itemsTotalFee = useOrderStore((state) => state.itemsTotalFee);
  const deleteItem = useOrderStore((state) => state.deleteItem);
  const resetOrderData = useOrderStore((state) => state.resetOrderData)
  const addNewOrder = useOrderStore((state) => state.addNewOrder)
  const isEditingOrder = useOrderStore((state) => state.isEditingOrder)
  const editExitingOrder = useOrderStore((state) => state.editExitingOrder)
  const isViewingOrder = useOrderStore((state)=> state.isViewingOrder)
  const navigate = useNavigate()
  const [activePaymentMethod, setActivePaymentMethod] = useState(orderData.payment.paymentMethod);
  const [errors, setErrors] = useState({
    customerName: "",
    phoneNumber: "",
    deliveryAddress: "",
    items: "",
    paymentMethod: "",
  });

  const activeMethod = "bg-orange-600 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-80  px-3 py-1 rounded-lg cursor-pointer shadow-orange-200";
  const deactiveMethod = "bg-white text-black hover:bg-gray-100 border disabled:cursor-not-allowed  disabled:opacity-80 border-gray-200 px-3 py-1 rounded-lg cursor-pointer shadow-sm shadow-gray-200";

  useEffect(() => {
    getItemTotalFee();
  }, [orderData.item]);
  useEffect(() => {
    setActivePaymentMethod(orderData.payment.paymentMethod || "");
  }, [orderData.payment.paymentMethod]);
  useEffect(()=>{
    if (orderData.item.length > 0) {
    setErrors(prev => ({ ...prev, items: "" }));
  }
  },[orderData.item])
  const handlePaymentButtonsClick = (e) => {
    setCustomerAndPaymentData("payment", "paymentMethod", e.target.value);
    setActivePaymentMethod(e.target.value);
    setErrors(prev => ({ ...prev, paymentMethod: "" }));
  };
  const resetForm = () => {
    resetOrderData();
    setActivePaymentMethod("");
    setErrors({
      customerName: "",
      phoneNumber: "",
      deliveryAddress: "",
      items: "",
      paymentMethod: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      customerName: "",
      phoneNumber: "",
      deliveryAddress: "",
      items: "",
      paymentMethod: "",
    };
    let hasError = false;

    if (!orderData.customer.customerName?.trim()) {
      newErrors.customerName = "Customer name is required.";
      hasError = true;
    }
    const phone = orderData.customer.phoneNumber?.trim() || "";

    if (!phone || isNaN(phone) || phone.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
      hasError = true;
    }
    if (!orderData.customer.deliveryAddress?.trim()) {
      newErrors.deliveryAddress = "Delivery address is required.";
      hasError = true;
    }
    if (!orderData.item || orderData.item.length === 0) {
      newErrors.items = "At least one item is required.";
      hasError = true;
    }
    if (!orderData.payment.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const payload = {
      id: isEditingOrder ? orderData.id : `ORD-${Date.now()}`,
      customer: { ...orderData.customer },
      item: [...orderData.item],
      payment: {
        paymentMethod: orderData.payment.paymentMethod,
        paymentStatus: orderData.payment.paymentStatus,
      },
      status: "Pending",
      itemsTotalFee: itemsTotalFee,
      deliveryFee: 100,
      total: itemsTotalFee + 100,
    };
    if (isEditingOrder) {
      editExitingOrder(payload)
      toast.success("Order Edited Successfully!")

      navigate("/orders")
    } else {
      addNewOrder(payload)
      toast.success("Order Created Successfully!")
      navigate("/orders")
    }
    console.log(payload)
  };
  let title = ""
  if(isEditingOrder){
    title = "Edit Order"
  }else if(isViewingOrder){
    title ="Order Details"
  }else{
    title= "Create Order"
  }
  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans" dir="ltr">
      <div className="max-w-5xl mx-auto">
          {isViewingOrder &&(
                 <div className="mb-6">
          <Link 
            to="/orders" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors"
          >
            <div className="p-2 rounded-lg bg-orange-100 transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Back to Orders</span>
          </Link>
        </div>
          )}
      <fieldset disabled={isViewingOrder}>
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* --- Header --- */}
          <div className="flex md:justify-between justify-center gap-4 flex-wrap items-center mb-8">
            <div>
              <h1 className="font-bold text-2xl text-gray-900 tracking-tight">{title}</h1>
              <p className="text-gray-500 text-sm">{isViewingOrder ? "View the order full details" : "Fill in the details below to create a new delivery task."}</p>
            </div>
            {!isViewingOrder &&(
              <div className="flex gap-3">
                <Button text="Reset" variant='secondary' onClick={()=> resetForm()} />
               <Link to="/orders"><Button text="Discard Draft" variant="secondary" onClick={()=> resetForm()}  type="button" /></Link>
              <Button text={isEditingOrder ? "Update Order" : "Create Order"} type="submit" variant="primary" />
          </div>
                )}
            {isViewingOrder &&(
                <OrderStates order={orderData}/>
            )}
                </div>
          {/* --- Section 1: Customer Info --- */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-orange-600">
              <User size={20} strokeWidth={3} />
              <h2 className="text-lg font-bold text-gray-800">Customer Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Ahmad Shah"
                  value={orderData.customer.customerName || ""}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all"
                  onChange={(e) => {
                    setCustomerAndPaymentData("customer", "customerName", e.target.value);
                    if (e.target.value.trim() !== "") {
                      setErrors(prev => ({ ...prev, customerName: "" }));
                    }
                  }}
                  
                />
                {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="0700000000"
                  value={orderData.customer.phoneNumber || ""}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all"
                  onChange={(e) => {setCustomerAndPaymentData("customer", "phoneNumber", e.target.value)
                     if (e.target.value.trim() !== "") {
                      setErrors(prev => ({ ...prev, phoneNumber: "" }));
                    }
                  }}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Delivery Address */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Delivery Address <span className="text-red-500">*</span></label>
                <textarea
                  rows="3"
                  placeholder="Enter full street address, apartment, or suite"
                  value={orderData.customer.deliveryAddress || ""}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all"
                  onChange={(e) =>{setCustomerAndPaymentData("customer", "deliveryAddress", e.target.value)
                     if (e.target.value.trim() !== "") {
                      setErrors(prev => ({ ...prev, deliveryAddress: "" }));
                    }
                  }}
                />
                {errors.deliveryAddress && <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>}
              </div>
            </div>

            {/* Geo Location Map */}
            <div className="mt-6 overflow-hidden border border-gray-200 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row h-120 md:h-80">
                <div className="w-full h-full flex-1 h-64 bg-gray-100 relative"><Map /></div>
                <div className=" p-12 bg-orange-50/20 flex flex-col justify-between">
                  <div>
                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between items-center border-b border-orange-100 pb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Latitude</span>
                        <span className="text-sm font-mono font-bold text-gray-800">{orderData.customer.latitude || "0.000000"}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-orange-100 pb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Longitude</span>
                        <span className="text-sm font-mono font-bold text-gray-800">{orderData.customer.longitude || "0.000000"}</span>
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

          {/* --- Section 2: Order Items --- */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-orange-600">
                <Package size={20} strokeWidth={3} />
                <h2 className="text-lg font-bold text-gray-800">Items Details</h2>
              </div>
              <Button
                className="disabled:cursor-not-allowed disabled:opacity-80"
                text="Add Item"
                onClick={() => setItemModalOpen(true)}
                variant="primary"
                icon={<Plus size={16} className="inline mr-1" />}
                type="button"
              />
            </div>
            {errors.items && <p className="text-red-500 text-center font-bold text-md mb-2">{errors.items}</p>}
            {isItemModalOpen && <AddItemModal isOpen={isItemModalOpen} onClose={() => setItemModalOpen(false)} />}
            <div className="overflow-x-auto">
              {orderData.item.length === 0 ? (<div className='flex justify-center'>No Item Added Yet!</div>) : (
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
                    {orderData.item.map((item) => (
                      <tr key={item.id} className="border-b border-gray-50">
                        <td className="py-4 font-medium text-gray-800 text-center">{item.itemName}</td>
                        <td className="py-4 text-center">
                          <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                            <button type="button" onClick={() => decreaseQuantity(item.id)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg cursor-pointer text-gray-500 hover:text-orange-600 transition-colors"><Minus size={14} /></button>
                            <span className="px-3 font-bold text-gray-800">{String(item.quantity).padStart(2,'0')}</span>
                            <button type="button" onClick={() => increaseQuantity(item.id)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg cursor-pointer text-gray-500 hover:text-orange-600 transition-colors"><Plus size={14} /></button>
                          </div>
                        </td>
                        <td className="py-4 text-gray-600 text-center">AFN {item.unitPrice}</td>
                        <td className="py-4 font-bold text-gray-900 text-center">AFN {(Number(item.quantity) * Number(item.unitPrice))}</td>
                        <td className="py-4 text-right">
                          <button type="button" className="p-2 hover:bg-red-50 rounded-full transition-colors group disabled:cursor-not-allowed">
                            <Trash2 size={16} className="text-gray-300 group-hover:text-red-500" onClick={() => deleteItem(item.id)} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
                  <input type="button" value="Online" className={activePaymentMethod === "Online" ? activeMethod : deactiveMethod} onClick={handlePaymentButtonsClick} />
                  <input type="button" value="COD" className={activePaymentMethod === "COD" ? activeMethod : deactiveMethod} onClick={handlePaymentButtonsClick} />
                </div>
                {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}

                <div className="flex flex-col gap-2 pt-4">
                  <label className="text-sm font-bold text-gray-700">Payment Status</label>
                  <select
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 transition-all"
                    value={orderData.payment.paymentStatus || "Pending"}
                    onChange={(e) => setCustomerAndPaymentData("payment", "paymentStatus", e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-6 text-orange-600">
                <ClipboardList size={20} strokeWidth={3} />
                <h2 className="text-lg font-bold text-gray-800">Summary</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 flex-1">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-gray-900">AFN {itemsTotalFee}</span></div>
                <div className="flex justify-between"><span>Delivery Fee</span><span className="font-bold text-gray-900">AFN 100</span></div>
                <div className="border-t border-dashed pt-4 mt-4 flex justify-between items-end">
                  <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                  <span className="font-black text-orange-600 text-3xl">AFN {itemsTotalFee + 100}</span>
                </div>
              </div>
            </div>
          </div>

        </form>
        </fieldset>
      </div>
    </div>
  );
}
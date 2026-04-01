
import useOrderStore from "../../store/admin/useOrderStore";
import Button from "../common/order/Button";
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import OrderStates from "../common/order/OrderStates"
import ServiceInfo from "./order-from-sections/ServiceInfo"
import SenderAndReceiverInfo from "./order-from-sections/SenderAndReceiverInfo"
import Location from './order-from-sections/Location';
import Items from "./order-from-sections/Items"
import PaymentAndPrice from "./order-from-sections/PaymentAndPrice"
import PackageInfo from "./order-from-sections/PackageInfo"
import { LuArrowLeft } from 'react-icons/lu';
import { useTranslation } from "react-i18next";


export default function OrderForm() {
  const orderData = useOrderStore((state) => state.orderData);
  const isEditingOrder = useOrderStore((state) => state.isEditingOrder)
  const isViewingOrder = useOrderStore((state) => state.isViewingOrder)
  const resetOrderForm = useOrderStore((state)=> state.resetOrderForm)
  const addNewOrder = useOrderStore((state)=> state.addNewOrder)
  const orders  = useOrderStore((state)=> state.orders)
  const editExitingOrder = useOrderStore((state)=> state.editExitingOrder)
  const isOrderValid = useOrderStore((state)=> state.isOrderValid)
  const visitAll = useOrderStore((state)=> state.visitAll)
  const navigate = useNavigate()

const {t} = useTranslation()

 const handleSubmit = (e)=>{
     e.preventDefault()
     visitAll()
     const newOrder = {
          ...orderData,
      id: Date.now(),
      status: "pending",
      paymentStatus: orderData.paymentType === "COD" ? "paid" : "unpaid",
      createdAt: new Date().toISOString()
    }
    const updateOrder  = {
      ...orderData
    }
    if(!isOrderValid()){
      return
    }
    if(isEditingOrder){
     editExitingOrder(updateOrder)
     toast.success(t("Order Updated Successfully"))
    }else{
    addNewOrder(newOrder)
     toast.success(t("Order Added Successfully"))
    }

     navigate("/orders")
     console.log(orders)
 }
  let title = ""
  if (isViewingOrder) {
    title = "Order Details"
  } else if (isEditingOrder) {
    title = "Edit Order"
  } else {
    title = "Create Order"
  }
  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans" dir="ltr">
      <div className="max-w-5xl mx-auto">
        {isViewingOrder && (
          <div className="mb-6">
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors"
            >
              <div className="p-2 rounded-lg bg-orange-100 transition-colors">
                <LuArrowLeft size={20} />
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
              {!isViewingOrder && (
                <div className="flex gap-3">
                  <Button text="Reset" variant='secondary' onClick={() => resetOrderForm()} />
                  <Link to="/orders"><Button text="Discard Draft" variant="secondary" onClick={() => resetOrderForm()} type="button" /></Link>
                  <Button text={isEditingOrder ? "Update Order" : "Create Order"} type="submit" variant="primary" />
                </div>
              )}
              {isViewingOrder && (
                <OrderStates order={orderData} />
              )}
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <ServiceInfo />
              <SenderAndReceiverInfo />
              <Location />
              <Items />
              <PackageInfo />
              <PaymentAndPrice />
            </div>

          </form>
        </fieldset>
      </div>
    </div>
  );
}

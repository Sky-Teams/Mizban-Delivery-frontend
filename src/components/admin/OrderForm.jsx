import useOrderFormStore from '../../store/orders/useOrderFormStore';
import useOrderStore from '../../store/orders/useOrderStore';
import Button from '../common/order/Button';
import { useNavigate, Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import OrderStates from '../common/order/OrderStates';
import ServiceInfo from './order-form-sections/ServiceInfo';
import SenderAndReceiverInfo from './order-form-sections/SenderAndReceiverInfo';
import Location from './order-form-sections/Location';
import Items from './order-form-sections/Items';
import PaymentAndPrice from './order-form-sections/PaymentAndPrice';
import PackageInfo from './order-form-sections/PackageInfo';
import { LuArrowLeft } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

export default function OrderForm() {
  const isEditingOrder = useOrderFormStore((s) => s.isEditingOrder);
  const isViewingOrder = useOrderFormStore((s) => s.isViewingOrder);
  const isOrderValid = useOrderFormStore((s) => s.isOrderValid);
  const visitAll = useOrderFormStore((s) => s.visitAll);
  const resetOrderForm = useOrderFormStore((s) => s.resetOrderForm);
  const addNewOrder = useOrderStore((state) => state.addNewOrder);
  const editOrder = useOrderStore((state) => state.editOrder);
  const orderData = useOrderFormStore((s) => s.orderData);
  const clearOrderForm = useOrderFormStore((state) => state.clearOrderForm);
  const navigate = useNavigate();

  const { id } = useParams();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    visitAll();
    const payload = {
      ...orderData,
      scheduledFor: orderData.scheduledFor ? new Date(orderData.scheduledFor).toISOString() : null,
      deliveryDeadline: orderData.deliveryDeadline
        ? new Date(orderData.deliveryDeadline).toISOString()
        : null,
    };
    if (!isOrderValid()) {
      toast.error('Fill all the required blanks!');
      return;
    }
    if (isEditingOrder) {
      const toastId = toast.loading(t('updating_order_loading'));

      const { success, error } = await editOrder(id, payload);
      toast.dismiss(toastId);

      if (success) {
        clearOrderForm();
        navigate('/orders');
        toast.success(t('order_updated_success'));
      } else {
        toast.error(error || t('error_general'));
      }
    } else {
      const toastId = toast.loading(t('adding_order_loading'));

      const { success, error } = await addNewOrder(payload);
      toast.dismiss(toastId);
      if (success) {
        clearOrderForm();
        navigate('/orders');
      } else {
        toast.error(error || t('error_general'));
      }
    }
  };
  let title = '';
  if (isViewingOrder) {
    title = 'Order Details';
  } else if (isEditingOrder) {
    title = 'Edit Order';
  } else {
    title = 'Create Order';
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
                <p className="text-gray-500 text-sm">
                  {isViewingOrder
                    ? 'View the order full details'
                    : 'Fill in the details below to create a new delivery task.'}
                </p>
              </div>
              {!isViewingOrder && (
                <div className="flex gap-3">
                  <Button text="Reset" variant="secondary" onClick={() => resetOrderForm()} />
                  <Link to="/orders">
                    <Button
                      text="Discard Draft"
                      variant="secondary"
                      onClick={() => resetOrderForm()}
                      type="button"
                    />
                  </Link>
                  <Button
                    text={isEditingOrder ? 'Update Order' : 'Create Order'}
                    type="submit"
                    variant="primary"
                  />
                </div>
              )}
              {isViewingOrder && <OrderStates order={orderData} />}
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

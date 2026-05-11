import useOrderStore from '../../store/admin/useOrderStore';
import Button from '../common/order/Button';
import { useNavigate, Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import OrderStates from '../common/order/OrderStates';
import ServiceInfo from './order-from-sections/ServiceInfo';
import SenderAndReceiverInfo from './order-from-sections/SenderAndReceiverInfo';
import Location from './order-from-sections/Location';
import Items from './order-from-sections/Items';
import PaymentAndPrice from './order-from-sections/PaymentAndPrice';
import PackageInfo from './order-from-sections/PackageInfo';
import { LuArrowLeft } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import {ROUTE_PATHS} from '../../routes/routePaths';
export default function OrderForm() {
  const orderData = useOrderStore((state) => state.orderData);
  const isEditingOrder = useOrderStore((state) => state.isEditingOrder);
  const isViewingOrder = useOrderStore((state) => state.isViewingOrder);
  const resetOrderForm = useOrderStore((state) => state.resetOrderForm);
  const addNewOrder = useOrderStore((state) => state.addNewOrder);
  const orders = useOrderStore((state) => state.orders);
  const editOrder = useOrderStore((state) => state.editOrder);
  const isOrderValid = useOrderStore((state) => state.isOrderValid);
  const visitAll = useOrderStore((state) => state.visitAll);
  const navigate = useNavigate();

  const {t} = useTranslation();

  const { id } = useParams();

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
      toast.error(t('FILL_ALL_REQUIRED_BALNKS'));
      return;
    }
    if (isEditingOrder) {
      const success = await editOrder(id, payload);
      if (success) {
        navigate(ROUTE_PATHS.ORDERS);
      }
    } else {
      const success = await addNewOrder(payload);
      if (success) {
        navigate(ROUTE_PATHS.ORDERS);
      }
    }
  };
  let title = '';
  if (isViewingOrder) {
    title = t('ORDER_DETAILS');
  } else if (isEditingOrder) {
    title = t('EDIT_ORDER');
  } else {
    title = t('CREATE_ORDER');
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans" dir="ltr">
      <div className="max-w-5xl mx-auto">
        {isViewingOrder && (
          <div className="mb-6">
            <Link
              to={ROUTE_PATHS.ORDERS}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors"
            >
              <div className="p-2 rounded-lg bg-orange-100 transition-colors">
                <LuArrowLeft size={20} />
              </div>
              <span className="font-medium">{t('BACK_TO_ORDERS')}</span>
            </Link>
          </div>
        )}
        <fieldset disabled={isViewingOrder}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* --- Header --- */}
            <div className="flex md:justify-between justify-center gap-4 flex-wrap items-center mb-8">
              <div>
                <h1 className="font-bold text-2xl text-gray-900 tracking-tight">{t('TITLE')}</h1>
                <p className="text-gray-500 text-sm">
                  {isViewingOrder
                    ? t('VIEW_ORDER_FULL_DETAILS')
                    : t('FILL_TO_CREATE_A_NEW_DELIVERY_TASK')}
                </p>
              </div>
              {!isViewingOrder && (
                <div className="flex gap-3">
                  <Button text="Reset" variant="secondary" onClick={() => resetOrderForm()} />
                  <Link to={ROUTE_PATHS.ORDERS}>
                    <Button
                      text={t("DISCARD_DRAFT")}
                      variant="secondary"
                      onClick={() => resetOrderForm()}
                      type="button"
                    />
                  </Link>
                  <Button
                    text={isEditingOrder ? 'UPDATE_ORDER' : 'CREATE_ORDER'}
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

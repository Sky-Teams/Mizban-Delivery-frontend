import { useState } from 'react';
import AddItemModal from '../../common/order/AddItemModal';
import Button from '../../common/order/Button';
import { LuPackage, LuPlus, LuMinus, LuTrash2, LuShoppingBag } from 'react-icons/lu';
import useOrderFormStore from '../../../store/orders/useOrderFormStore';
import { ORDER_TYPES } from '../../../constants/orderEnums';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function Items() {
  const [isModalOpen, setModalOpen] = useState(false);
  const increaseQuantity = useOrderFormStore((state) => state.increaseQuantity);
  const decreaseQuantity = useOrderFormStore((state) => state.decreaseQuantity);
  const deleteItem = useOrderFormStore((state) => state.deleteItem);

  const orderData = useOrderFormStore((state) => state.orderData);
  const items = orderData?.items ?? [];
  const type = orderData?.type;
  const visited = useOrderFormStore((state) => state.visited ?? {});
  const { t } = useTranslation();

  const itemsError = type !== ORDER_TYPES.PARCEL && visited['items'] && items.length === 0;

  const handleDelteItem = (item) => {
    deleteItem(item.id);
    toast.success(t('ITEM_DELETED_SUCCESS'));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-orange-600">
          <LuShoppingBag size={22} />
          <h2 className="text-lg font-bold text-gray-800">{t('ITEMS_DETAILS')}</h2>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          text={t('ADD_ITEM')}
          icon={<LuPlus size={18} />}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-semibold"
        />
      </div>

      <div className="overflow-x-auto">
        {items.length === 0 || itemsError ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
            <LuPackage className="mx-auto mb-2 opacity-20" size={40} />
            {itemsError ? (
              <p className="text-red-500 text-sm">{t('ADD_AT_LEAST_ONE_ITEM')}</p>
            ) : (
              <p>{t('NO_ITEMS_ADDED_YET')}</p>
            )}
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-2 text-sm font-bold text-gray-600">{t('ITEM_NAME')}</th>
                <th className="py-4 px-2 text-sm font-bold text-gray-600">{t('QUANTITY')}</th>
                <th className="py-4 px-2 text-sm font-bold text-gray-600">{t('UNIT_PRICE')}</th>
                <th className="py-4 px-2 text-sm font-bold text-gray-600 text-right">
                  {t('TOTAL')}
                </th>
                <th className="py-4 px-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-2 text-sm font-medium text-gray-800">{item.name}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3 bg-gray-100 w-fit rounded-lg p-1">
                      <button
                        type="button"
                        className="p-1  cursor-pointer hover:text-orange-600 bg-white rounded-md transition-all"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <LuMinus size={14} />
                      </button>
                      <span className="text-sm font-bold min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
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
                    {item.quantity * item.unitPrice} {t('AFN')}
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelteItem(item)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isModalOpen && <AddItemModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
}

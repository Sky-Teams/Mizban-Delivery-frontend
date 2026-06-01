import { LuStore, LuUser } from 'react-icons/lu';
import useOrderStore from '../../../store/admin/useOrderStore';
import { VALIDATION_RULES } from '../../../utils/validations';
import { useTranslation } from 'react-i18next';

export default function SenderAndReceiverInfo() {
  const inputStyle =
    'p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all w-full text-sm';
  const labelStyle = 'text-sm font-bold text-gray-700 mb-1 flex items-center gap-1';

  const updateOrderData = useOrderStore((state) => state.updateOrderData);
  const sender = useOrderStore((state) => state.orderData.sender);
  const receiver = useOrderStore((state) => state.orderData.receiver);
  const visited = useOrderStore((state) => state.visited);

  const { t } = useTranslation();

  const isPhoneValid = (phone) => {
    const regex = /^07\d{8}$/;
    return regex.test(phone);
  };
  const senderNameError = !VALIDATION_RULES.required(sender.name) && visited['sender.name'];
  const senderPhoneError = !VALIDATION_RULES.phone(sender.phone) && visited['sender.phone'];

  const receiverNameError = !VALIDATION_RULES.required(receiver.name) && visited['receiver.name'];
  const receiverPhoneError = !VALIDATION_RULES.phone(receiver.phone) && visited['receiver.phone'];
  const receiverAddressError =
    !VALIDATION_RULES.required(receiver.address) && visited['receiver.address'];

  const errorStyle = 'text-red-500 text-sm pl-3';
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Business Details (Sender) */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-orange-600 border-b border-gray-50 pb-4">
          <LuStore size={22} />
          <h2 className="text-lg font-bold text-gray-800">{t('BUSINESS_DETAILS')}</h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="businessName" className={labelStyle}>
              {t('BUSINESS_NAME')}
            </label>
            <input
              type="text"
              id="businessName"
              value={sender.name}
              onChange={(e) => {
                updateOrderData('sender.name', e.target.value);
              }}
              placeholder={t('SHAHMAMA_RESTAURANT')}
              className={inputStyle}
            />
            {senderNameError && <span className={errorStyle}>{t('NAME_IS_REQUIRED')}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="businessPhoneNumber" className={labelStyle}>
              {t('PHONE_NUMBER')}
            </label>
            <input
              type="text"
              id="businessPhoneNumber"
              value={sender.phone}
              onChange={(e) => updateOrderData('sender.phone', e.target.value)}
              placeholder="070000000"
              className={inputStyle}
            />
            {senderPhoneError && (
              <span className={errorStyle}>{t('PHONE_NUMBER_MUST_BE_10_DIGITS')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Customer Details (Receiver) */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-orange-600 border-b border-gray-50 pb-4">
          <LuUser size={22} />
          <h2 className="text-lg font-bold text-gray-800">{t('CUSTOMER_DETAILS')}</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="customerName" className={labelStyle}>
                {t('NAME')}
              </label>
              <input
                type="text"
                id="customerName"
                value={receiver.name}
                onChange={(e) => updateOrderData('receiver.name', e.target.value)}
                placeholder="Ali Ahmadi"
                className={inputStyle}
              />
              {receiverNameError && <span className={errorStyle}>{t('NAME_IS_REQUIRED')}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="customerPhoneNumber" className={labelStyle}>
                {t('PHONE_NUMBER')}
              </label>
              <input
                type="text"
                id="customerPhoneNumber"
                value={receiver.phone}
                onChange={(e) => updateOrderData('receiver.phone', e.target.value)}
                placeholder="070000000"
                className={inputStyle}
              />
              {receiverPhoneError && (
                <span className={errorStyle}>{t('PHONE_NUMBER_MUST_BE_10_DIGITS')}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="customerAddress" className={labelStyle}>
              {t('DELIVERY_ADDRESS')}
            </label>
            <input
              type="text"
              id="customerAddress"
              value={receiver.address}
              onChange={(e) => updateOrderData('receiver.address', e.target.value)}
              placeholder="Apartment 4, Darulaman Road, District 6, Kabul"
              className={inputStyle}
            />
            {receiverAddressError && <span className={errorStyle}>{t('ADDRESS_IS_REQUIRED')}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

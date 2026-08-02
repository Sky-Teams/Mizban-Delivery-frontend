import { PiPhone, PiEnvelopeSimple, PiMotorcycle, PiClock } from 'react-icons/pi';
import { toLocaleDigits } from '../../../utils/numberConverter';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';

export default function PendingDriverCard({ driver, onClick }) {
  const {t} = useTranslation()
  
  const lang = i18n.language;


  return (
    <div
      onClick={() => onClick(driver)}
      className="cursor-pointer rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1EC] font-bold text-[#F25C2A]">
          {driver.user.name?.slice(0, 1).toUpperCase()}
        </div>

        <div>
          <h3 className="font-bold text-black">{driver.user.name}</h3>
          <p className="text-xs text-gray-400">{t('PENDING_VERIFICATION')} </p>
        </div>
      </div>

      <div className="space-y-3 border-y py-4 text-sm">
        <div className="flex gap-2">
          <PiPhone className="text-gray-400" />
          <span>{driver.user.phone}</span>
        </div>

        <div className="flex gap-2">
          <PiEnvelopeSimple className="text-gray-400" />
          <span className="truncate">{driver.user.email}</span>
        </div>

        <div className="flex gap-2">
          <PiMotorcycle className="text-gray-400" />
          <span>{driver.vehicleType}</span>
        </div>

        <div className="flex gap-2">
          <PiClock className="text-gray-400" />
          <span>
            {t('APPLIED_DATE')}: {toLocaleDigits(new Date(driver.createdAt, lang))}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
          {t('PENDING_APPROVAL')}
        </span>
      </div>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../../utils/getImageUrl';

export function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-8">
      <p className="text-lg font-medium text-[#383838]">{label}</p>

      <p className="text-md text-gray-700">{value || '-'}</p>
    </div>
  );
}

export function ImageHolder({ label, image }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl shadow-md bg-white p-4 flex flex-col gap-3">
      <p className="text-lg font-medium text-gray-700">{label}</p>

      <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-100 bg-orange-50 flex flex-col items-center justify-center">
        {image ? (
          <img src={getImageUrl(image)} alt={label} className="w-full h-full object-contain" />
        ) : (
          <span className="text-orange-400">{t('NOT_UPLOADED')}</span>
        )}
      </div>
    </div>
  );
}

export function InfoColumn({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="break-words text-base font-semibold text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { FaBell } from 'react-icons/fa';
import { useNotificationStore } from '../../store/notificationInbox/useNotificationStore';

export default function NotificationBox() {
  const { t } = useTranslation();
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <div className="min-h-screen bg-gray-100 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center flex-wrap gap-4 justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg shadow-orange-100 shadow-lg">
              <FaBell className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-none">
                {t('NOTIFICATIONS_INBOX')}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{t('MANAGE_SYSTEM')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-3">
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-center">{t('NO_NOTIFICATION')}</p>
          ) : (
            notifications.map((notif) => (
              <div className="bg-gray-100 rounded-md shadow-md p-4 " key={notif.id}>
                <p className="text-gray-600 text-sm">{notif.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

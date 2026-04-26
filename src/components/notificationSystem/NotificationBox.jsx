import NotifCard from "./NotifCard";
import { FaBell } from "react-icons/fa";

export default function NotificationBox({ notifications = [] }) {
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
                Notifications Inbox
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and send system notifications
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-3">
          {notifications.length === 0 
            ? <p className="text-gray-400 text-center">No notifications yet.</p>
            : notifications.map((notif) => (
                <NotifCard key={notif.id} message={notif.message} />
              ))
          }
        </div>

      </div>
    </div>
  );
}
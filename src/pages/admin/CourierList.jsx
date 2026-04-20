import { useState, useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";
import { IoAddOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useOutsideClick";

export default function CourierList() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const {t} = useTranslation();

  const { couriers, fetchCouriers, deleteCourier } = useCourierStore();

  useEffect(() => {
    fetchCouriers();
  }, [fetchCouriers]);

  const handleNavigation = (e) => {
    e.preventDefault();
    navigate("/drivers/add")
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Idle":
        return "bg-green-100 text-green-600";
      case "Assigned":
        return "bg-blue-100 text-blue-600";
      case "Delivering":
        return "bg-orange-100 text-orange-600";
      case "Offline":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => {
    if (openMenuId !== null) {
      setOpenMenuId(null);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-10 px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t("Couriers")}</h1>

          <button
            onClick={handleNavigation}
            className="bg-orange-500 hover:bg-orange-600
             text-white px-5 py-2 rounded-xl shadow-md w-full sm:w-auto
              flex items-center justify-center gap-2
            "
          >
            <IoAddOutline />{t("Add Courier")}
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-md">
          <table className="w-full text-left">
            {/* Header */}
            <thead className="bg-orange-50 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 md:px-6 py-4">{t("Profile")}</th>
                <th className="px-4 md:px-6 py-4">{t("Name")}</th>

                {/* Hidden on mobile */}
                <th className="hidden md:table-cell px-6 py-4">{t("Contact No.")}</th>

                <th className="px-4 md:px-6 py-4">{t("Status")}</th>

                {/* Hidden on small screens */}
                <th className="hidden lg:table-cell px-6 py-4">
                  {("Shift Availability")}
                </th>

                <th className="px-4 md:px-6 py-4"></th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-gray-700 text-sm">
              {couriers.map((courier) => (
                <tr
                  key={courier.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Profile */}
                  <td className="px-4 md:px-6 py-4">
                    <img
                      src={courier.profilePicture}
                      alt={courier.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-4 md:px-6 py-4 font-medium">
                    {courier.fullName}
                  </td>

                  {/* Contact hidden on mobile */}
                  <td className="hidden md:table-cell px-6 py-4">
                    {courier.contactNumber}
                  </td>

                  {/* Status */}
                  <td className="px-4 md:px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        courier.status,
                      )}`}
                    >
                      {courier.status}
                    </span>
                  </td>

                  {/* Shift hidden on small */}
                  <td className="hidden lg:table-cell px-6 py-4">
                    {courier.shiftStart} - {courier.shiftEnd}
                  </td>

                  {/* Menu */}
                  <td className="px-4 md:px-6 py-4 relative">
                    <div 
                      ref={openMenuId === courier.id ? dropdownRef : null}
                      className="inline-block relative action-menu-container"
                    >
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === courier.id ? null : courier.id,
                          )
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <MdMoreVert size={18} />
                      </button>

                      {openMenuId === courier.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-xl shadow-lg z-10">
                          <button
                            onClick={() =>
                              navigate(`/drivers/edit/${courier.id}`)
                            }
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {t("Edit")}
                          </button>
                          <button
                            onClick={() => {
                              deleteCourier(courier.id);
                              setOpenMenuId(null);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                          >
                            {t("Delete")}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CourierContext } from "../../context/CourierContext";

export default function CourierList() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const { couriers, deleteCourier } = useContext(CourierContext);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".action-menu-container")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-10 px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Couriers</h1>

          <button
            onClick={() => navigate("/couriers/add")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl shadow-md"
          >
            + Add Courier
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-visible">
          <table className="w-full text-left">
            {/* Table Header */}
            <thead className="bg-orange-50 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Profile Pic</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact No</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Shift Availability</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-700 text-sm">
              {couriers.map((courier) => (
                <tr
                  key={courier.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Profile Pic */}
                  <td className="px-6 py-4">
                    <img
                      src={courier.profilePicture}
                      alt={courier.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 font-medium">{courier.fullName}</td>

                  {/* Contact */}
                  <td className="px-6 py-4">{courier.contactNumber}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        courier.status,
                      )}`}
                    >
                      {courier.status}
                    </span>
                  </td>

                  {/* Shift */}
                  <td className="px-6 py-4">
                    {courier.shiftStart} - {courier.shiftEnd}
                  </td>

                  {/* Action Menu */}
                  <td className="px-6 py-4 relative">
                    <div className="inline-block relative action-menu-container">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === courier.id ? null : courier.id,
                          )
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId === courier.id && (
                        <div className="absolute right-6 mt-2 w-32 bg-white border rounded-xl shadow-lg z-10">
                          <button
                            onClick={() =>
                              navigate(`/couriers/edit/${courier.id}`)
                            }
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteCourier(courier.id);
                              setOpenMenuId(null);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                          >
                            Delete
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

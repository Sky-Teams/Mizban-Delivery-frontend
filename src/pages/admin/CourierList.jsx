import React, { useState, useEffect } from "react";
import {
  PiMagnifyingGlass,
  PiDotsThreeVertical,
  PiStar,
  PiStarFill,
  PiCheckCircle,
  PiTrophy,
  PiChatCircleDots,
  PiTruck,
  PiPencilSimple,
  PiTrash,
  PiX,
  PiPlus,
} from "react-icons/pi";
import { useCourierStore } from "../../store/useCourierStore";

import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import AddCourier from "./AddCourier";
import EditCourier from "./EditCourier";

export default function CourierList() {
  const { couriers, fetchCouriers, deleteCourier } = useCourierStore();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCouriers = couriers.filter((courier) => {
    const query = searchQuery.toLowerCase();
    return (
      courier.fullName.toLowerCase().includes(query) ||
      courier.id.toString().includes(query) ||
      courier.phoneNumber?.includes(query) // optional chaining in case phone is undefined
    );
  });

  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchCouriers();
  }, [fetchCouriers]);

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#1A1C1E] p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* SEARCH */}
        <div className="relative max-w-md mb-10">
          <PiMagnifyingGlass
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search drivers by name, ID or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 text-sm"
          />
        </div>

        {/* HEADER */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Driver Management</h1>
            <p className="text-gray-500 text-sm">
              Monitor fleet status, approve applications, and manage
              performance.
            </p>
          </div>

          <button
            onClick={() => navigate("/couriers/add")}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm"
          >
            <PiPlus size={16} className="font-bold" />
            Add Courier
          </button>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            label="Total Drivers"
            value="1,284"
            trend="+12%"
            icon={<PiTruck size={22} className="text-blue-500" />}
            iconBg="bg-blue-100"
          />
          <StatCard
            label="Active Now"
            value="856"
            trend="+5%"
            icon={<PiCheckCircle size={22} className="text-emerald-500" />}
            iconBg="bg-emerald-100"
          />
          <StatCard
            label="Pending Approval"
            value="42"
            icon={<PiTrophy size={22} className="text-orange-500" />}
            iconBg="bg-orange-100"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 overflow-x-auto">
          <h2 className="text-base font-semibold mb-6">Fleet Directory</h2>

          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase border-b border-gray-100">
                <th className="pb-4 text-left">Driver</th>
                <th className="pb-4 text-left">Status</th>
                <th className="pb-4 text-left">Vehicle</th>
                <th className="pb-4 text-left">Rating</th>
                <th className="pb-4 text-left">Last Active</th>
                <th className="pb-4 text-right">Deliveries</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCouriers.map((courier) => (
                <tr
                  key={courier.id}
                  onClick={() => setSelectedDriver(courier)}
                  className="cursor-pointer hover:bg-gray-50 transition"
                >
                  {/* DRIVER */}
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={courier.profilePicture}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm">
                          {courier.fullName}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: {courier.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="py-5">
                    <StatusBadge status={courier.status} />
                  </td>

                  {/* VEHICLE */}
                  <td className="py-5 text-sm text-gray-500">
                    Toyota Prius (White)
                  </td>

                  {/* RATING */}
                  <td className="py-5">
                    <div className="flex items-center gap-1">
                      <PiStarFill size={14} className="text-yellow-400" />
                      <span className="text-sm font-semibold">4.9</span>
                    </div>
                  </td>

                  {/* LAST ACTIVE */}
                  <td className="py-5 text-sm text-gray-500">2 mins ago</td>

                  {/* DELIVERIES */}
                  <td className="py-5 text-right font-semibold text-sm">
                    1,429
                  </td>

                  {/* MENU */}
                  <td className="py-5 text-right relative">
                    <button
                      onClick={(e) => toggleMenu(e, courier.id)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <PiDotsThreeVertical size={18} />
                    </button>

                    {openMenuId === courier.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-2"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/couriers/edit/${courier.id}`);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          <PiPencilSimple size={14} /> Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCourier(courier.id);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
                          <PiTrash size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRAWER */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* NO BLUR */}
          <div
            className="absolute inset-0 bg-black/10"
            onClick={() => setSelectedDriver(null)}
          />

          <aside className="relative w-full max-w-md bg-white h-full shadow-xl p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-base font-semibold">Driver Details</h2>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={selectedDriver.profilePicture}
                className="w-24 h-24 rounded-full mb-4"
              />

              <h3 className="text-lg font-semibold">
                {selectedDriver.fullName}
              </h3>

              <p className="text-gray-400 text-xs">Member since Oct 2022</p>

              <div className="mt-3 bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <PiTrophy size={12} /> Gold Partner
              </div>

              <div className="grid grid-cols-3 gap-4 w-full mt-8">
                <DetailStat label="Rating" value="4.9" />
                <DetailStat label="Rank" value="#12" />
                <DetailStat label="Level" value="24" />
              </div>

              {/* ACTIVITY */}
              <div className="w-full mt-8">
                <h4 className="text-xs text-gray-400 uppercase mb-4">
                  Recent Activity
                </h4>

                <ActivityItem
                  color="emerald"
                  title="Delivery Completed"
                  meta="Order #123 • 12 mins ago"
                  icon={<PiCheckCircle size={14} />}
                />
                <ActivityItem
                  color="orange"
                  title="5-Star Feedback"
                  meta="Very professional"
                  icon={<PiStar size={14} />}
                />
                <ActivityItem
                  color="blue"
                  title="Bonus Reward Unlock"
                  meta="Tiers 3 consistency bonus:$50.00"
                  icon={<PiStar size={14} />}
                />
              </div>

              {/* PROGRESS */}
              <div className="w-full mt-8 bg-[#0F172A] text-white p-5 rounded-2xl">
                <div className="flex justify-between text-xs mb-2">
                  <span>Next Reward</span>
                  <span className="text-orange-400">85%</span>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded-full mb-3">
                  <div className="bg-orange-500 h-2 w-[85%] rounded-full" />
                </div>

                <p className="text-xs text-gray-300">
                  Complete 12 more deliveries to unlock bonus
                </p>
              </div>

              {/* BUTTONS */}
              <div className="w-full mt-8 space-y-3">
                <button className="w-full py-3 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2">
                  <PiChatCircleDots size={16} /> Send Message
                </button>

                <button className="w-full py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl">
                  Suspend Account
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

/* COMPONENTS */

function StatCard({ label, value, trend, icon, iconBg }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex justify-between">
        <div
          className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
        {trend && <span className="text-xs text-emerald-500">{trend}</span>}
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-100 text-emerald-600",
    Idle: "bg-yellow-100 text-yellow-600",
    Delivering: "bg-blue-100 text-blue-600",
    "Pending Approval": "bg-orange-100 text-orange-600",
    Suspended: "bg-red-100 text-red-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-500"}`}
    >
      ● {status}
    </span>
  );
}

function DetailStat({ label, value }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function ActivityItem({ color, title, meta, icon }) {
  const colors = {
    emerald: "bg-emerald-100 text-emerald-500",
    orange: "bg-orange-100 text-orange-500",
    blue: "bg-blue-100 text-blue-500",
  };

  return (
    <div className="flex gap-3 mb-4">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-400">{meta}</p>
      </div>
    </div>
  );
}

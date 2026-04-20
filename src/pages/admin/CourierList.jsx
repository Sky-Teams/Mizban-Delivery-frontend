import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";
import CourierListToolbar from "../../components/admin/courier-list/overview/CourierListToolbar";
import CourierStats from "../../components/admin/courier-list/overview/CourierStats";
import CourierTable from "../../components/admin/courier-list/table/CourierTable";
import CourierDetailsDrawer from "../../components/admin/courier-list/details/CourierDetailsDrawer";
import { getMenuPosition } from "../../utils/courierListUtils";

export default function CourierList() {
  const { couriers, fetchCouriers, deleteCourier, isLoading, error } =
    useCourierStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const direction = i18n.dir();
  const lng = i18n.language;

  const [selectedCourier, setSelectedCourier] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    fetchCouriers();
  }, [fetchCouriers]);

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

  //  Local filtering

  const filteredCouriers = useMemo(() => {
    if (!searchQuery) return couriers;

    const query = searchQuery.toLowerCase();

    return couriers.filter((courier) => {
      const name = courier?.fullName || "";
      const phone = courier?.phone || "";

      return (
        name.toLowerCase().includes(query) ||
        phone.toLowerCase().includes(query) ||
        String(courier?.id).includes(query)
      );
    });
  }, [couriers, searchQuery]);

  const handleToggleMenu = (event, courierId) => {
    event.stopPropagation();
    setMenuPosition(getMenuPosition(event.currentTarget));
    setOpenMenuId((currentId) => (currentId === courierId ? null : courierId));
  };

  const handleDeleteCourier = async (event, courierId) => {
    event.stopPropagation();
    await deleteCourier(courierId);
    setOpenMenuId(null);
    setSelectedCourier((currentCourier) =>
      currentCourier?.id === courierId ? null : currentCourier,
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] p-8 text-[#1A1C1E]">
      <div className="mx-auto max-w-7xl">
        <CourierListToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddCourier={() => navigate("/drivers/add")}
        />

        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="mb-1 text-2xl font-semibold">
              {t("Driver Management")}
            </h1>
            <p className="text-sm text-gray-500">
              {t(
                "Monitor fleet status, approve applications, and manage performance.",
              )}
            </p>
          </div>
        </header>

        <CourierStats couriers={couriers} lng={lng} />

        <CourierTable
          couriers={filteredCouriers}
          direction={direction}
          lng={lng}
          openMenuId={openMenuId}
          menuPosition={menuPosition}
          menuRef={menuRef}
          isLoading={isLoading}
          error={error}
          onRowClick={setSelectedCourier}
          onToggleMenu={handleToggleMenu}
          onEditCourier={(courierId) => navigate(`/drivers/edit/${courierId}`)}
          onDeleteCourier={handleDeleteCourier}
        />
      </div>

      <CourierDetailsDrawer
        courier={selectedCourier}
        lng={lng}
        onClose={() => setSelectedCourier(null)}
      />
    </div>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { useDriverStore } from '../../store/driver/useDriverStore';
import DriverListToolbar from '../../components/admin/driver-list/DriverListToolbar';
import DriverStats from '../../components/admin/driver-list/DriverStats';
import DriverTable from '../../components/admin/driver-list/DriverTable';
import DriverDetailsDrawer from '../../components/admin/driver-list/DriverDetailsDrawer';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { getMenuPosition } from '../../utils/driverListUtils';
import Pagination from '../../components/common/Pagination';
import { useClickOutside } from '../../hooks/useOutsideClick';
import { ROUTE_PATHS } from '../../routes/routePaths';
import { buildPath } from '../../routes/routeHelpers';

export default function DriverList() {
  const { drivers, fetchDrivers, deleteDriver, isLoading } = useDriverStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lng = i18n.language;

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuPosition, setMenuPosition] = useState(null);
  const [driverPendingDelete, setDriverPendingDelete] = useState(null);
  const menuRef = useRef(null);

  const totalPages = useDriverStore((state) => state.totalPages);
  const currentPage = useDriverStore((state) => state.currentPage);
  const handlePrevButton = useDriverStore((state) => state.handlePrevButton);
  const handleNextButton = useDriverStore((state) => state.handleNextButton);
  const handlePageNumberClick = useDriverStore((state) => state.handlePageNumberClick);
  const updateCurrentLimit = useDriverStore((state) => state.updateCurrentLimit);

  const currentLimit = useDriverStore((state) => state.currentLimit);

  useEffect(() => {
    fetchDrivers(currentLimit, currentPage);
  }, [fetchDrivers, currentPage, currentLimit]);

  useClickOutside(menuRef, () => setOpenMenuId(null));

  //  Local filtering

  const filteredDrivers = useMemo(() => {
    if (!searchQuery) return drivers;

    const query = searchQuery.toLowerCase();

    return drivers.filter((driver) => {
      const name = driver?.fullName || '';
      const phone = driver?.phone || '';

      return (
        name.toLowerCase().includes(query) ||
        phone.toLowerCase().includes(query) ||
        String(driver?.id).includes(query)
      );
    });
  }, [drivers, searchQuery]);

  const handleToggleMenu = (event, driverId) => {
    event.stopPropagation();
    setMenuPosition(getMenuPosition(event.currentTarget));
    setOpenMenuId((currentId) => (currentId === driverId ? null : driverId));
  };

  const handleDeleteDriver = (event, driverId) => {
    event.stopPropagation();
    setDriverPendingDelete(driverId);
    setOpenMenuId(null);
  };

  const confirmDeleteDriver = async () => {
    if (!driverPendingDelete) return;

    await deleteDriver(driverPendingDelete);
    setSelectedDriver((currentDriver) =>
      currentDriver?.id === driverPendingDelete ? null : currentDriver,
    );
    setDriverPendingDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] p-8 text-[#1A1C1E]">
      <div className="mx-auto max-w-7xl">
        <DriverListToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddDriver={() => navigate(ROUTE_PATHS.ADD_DRIVER)}
        />

        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="mb-1 text-2xl font-semibold">{t('Driver Management')}</h1>
            <p className="text-sm text-gray-500">
              {t('Monitor fleet status, approve applications, and manage performance.')}
            </p>
          </div>
        </header>

        <DriverStats drivers={drivers} lng={lng} />

        <DriverTable
          drivers={filteredDrivers}
          openMenuId={openMenuId}
          menuPosition={menuPosition}
          menuRef={menuRef}
          onRowClick={setSelectedDriver}
          onToggleMenu={handleToggleMenu}
          onEditDriver={(driverId) =>
            navigate(buildPath(ROUTE_PATHS.EDIT_DRIVER, { id: driverId }))
          }
          onDeleteDriver={handleDeleteDriver}
        />
      </div>

      <DriverDetailsDrawer
        driver={selectedDriver}
        lng={lng}
        onClose={() => setSelectedDriver(null)}
      />
      <ConfirmationModal
        isOpen={Boolean(driverPendingDelete)}
        onClose={() => setDriverPendingDelete(null)}
        onConfirm={confirmDeleteDriver}
        TITLE="Delete Driver"
        MESSAGE="Are you sure?"
      />
      <Pagination
        config={{
          currentPage,
          totalPages,
          handleNextButton,
          isLoading,
          handlePrevButton,
          handlePageNumberClick,
          updateCurrentLimit,
          dropup: true,
        }}
      />
    </div>
  );
}

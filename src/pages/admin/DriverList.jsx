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
  const lng = i18n.language;
  const navigate = useNavigate();

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuPosition, setMenuPosition] = useState(null);
  const [driverPendingDelete, setDriverPendingDelete] = useState(null);
  const [viewMode, setViewMode] = useState('list');
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
    <div className="min-h-screen bg-[#FDFDFD] p-6 text-[#1A1C1E]">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-6 text-2xl font-bold text-black">
          {t('All Driver')} ({drivers.length})
        </h1>

        <div className="rounded-t-lg border border-gray-100 bg-white shadow-sm">
          <div className="p-4">
            <DriverListToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              updateCurrentLimit={updateCurrentLimit}
              currentLimit={currentLimit}
              viewMode={viewMode} // Pass state to toolbar
              onViewModeChange={setViewMode} // Pass setter to toolbar
            />
          </div>

          <div className="px-6">
            <DriverStats drivers={drivers} lng={lng} />
          </div>

          <div className={viewMode === 'grid' ? 'p-6' : ''}>
            <DriverTable
              drivers={filteredDrivers}
              openMenuId={openMenuId}
              menuPosition={menuPosition}
              menuRef={menuRef}
              viewMode={viewMode}
              onRowClick={setSelectedDriver}
              onToggleMenu={handleToggleMenu}
              onEditDriver={(driverId) =>
                navigate(buildPath(ROUTE_PATHS.EDIT_DRIVER, { id: driverId }))
              }
              onDeleteDriver={handleDeleteDriver}
            />
          </div>
        </div>

        {/* Pagination at the bottom */}
        <div className="mt-4 flex justify-end">
          <Pagination
            config={{
              currentPage,
              totalPages,
              handleNextButton,
              isLoading,
              handlePrevButton,
              handlePageNumberClick,
              updateCurrentLimit,
              currentLimit,
              dropup: true,
              showRowsSelector: false,
            }}
          />
        </div>
      </div>

      {/* Modals & Drawers */}
      <DriverDetailsDrawer
        driver={selectedDriver}
        lng={lng}
        onClose={() => setSelectedDriver(null)}
      />
      <ConfirmationModal
        isOpen={Boolean(driverPendingDelete)}
        onClose={() => setDriverPendingDelete(null)}
        onConfirm={confirmDeleteDriver}
        TITLE={t('Delete Driver')}
        MESSAGE={t('Are you sure?')}
      />
    </div>
  );
}

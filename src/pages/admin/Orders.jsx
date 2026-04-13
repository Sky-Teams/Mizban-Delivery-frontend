import Button from "../../components/common/order/Button";
import { Link } from "react-router-dom";
import OrdersTable from "../../components/common/order/OrdersTable";
import useOrderStore from "../../store/admin/useOrderStore";
import { LuPlus, LuShoppingBag } from "react-icons/lu";
import SearchBar from "../../components/common/SearchBar";
import Dropdown from "../../components/common/Dropdown";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useTranslation } from "react-i18next";
import { useCourierStore } from "../../store/useCourierStore";
import { hasAccess } from "../../utils/hasAccess";
import { ALL_PERMISSIONS } from "../../constants/permissions";

export default function Orders() {
  const createNewOrder = useOrderStore((state) => state.createNewOrder)
  const orders = useOrderStore((state) => state.orders)
  const filteredList = useOrderStore((state) => state.filteredList)
  const applyFilters = useOrderStore((state) => state.applyFilters)
  const resetFilters = useOrderStore((state) => state.resetFilters)
  const fetchCouriers = useCourierStore((state)=> state.fetchCouriers)
  const couriers = useCourierStore((state)=> state.couriers)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurier, setSelectedCourier] = useState("")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedBusiness, setSelectedBusiness] = useState("")
  
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  let [filters, setFilters] = useState({
    courier: "",
    paymentStatus: "",
    orderStatus: "",
    startDate: "",
    endDate: "",
    senderName: ""
  })
  const isFiltered = endDate || startDate || selectedCurier !== "" || selectedPaymentStatus !== "" || selectedStatus !== "" || selectedBusiness !== "";
  const displayData = (searchTerm.trim() !== "" || isFiltered) ? filteredList : orders
  const handleFilterReset = () => {
    setSelectedCourier("")
    setSelectedPaymentStatus("")
    setSelectedStatus("")
    setEndDate("")
    setStartDate("")
    setSelectedBusiness("")
    setFilters({
      courier: "",
      paymentStatus: "",
      orderStatus: "",
      startDate: "",
      endDate: "",
      senderName: ""
    });
    resetFilters();
  };
  const debouncedSearchTerm = useDebounce(searchTerm);
  useEffect(() => {
    applyFilters(filters, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleFilter = () => {
    const newFilters = {
      courier: selectedCurier,
      paymentStatus: selectedPaymentStatus,
      orderStatus: selectedStatus,
      startDate: startDate,
      endDate: endDate,
      senderName: selectedBusiness
    };
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm);
  };
  const [drivers, setDrivers] = useState("")

  const { t } = useTranslation();
   
  useEffect(() => {
     fetchCouriers()
  }, [])

  useEffect(()=>{
    let drivers = couriers.map((courier)=> {
      return courier.user
    })
    setDrivers(drivers)
  },[couriers])
  const paymentStatus = [
    { id: 1, name: "Paid", value: "paid" },
    { id: 2, name: "Unpaid", value: "unpaid" },
    { id: 3, name: "Failed", value: "failed" },
  ];
  const orderStatus = [
    { id: 1, name: "Delivered", value: "delivered" },
    { id: 2, name: "Assigned", value: "assigned" },
    { id: 3, name: "Cancelled", value: "cancelled" },
    { id: 4, name: "Pending", value: "pending" },
  ]
    const businesses = [
    { id: 1, name: "Shahmama Restaurant", value: "Shahmama Restaurant" },
    { id: 2, name: "Shahy Hotel", value: "Shahy Hotel" },
    { id: 3, name: "Zuhak Restaurant", value: "Zuhak Restaurant" },
  ]

  return (
    <div className="bg-gray-100 p-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header  */}
        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg shadow-orange-100 shadow-lg">
              <LuShoppingBag className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-none">
                {t("Orders")}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("Manage and track all customer purchases")}
              </p>
            </div>
          </div>
        {hasAccess(ALL_PERMISSIONS.CREATE_ORDER) &&(
          <Link to="/order/create-order">
            <Button
              text={t("Create Order")}
              onClick={() => createNewOrder()}
              variant="primary"
              icon={<LuPlus size={18} className="inline" />}
              className="px-6 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
            />
          </Link>
          )}
        </div>
        {/*  Search && filter   */}
        <div className="flex justify-center w-full max-w-full">
          <SearchBar
            placeholder={t("Search by order id, customer name, phone number")}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-nowrap items-center justify-center gap-4 mt-4 mb-8 lex flex-wrap w-full">
            <div className="flex-1 min-w-37.5">
            <Dropdown options={businesses} onSelect={(val) => setSelectedBusiness(val)} value={selectedBusiness} placeholder={t("Business")} />
          </div>
          <div className="flex-1">
            <Dropdown
              options={drivers}
              onSelect={(val) => setSelectedCourier(val)}
              value={selectedCurier}
              placeholder={t("Couriers")}
            />
          </div>
          <div className="flex-1">
            <Dropdown
              options={paymentStatus}
              onSelect={(val) => setSelectedPaymentStatus(val)}
              value={selectedPaymentStatus}
              placeholder={t("Payment Status")}
            />
          </div>
          <div className="flex-1">
            <Dropdown
              options={orderStatus}
              onSelect={(val) => setSelectedStatus(val)}
              value={selectedStatus}
              placeholder={t("Status")}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 hover:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                  {t("Start Date")}
                </span>
                <input
                  type="date"
                  value={startDate}
                  className="text-sm font-semibold text-gray-700 bg-transparent outline-none cursor-pointer"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>

            <div className="h-px w-3 bg-gray-300 rounded-full" />

            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 hover:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                  {t("End Date")}
                </span>
                <input
                  type="date"
                  value={endDate}
                  className="text-sm font-semibold text-gray-700 bg-transparent outline-none cursor-pointer"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button text={t("Filter")} variant="primary" onClick={handleFilter} />
          {isFiltered && (
            <Button
              text={t("Reset")}
              variant="secondary"
              onClick={handleFilterReset}
            />
          )}
        </div>
        {/* Orders Table*/}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <OrdersTable orders={displayData} />
          {displayData.length === 0 && (
            <div className="py-20 text-center">
              {isFiltered || debouncedSearchTerm.trim() !== "" ? (
                <>
                  <p className="text-gray-400 font-medium">
                    {t("No results match your filters.")}
                  </p>
                  <Button
                    onClick={handleFilterReset}
                    variant="primary"
                    text={t("Clear all filters")}
                    className="mt-4"
                  >
                  </Button>
                </>
              ) : (
                <p className="text-gray-400 font-medium">
                  {t("No orders found. Start by creating one!")}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

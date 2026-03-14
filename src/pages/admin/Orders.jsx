import Button from "../../components/common/order/Button";
import { Link } from "react-router-dom";
import OrdersTable from "../../components/common/order/OrdersTable";
import useOrderStore from "../../store/admin/useOrderStore";
import { Plus, ShoppingBag } from "lucide-react";
import SearchBar from "../../components/common/SearchBar";
import Dropdown from "../../components/common/Dropdown"
import { useEffect, useState } from "react";

export default function Orders() {
  const createNewOrder = useOrderStore((state) => state.createNewOrder)
  const orders = useOrderStore((state) => state.orders)
  const filteredList = useOrderStore((state) => state.filteredList)
  const applyFilters = useOrderStore((state) => state.applyFilters)
  const resetFilters = useOrderStore((state) => state.resetFilters)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurier, setSelectedCourier] = useState("")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  let [filters, setFilters] = useState({
    courier: "",
    paymentStatus: "",
    orderStatus: "",
    startDate: "",
    endDate: ""
  })
  const isFiltered = searchTerm.trim() !== "" || endDate || startDate || selectedCurier !== "" || selectedPaymentStatus !== "" || selectedStatus !== "";
  const displayData = isFiltered ? filteredList : orders
  const handleFilterReset = () => {
    setSelectedCourier("")
    setSelectedPaymentStatus("")
    setSelectedStatus("")
    setEndDate("")
    setStartDate("")
    setFilters({
      courier: "",
      paymentStatus: "",
      orderStatus: "",
      startDate: "",
      endDate: ""
    });
    resetFilters()

  }
  useEffect(() => {
    applyFilters(filters, searchTerm)
  }, [searchTerm])

  const handleFilter = () => {
    const newFilters = {
      courier: selectedCurier,
      paymentStatus: selectedPaymentStatus,
      orderStatus: selectedStatus,
      startDate: startDate,
      endDate: endDate
    };
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm);
  };


  const couriers = [
    { id: 1, name: "Ali", value: "ali" },
    { id: 2, name: "Ahmad", value: "ahmad" },
    { id: 3, name: "Hamed", value: "hamed" },
    { id: 4, name: "Hassan", value: "hassan" },
    { id: 5, name: "Hussain", value: "hussain" },
  ];
  const paymentStatus = [
    { id: 1, name: "Paid", value: "paid" },
    { id: 2, name: "Unpaid", value: "unpaid" },
    { id: 3, name: "Failed", value: "failed" },
  ]
  const orderStatus = [
    { id: 1, name: "Delivered", value: "delivered" },
    { id: 2, name: "Assigned", value: "assigned" },
    { id: 3, name: "Cancelled", value: "cancelled" },
    { id: 4, name: "Pending", value: "pending" },
  ]
  return (
    <div className="min-h-screen bg-gray-100 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">

        {/* Header  */}
        <div className="flex items-center flex-wrap gap-4 justify-center items-center md:justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg shadow-orange-100 shadow-lg">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-none">
                Orders
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track all customer purchases
              </p>
            </div>
          </div>

          <Link to="/order/create-order">
            <Button
              text="Create Order"
              onClick={() => createNewOrder()}
              variant="primary"
              icon={<Plus size={18} className="inline" />}
              className="px-6 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
            />
          </Link>
        </div>
        {/*  Search && filter   */}
        <div className="flex justify-center">
          <SearchBar placeholder="Search by order id, customer name, phone number" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-nowrap items-center justify-center gap-4 mt-4 mb-8">
          <div className="flex-1">
            <Dropdown options={couriers} onSelect={(val) => setSelectedCourier(val)} value={selectedCurier} placeholder="Couriers" />
          </div>
          <div className="flex-1">
            <Dropdown options={paymentStatus} onSelect={(val) => setSelectedPaymentStatus(val)} value={selectedPaymentStatus} placeholder="Payment Status" />
          </div>
          <div className="flex-1">
            <Dropdown options={orderStatus} onSelect={(val) => setSelectedStatus(val)} value={selectedStatus} placeholder="Status" />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 hover:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Start Date</span>
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
                <span className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">End Date</span>
                <input
                  type="date"
                  value={endDate}
                  className="text-sm font-semibold text-gray-700 bg-transparent outline-none cursor-pointer"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button
            text="Filter"
            variant="primary"
            onClick={handleFilter}
          />
          {isFiltered && (
            <Button text="reset" variant="secondary" onClick={handleFilterReset} />

          )}
        </div>
        {/* Orders Table*/}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <OrdersTable orders={displayData} />
          {displayData.length === 0 && (
            <div className="py-20 text-center">
              {isFiltered ? (
                <>
                  <p className="text-gray-400 font-medium">No results match your filters.</p>
                  <Button
                    onClick={handleFilterReset}
                    variant="primary"
                    text="Reset filters"
                    className="mt-4"
                  >
                    Clear all filters
                  </Button>
                </>
              ) : (
                <p className="text-gray-400 font-medium">No orders found. Start by creating one!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
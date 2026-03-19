import React, { useState } from "react";
import { X, ShoppingBag, Plus, Minus } from "lucide-react";
import Button from "./Button";
import useOrderStore from "../../store/admin/useOrderStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { toLocaleDigits, toLocalePrice } from "../../utils/numberConverter";

const AddItemModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const isRTL = ["fa", "ps", "ar", "ur"].includes(lng);

  if (!isOpen) return null;
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState();
  const [productName, setProductName] = useState("");
  const setItemsdata = useOrderStore((state) => state.setItemsdata);

  const handleItemSubmission = (e) => {
    e.preventDefault();
    if (productName.trim() === "") {
      toast.error(t("Enter a valid product name!"));
      throw new Error(t("Product Name is not valid!"));
    }
    if (unitPrice <= 0) {
      toast.error(t("Enter a valid unit price!"));
      throw new Error(t("Unit price is not valid!"));
    }
    let newItem = {
      id: Date.now(),
      itemName: productName,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
    };
    setItemsdata(newItem);

    toast.success(t("Item added successfully!"));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white w-full max-w-md rounded-[24px] shadow-xl z-10 overflow-hidden border border-gray-100">
        <form action="" className="flex flex-col w-full">
          <div className="px-6 pt-6 pb-2 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                {t("Add Item")}
              </h3>
              <p className="text-gray-400 text-xs font-medium">
                {t("Enter product details")}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-orange-600 hover:text-white cursor-pointer text-black-900 rounded-[50%] transition-all"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-4 space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                {t("Product Name")}
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                  <ShoppingBag size={16} />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500/50 transition-all text-sm font-medium"
                  placeholder="e.g. Ashak"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                  {t("Quantity")}
                </label>
                <div className="flex items-center justify-between p-1 bg-gray-50 rounded-2xl border border-gray-100">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg cursor-pointer text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-gray-800">
                    {toLocaleDigits(quantity.toString().padStart(2, "0"), lng)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg cursor-pointer text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                  {t("Unit Price")}
                </label>
                <div className="relative">
                  {/* Currency label */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px] select-none pointer-events-none">
                    {t("AFN")}
                  </div>

                  <input
                    type="number"
                    dir={isRTL ? "rtl" : "ltr"}
                    onWheel={(e) => e.target.blur()}
                    min={0}
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    placeholder={toLocaleDigits("0", lng)}
                    className="w-full pl-14 pr-3 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500/50 transition-all text-sm font-mono font-bold text-transparent caret-black"
                    // pl-14 adds enough padding-left to clear the "{t("AFN")}" label
                  />

                  {/* Localized digits overlay */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-sm font-mono font-bold text-gray-900 select-none
      ${isRTL ? "right-3 text-right" : "left-14 text-left"}`}
                    // For LTR: left-14 aligns after {t("AFN")} label, for RTL: right-3 for correct position
                  >
                    {unitPrice
                      ? toLocaleDigits(unitPrice.toString(), lng)
                      : toLocaleDigits("0", lng)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100/50 flex justify-between items-center">
              <span className="text-xs font-bold text-orange-800/60 uppercase tracking-tight">
                {t("Total Amount")}
              </span>
              <div className="text-right">
                <span className="text-lg font-black text-orange-600">
                  {t("AFN")} {toLocalePrice(quantity * unitPrice, lng)}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 pb-8 pt-2 flex">
            <Button
              text={t("Add Item")}
              variant="primary"
              type="submit"
              onClick={handleItemSubmission}
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;

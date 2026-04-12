import { useParams, useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";
import CourierForm from "../../components/admin/CourierForm";
import { useTranslation } from "react-i18next";
import { toCourierPayload } from "../../services/courierService";
import toast from "react-hot-toast";

export default function EditCourier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { couriers, updateCourier } = useCourierStore();

  const courier = couriers.find((c) => String(c.id) === id);

  if (!courier) return <div>{t("Courier not found")}</div>;

  const handleSubmit = async (data) => {
    try {
      await updateCourier(id, toCourierPayload(data, courier));
      toast.success(t("updateCourier"));
      navigate("/drivers");
    } catch (error) {
      toast.error(error.message || t("Failed to update courier"));
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t("Edit Courier")}</h1>

      <CourierForm
        initialData={{
          ...courier,
          existingImage: courier.profilePicture,
        }}
        onSubmit={handleSubmit}
        isEdit
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";
import CourierForm from "../../components/admin/CourierForm";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function EditCourier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCouriers = useCourierStore((s) => s.fetchCouriers);
  const isLoading = useCourierStore((s) => s.isLoading);
  const couriers = useCourierStore((s) => s.couriers);
  const courier = couriers.find((item) => String(item.id) === String(id));
  const updateCourier = useCourierStore((s) => s.updateCourier);

  useEffect(() => {
    if (!courier && couriers.length === 0) {
      fetchCouriers();
    }
  }, [courier, couriers.length, fetchCouriers]);

  if (isLoading && !courier) {
    return <div>{t("Loading...")}</div>;
  }

  if (!courier) return <div>{t("Courier not found")}</div>;

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await updateCourier(id, data);
      toast.success(t("updateCourier"));
      navigate("/drivers");
    } catch (error) {
      toast.error(error.message || t("Failed to update courier"));
    } finally {
      setIsSubmitting(false);
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
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

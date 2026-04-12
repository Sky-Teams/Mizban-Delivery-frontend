import { useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";
import CourierForm from "../../components/admin/CourierForm";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function AddCourier() {
  const navigate = useNavigate();
  const initialData = useCourierStore((s) => s.emptyCourierFormData);
  const addCourierFromForm = useCourierStore((s) => s.addCourierFromForm);

  const { t } = useTranslation();
  const handleSubmit = async (formData) => {
    try {
      await addCourierFromForm(formData);
      toast.success(t("Courier Added Successfully"));
      navigate("/drivers");
    } catch (error) {
      toast.error(error.message || t("Failed to create courier"));
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t("Add Courier")}</h1>

      <CourierForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";
import CourierForm from "../../components/admin/CourierForm";
import { useTranslation } from "react-i18next";

export default function AddCourier() {
  const navigate = useNavigate();
  const addCourier = useCourierStore((s) => s.addCourier);

  const initialData = {
    fullName: "",
    contactNumber: "",
    email: "",
    profilePicture: null,
    vehicleType: "Bike",
    vehicleRegistration: "",
    maxWeightKg: 20,
    maxPackages: 10,
    shiftStart: "11:00",
    shiftEnd: "15:00",
    homeAddress: "",
    status: "Offline",
  };

  const { t } = useTranslation();
  const handleSubmit = async (formData) => {
    const backendData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.contactNumber,
      vehicleType: formData.vehicleType.toLowerCase(),
      status: formData.status.toLowerCase(),
      vehicleRegistrationNumber: formData.vehicleRegistration,
      address: formData.homeAddress,
      capacity: {
        maxWeightKg: Number(formData.maxWeightKg),
        maxPackages: Number(formData.maxPackages),
      },
      timeAvailability: {
        start: formData.shiftStart,
        end: formData.shiftEnd,
      },
      currentLocation: {
        type: "Point",
        coordinates: [62.1915, 34.352],
      },
    };

    await addCourier(backendData);
    navigate("/drivers");
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t("Add Courier")}</h1>

      <CourierForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

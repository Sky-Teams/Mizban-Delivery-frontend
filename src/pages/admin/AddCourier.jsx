import { useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";
import CourierForm from "../../components/admin/CourierForm";

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

  const handleSubmit = async (data) => {
    await addCourier(data);
    navigate("/couriers");
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add Courier</h1>

      <CourierForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

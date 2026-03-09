import { useParams, useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";
import CourierForm from "../../components/admin/CourierForm";

export default function EditCourier() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { couriers, updateCourier } = useCourierStore();

  const courier = couriers.find((c) => String(c.id) === id);

  if (!courier) return <div>Courier not found</div>;

  const handleSubmit = async (data) => {
    await updateCourier(id, data);
    navigate("/couriers");
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Courier</h1>

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

import apiClient from "../config/apiClient";
import { normalizeApiError } from "../utils/normalizeApiError";
import { formatDateForBackend } from "../utils/formatDate";

export const driverRegistration = {
  submit: async (data) => {
    try {
      const formData = new FormData();

      formData.append(
        'name',
        data.personalInfo.fullName
      );

      formData.append(
        'phone',
        data.personalInfo.phone
      );

      const formatted = formatDateForBackend(data.personalInfo.dob);

      formData.append(
        "dateOfBirth",
        formatted
      );
      
      formData.append(
        'address',
        data.personalInfo.address
      );


      formData.append(
        'vehicleName',
        data.vehicleInfo.nameModel
      );

      formData.append(
        'vehicleType',
        data.vehicleInfo.type
      );

      formData.append(
        'vehicleRegistrationNumber',
        data.vehicleInfo.licensePlate
      );

      formData.append(
        'fuelType',
        data.vehicleInfo.fuelType
      );

      formData.append(
        'vehicleColor',
        data.vehicleInfo.color
      );


      formData.append(
        'emergencyContactNumber',
        data.additionalInfo.emergencyContact
      );

      formData.append(
        'emergencyContactRelation',
        data.additionalInfo.relationship
      );

      formData.append(
        'photo',
        data.documents.driverPicture
      );

      formData.append(
        'nationalIdCardFront',
        data.documents.idFront
      );

      formData.append(
        'nationalIdCardBack',
        data.documents.idBack
      );

      formData.append(
        'driverLicense',
        data.documents.license
      );

      formData.append(
        'vehicleCard',
        data.documents.vehicleCard
      );


      return await apiClient.post('drivers/registration', {
        body: formData,
      }).json();

    } catch (error) {
      throw await normalizeApiError(
        error,
        'Registration failed'
      );
    }
  },
  approve: async () => {
    //will be implemented later
  }
};
import { Navigate } from 'react-router-dom';
import useRegistrationStore from '../store/useRegistrationStore';

export default function RegistrationEntry () {
  const registrationStatus = useRegistrationStore(
    (state) => state.registrationStatus
  );

  if (registrationStatus === 'submitted') {
    return <Navigate to="/registration/pending" replace />;
  }

  return <Navigate to="/registration/personal-info" replace />;
}
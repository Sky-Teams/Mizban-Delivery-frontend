import { Link } from 'react-router-dom';
import courier from '../../assets/png/courier1.png';
import { maskEmail } from '../../utils/maskEmail';

const AuthLayoutCard = ({
  title,
  description,
  children,
  backLink,
  backText,
  email,
  showEmail = false,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-6 bg-gray-50 overflow-hidden">
      {/* Background Image */}
      <img
        src={courier}
        alt="delivery"
        className="
          absolute bottom-0 left-0
          w-36 lg:w-44
          opacity-90
          pointer-events-none
        "
      />

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-5 sm:p-6 md:p-8 z-10 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-1">{title}</h2>

        <p className="text-gray-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
          {description}
          {showEmail && email && (
            <>
              <br />
              <span className="font-semibold">{maskEmail(email)}</span>
            </>
          )}
        </p>

        {children}
        {backLink && backText && (
          <Link to={backLink} className="block mt-6 text-sm sm:text-base underline">
            {backText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthLayoutCard;

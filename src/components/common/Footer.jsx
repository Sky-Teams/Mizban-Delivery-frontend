export default function Footer () {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Mizban Delivery</h4>
          <p className="text-sm text-gray-500">Connecting businesses with reliable delivery solutions across the region.</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Project Info</h4>
          <p className="text-xs text-gray-400 italic">SkyTeams Internship v1.0.0</p>
          <p className="text-xs text-gray-400 mt-2">© 2026 Mizban. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

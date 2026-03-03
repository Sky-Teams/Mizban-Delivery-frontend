const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">Mizban <span className="text-orange-600">Delivery</span></span>
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-orange-600 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Orders</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Settings</a>
        </nav>

        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold transition-all">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
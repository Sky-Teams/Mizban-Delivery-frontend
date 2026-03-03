import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Project Initialized</h2>
          <p className="mt-2 text-gray-600">The architecture and styling engine are ready for development.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
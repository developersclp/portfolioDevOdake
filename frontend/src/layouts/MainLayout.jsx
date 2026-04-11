import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="relative min-h-screen bg-primary">
      {/* Aurora Background Effect */}
      <div className="aurora-bg" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default MainLayout;

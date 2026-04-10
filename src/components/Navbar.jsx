import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-[#2c3338]/95 backdrop-blur-sm border-b border-white/10">
      <nav className="flex items-center justify-between px-6 py-4 mx-auto max-w-6xl">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo_vastint_white.svg" alt="Vastint" className="h-7" />
          <span className="font-sans text-sm font-light tracking-widest uppercase text-white/50">
            Privacy Hub
          </span>
        </Link>

        {/* Right: Sign in */}
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
        >
          <UserCircle size={18} />
          <span>Sign in</span>
        </Link>
      </nav>
    </div>
  );
}

import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FileText, Globe, BookOpen, Settings, LogOut, Menu, Search, UserCircle, ShieldAlert, GraduationCap, Users, Lightbulb } from 'lucide-react';
import { useAuth } from '../App';

export default function DashboardLayout() {
  const location = useLocation();
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { name: 'Privacy Team', path: '/dashboard', icon: Users },
    { name: 'Policies', path: '/dashboard/policies', icon: BookOpen },
    { name: 'Privacy FAQ', path: '/dashboard/guidance', icon: Lightbulb },
    { name: 'DPIAs', path: '/dashboard/dpias', icon: FileText },
    { name: 'TIAs', path: '/dashboard/tias', icon: Globe },
    { name: 'Data Breach Assessment', path: '/dashboard/data-breach', icon: ShieldAlert },
    { name: 'Trainings', path: '/dashboard/trainings', icon: GraduationCap },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-vastintDark font-sans selection:bg-vastintPrimary selection:text-white overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`bg-[#1a1e22] text-white flex flex-col shadow-2xl z-30 transition-all duration-300 ease-in-out absolute md:relative h-full ${sidebarExpanded ? 'w-64' : 'w-16 -translate-x-full md:translate-x-0'}`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="h-16 flex items-center justify-center border-b border-white/8 shrink-0 px-2">
          {sidebarExpanded ? (
            <img src={`${import.meta.env.BASE_URL}logo_vastint.svg`} alt="Vastint" className="h-6 transition-opacity duration-300 brightness-0 invert" />
          ) : (
            <div className="w-8 h-8 rounded bg-white/8 flex items-center justify-center">
              <Menu size={20} className="text-white/60" />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg border transition-all overflow-hidden whitespace-nowrap ${
                  isActive
                    ? 'bg-vastintPrimary/15 text-vastintCream border-vastintPrimary/30'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5 border-transparent'
                }`}
                title={item.name}
              >
                <div className="min-w-[20px] flex justify-center"><Icon size={20} className={isActive ? 'text-vastintPrimary' : ''} /></div>
                <span className={`text-sm font-medium transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-2 border-t border-white/8">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all overflow-hidden whitespace-nowrap"
            title="Sign Out"
          >
            <div className="min-w-[20px] flex justify-center"><LogOut size={20} /></div>
            <span className={`text-sm transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative w-full">
        {/* Top Header */}
        <header className="h-16 bg-vastintSurface border-b border-vastintBeige/10 flex items-center justify-between px-4 lg:px-8 shrink-0 z-20 shadow-sm relative">

          <div className="flex items-center lg:hidden">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)} className="text-white mr-4">
              <Menu size={24} />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo_vastint.svg`} alt="Vastint" className="h-6 brightness-0 invert" />
            <span className="text-sm font-light tracking-widest uppercase text-vastintBeige/50">Privacy Hub</span>
          </div>

          {/* Central Search Pill */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={16} className="text-white/30 group-focus-within:text-vastintPrimary" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-vastintDark text-sm text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-vastintPrimary/40 transition-all border border-white/8"
                placeholder="Search across all modules..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="px-3 py-1.5 rounded-full border border-vastintBeige/15 text-white/80 flex items-center space-x-2 font-medium text-sm hover:bg-white/5 transition-colors"
            >
              <UserCircle size={18} className="text-vastintPrimary" />
              <span className="hidden sm:inline">Vastint User</span>
            </button>

            {profileOpen && (
              <div className="absolute top-14 right-4 lg:right-8 w-64 bg-vastintSurface border border-vastintBeige/15 shadow-2xl rounded-xl p-4 z-50">
                <div className="flex items-center space-x-3 border-b border-vastintBeige/10 pb-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-vastintPrimary text-white flex items-center justify-center font-bold text-lg shadow-inner">
                    VU
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Vastint User</h3>
                    <p className="text-xs text-vastintBeige/60">Administrator</p>
                  </div>
                </div>

                <div className="mb-2">
                  <h4 className="text-xs font-bold text-vastintBeige/50 uppercase tracking-wider mb-2">My Permissions</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-white/70 flex items-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-vastintPrimary mr-2"></div>
                       Full Platform Access
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-vastintDark relative" onClick={() => { if(profileOpen) setProfileOpen(false); }}>
          <Outlet context={{ searchQuery }} />
        </div>
      </main>
    </div>
  );
}

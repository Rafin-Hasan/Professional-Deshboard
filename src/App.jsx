import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Users, PieChart, Settings, Menu, Bell, Search, DollarSign 
} from 'lucide-react';

import Overview from './pages/Overview';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Sales from './pages/Sales';
import SettingsPage from './pages/Settings';
import UserProfile from './pages/UserProfile';
import Background from './components/Background';

import './App.css'; 

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // State for the "Lava Lamp" indicator
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const navRef = useRef(null);
  const location = useLocation();

  // Function to move the indicator
  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    setIndicatorStyle({
      top: rect.top - navRect.top,
      height: rect.height,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    // Reset to active item position on leave
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem && navRef.current) {
      const rect = activeItem.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      setIndicatorStyle({
        top: rect.top - navRect.top,
        height: rect.height,
        opacity: 1
      });
    } else {
      setIndicatorStyle({ ...indicatorStyle, opacity: 0 });
    }
  };

  // Move indicator to active route on page load/change
  useEffect(() => {
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem && navRef.current) {
      const rect = activeItem.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      setIndicatorStyle({
        top: rect.top - navRect.top,
        height: rect.height,
        opacity: 1
      });
    }
  }, [location.pathname, isSidebarOpen]);

  return (
    <div className="layout-container">
      <Background />

      <aside className={`sidebar ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-logo">N</div>
            <span className={`hover-underline-animation ${!isSidebarOpen && 'hidden'}`}>NexusUI</span>
          </div>
        </div>

        <nav className="nav-menu relative" ref={navRef} onMouseLeave={handleMouseLeave}>
          {/* THE SLIDING INDICATOR */}
          <div 
            className="absolute left-2 w-1 bg-blue-500 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] pointer-events-none z-10 box-shadow-glow"
            style={{
              top: `${indicatorStyle.top}px`,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.opacity,
              boxShadow: '0 0 10px #3b82f6'
            }}
          />

          <SidebarLink to="/" icon={<Home size={20} />} text="Overview" expanded={isSidebarOpen} onMouseEnter={handleMouseEnter} />
          <SidebarLink to="/customers" icon={<Users size={20} />} text="Customers" expanded={isSidebarOpen} onMouseEnter={handleMouseEnter} />
          <SidebarLink to="/analytics" icon={<PieChart size={20} />} text="Analytics" expanded={isSidebarOpen} onMouseEnter={handleMouseEnter} />
          <SidebarLink to="/sales" icon={<DollarSign size={20} />} text="Sales" expanded={isSidebarOpen} onMouseEnter={handleMouseEnter} />
          
          <div className="divider"></div>
          
          <SidebarLink to="/settings" icon={<Settings size={20} />} text="Settings" expanded={isSidebarOpen} onMouseEnter={handleMouseEnter} />
        </nav>

        <div className="user-profile border-t border-white/5 p-4">
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative
               ${isActive 
                 ? 'bg-blue-600/10 border border-blue-500/20' 
                 : 'hover:bg-white/5'
               }`
            }
          >
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/10 group-hover:ring-blue-400 transition-all duration-300">JD</div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-gray-900 rounded-full"></div>
            </div>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${!isSidebarOpen ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
              <span className="text-sm font-semibold text-white truncate">Admin User</span>
              <span className="text-xs text-gray-400 truncate hover-underline-animation">View Profile</span>
            </div>
          </NavLink>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="icon-btn">
            <Menu size={20} />
          </button>
          <div className="header-actions">
            <div className="search-bar group hidden md:block">
              <Search className="search-icon" size={18} />
              <input type="text" placeholder="Search..." className="search-input" />
            </div>
            <button className="icon-btn relative">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

// Updated SidebarLink to handle mouse events
function SidebarLink({ to, icon, text, expanded, onMouseEnter }) {
  return (
    <NavLink 
      to={to} 
      onMouseEnter={onMouseEnter}
      className="nav-item group relative flex items-center px-4 py-3 my-1 font-medium rounded-xl cursor-pointer text-gray-400 hover:text-white transition-colors duration-300 z-20"
    >
      <div className="transition-colors relative z-10">{icon}</div>
      <span className={`label relative z-10 ${expanded ? 'w-32 ml-3' : 'w-0'}`}>{text}</span>
      {!expanded && (
        <div className="tooltip-popup group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </NavLink>
  );
}

export default App;
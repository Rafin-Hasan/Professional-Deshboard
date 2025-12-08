import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Lock, Save, Shield, CheckCircle, ToggleLeft, ToggleRight 
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import AuthModal from '../components/AuthModal';

const Settings = () => {
  const { user, updateUser, isAuthenticated } = useUser();
  
  // Default to notifications if not logged in (since General is locked)
  const [activeTab, setActiveTab] = useState(isAuthenticated ? 'general' : 'notifications');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Form State for General Profile
  const [formData, setFormData] = useState({});

  // Sync form with user data
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  // Auto-switch to General tab if user logs in
  useEffect(() => {
    if (isAuthenticated) setActiveTab('general');
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleTabClick = (tab) => {
    if (tab === 'general' && !isAuthenticated) {
      setShowAuthModal(true); // Open Login Modal if locked
    } else {
      setActiveTab(tab);
    }
  };

  if (!user) return <div className="p-8 text-center text-gray-400">Loading settings...</div>;

  return (
    <div className="dashboard-view max-w-6xl mx-auto">
      {/* AUTH MODAL */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <div className="page-title-area mb-8">
        <div>
          <h2 className="text-2xl font-bold hover-underline-animation">Settings</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your preferences and system configurations.</p>
        </div>
        
        {/* Save Button (Only visible on General tab when logged in) */}
        {isAuthenticated && activeTab === 'general' && (
          <div className="flex items-center gap-4">
              {showSuccess && (
                  <span className="text-emerald-400 text-sm font-medium flex items-center gap-2 animate-in fade-in">
                      <CheckCircle size={16} /> Saved Successfully!
                  </span>
              )}
              <button onClick={handleSave} className="primary-btn flex items-center gap-2">
              <Save size={16} /> Save Changes
              </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- LEFT: NAVIGATION TABS --- */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden sticky top-6">
            <div className="p-4 border-b border-gray-700 bg-gray-900/50">
              <h3 className="font-semibold text-gray-200">Categories</h3>
            </div>
            <nav className="flex flex-col p-2 space-y-1">
              
              {/* General (Locked if Guest) */}
              <NavButton 
                active={activeTab === 'general'} 
                onClick={() => handleTabClick('general')} 
                icon={isAuthenticated ? <User size={18} /> : <Lock size={18} />} 
                label={isAuthenticated ? "General Profile" : "Profile (Locked)"} 
                isLocked={!isAuthenticated}
              />

              <NavButton 
                active={activeTab === 'notifications'} 
                onClick={() => handleTabClick('notifications')} 
                icon={<Bell size={18} />} 
                label="Notifications" 
              />
              
              <NavButton 
                active={activeTab === 'security'} 
                onClick={() => handleTabClick('security')} 
                icon={<Lock size={18} />} 
                label="Security" 
              />
            </nav>
          </div>
        </div>

        {/* --- RIGHT: DYNAMIC CONTENT --- */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: GENERAL PROFILE */}
          {activeTab === 'general' && (
            <SectionCard title="General Profile" icon={<User size={20} className="text-blue-400" />}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputGroup label="First Name" name="firstName" value={formData.firstName || ''} onChange={handleInputChange} />
                  <InputGroup label="Last Name" name="lastName" value={formData.lastName || ''} onChange={handleInputChange} />
                </div>
                <InputGroup label="Email Address" name="email" type="email" value={formData.email || ''} onChange={handleInputChange} />
                <InputGroup label="Phone Number" name="phone" type="tel" value={formData.phone || ''} onChange={handleInputChange} />
                <div className="pt-2">
                  <label className="block text-sm text-gray-400 mb-2">Bio</label>
                  <textarea 
                    name="bio"
                    className="search-input w-full h-24 py-2 resize-none" 
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </SectionCard>
          )}

          {/* TAB 2: NOTIFICATIONS (Restored) */}
          {activeTab === 'notifications' && (
            <SectionCard title="Notification Preferences" icon={<Bell size={20} className="text-purple-400" />}>
              <div className="space-y-4 divide-y divide-gray-700/50">
                <NotificationToggle title="Email Alerts" desc="Receive daily summaries and critical alerts." defaultState={true} />
                <NotificationToggle title="Push Notifications" desc="Real-time alerts on your desktop browser." defaultState={false} />
                <NotificationToggle title="Marketing Emails" desc="Receive offers, newsletters, and updates." defaultState={false} />
                <NotificationToggle title="Team Activity" desc="Notify me when team members make changes." defaultState={true} />
              </div>
            </SectionCard>
          )}

          {/* TAB 3: SECURITY (Restored) */}
          {activeTab === 'security' && (
            <SectionCard title="Login & Security" icon={<Shield size={20} className="text-green-400" />}>
              <div className="space-y-6">
                
                {/* Password Change */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Change Password</h4>
                  <InputGroup label="Current Password" type="password" placeholder="••••••••" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup label="New Password" type="password" placeholder="••••••••" />
                    <InputGroup label="Confirm Password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="flex justify-end">
                    <button className="secondary-btn text-xs">Update Password</button>
                  </div>
                </div>

                {/* 2FA Section */}
                <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mt-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-900/20">
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="text-white font-bold">Two-Factor Authentication</p>
                      <p className="text-xs text-blue-200 mt-0.5">Adds an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <button className="primary-btn text-xs px-4 py-2">Enable</button>
                </div>

                {/* Session History */}
                <div className="pt-4 border-t border-gray-700/50">
                   <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Active Sessions</h4>
                   <div className="flex items-center justify-between text-sm p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-300">Windows PC - Chrome</span>
                      </div>
                      <span className="text-gray-500">San Francisco, CA • Current Session</span>
                   </div>
                </div>

              </div>
            </SectionCard>
          )}

        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SectionCard = ({ title, icon, children }) => (
  <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="p-5 border-b border-gray-700 bg-gray-900/30 flex items-center gap-3">
      {icon}
      <h3 className="font-bold text-lg text-white">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const NavButton = ({ icon, label, active, onClick, isLocked }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left
    ${active 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 translate-x-1' 
      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon} {label}
    </div>
    {isLocked && <Lock size={14} className="text-gray-500" />}
  </button>
);

const InputGroup = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
    <input 
      type={type} 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      className="search-input w-full" 
    />
  </div>
);

const NotificationToggle = ({ title, desc, defaultState }) => {
  const [active, setActive] = useState(defaultState);
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
      <button 
        onClick={() => setActive(!active)}
        className={`transition-all duration-300 ${active ? 'text-blue-500 transform scale-110' : 'text-gray-600 hover:text-gray-400'}`}
      >
        {active ? <ToggleRight size={48} className="fill-current" /> : <ToggleLeft size={48} />}
      </button>
    </div>
  );
};

export default Settings;
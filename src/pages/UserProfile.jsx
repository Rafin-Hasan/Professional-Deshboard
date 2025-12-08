import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, User, Calendar, Shield, Lock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import AuthModal from '../components/AuthModal';

const UserProfile = () => {
  const { user, isAuthenticated } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Logic: If user visits this page and is NOT logged in, open the modal immediately.
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);

  // SAFE LOADING STATE: If user data isn't loaded yet, show loading text.
  // But if we are NOT authenticated, we still render the page (blurred) so the Lock screen works.
  if (!user && isAuthenticated) return <div className="p-8 text-center text-gray-400">Loading profile...</div>;

  return (
    <div className="dashboard-view relative">
      
      {/* 1. AUTH MODAL (Popup) */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* 2. MAIN CONTENT (Blurred if locked) */}
      <div className={`transition-all duration-500 ${!isAuthenticated ? 'blur-md pointer-events-none opacity-40' : ''}`}>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">User Profile</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden relative shadow-lg">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            
            <div className="flex flex-col items-center -mt-12 px-6 pb-6 relative z-10">
              <div className="w-24 h-24 rounded-full border-4 border-gray-800 bg-gray-700 flex items-center justify-center overflow-hidden shadow-xl">
                <User size={40} className="text-gray-400" />
              </div>

              {/* Safe access to user data with || 'Guest' fallback to prevent crashes */}
              <h3 className="text-xl font-bold mt-3 text-white">{user?.firstName || 'Guest'} {user?.lastName || 'User'}</h3>
              <p className="text-blue-400 text-sm font-medium mb-6">{user?.role || 'Visitor'}</p>
              
              <div className="w-full space-y-4 text-left border-t border-gray-700/50 pt-6">
                <InfoRow icon={<Mail size={16} />} text={user?.email || 'hidden@email.com'} />
                <InfoRow icon={<Phone size={16} />} text={user?.phone || '+1 (555) ***-****'} />
                <InfoRow icon={<MapPin size={16} />} text="San Francisco, CA" />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-lg">
            <h3 className="font-bold text-lg mb-6 border-b border-gray-700 pb-2">About</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Bio</p>
                <p className="text-gray-300 leading-relaxed bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                  {user?.bio || "Please log in to view the full user biography and details."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                  <div>
                      <p className="text-sm text-gray-400">Department</p>
                      <p className="text-white font-medium mt-1">Product & Engineering</p>
                  </div>
                  <div>
                      <p className="text-sm text-gray-400">Join Date</p>
                      <div className="flex items-center gap-2 mt-1">
                          <Calendar size={16} className="text-gray-500" />
                          <span className="text-white font-medium">Aug 24, 2023</span>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LOCK OVERLAY (Shows when not logged in) */}
      {!isAuthenticated && !showAuthModal && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div className="bg-gray-900/95 border border-gray-600 p-8 rounded-2xl text-center shadow-2xl max-w-sm">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Lock size={32} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">Profile Locked</h2>
            <p className="text-gray-400 mb-6 text-sm">You must be logged in to view full profile details and make edits.</p>
            <button onClick={() => setShowAuthModal(true)} className="primary-btn w-full justify-center">
              Log In to Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-sm text-gray-300">
    <div className="p-2 rounded-lg bg-gray-700/50 text-gray-400">{icon}</div>
    <span>{text}</span>
  </div>
);

export default UserProfile;
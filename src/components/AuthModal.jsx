import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login(); 
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-300">
      
      {/* MAIN CONTAINER */}
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full max-w-[800px] min-h-[500px] border border-gray-600/50 flex shadow-black/50">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* --- FORM: SIGN IN (Starts on Left) --- */}
        <div 
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out z-20 
          ${isSignUp ? 'translate-x-full opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Sign In</h2>
          <p className="text-gray-400 text-sm mb-8 text-center">Welcome back to NexusUI</p>
          
          <form className="w-full space-y-4" onSubmit={handleLogin}>
            <InputIcon icon={<Mail size={18} />} type="email" placeholder="Email Address" />
            <InputIcon icon={<Lock size={18} />} type="password" placeholder="Password" />
            
            <a href="#" className="text-xs text-blue-400 hover:text-blue-300 block text-right mt-2">Forgot Password?</a>
            
            <button disabled={isLoading} className="primary-btn w-full mt-6 py-3 justify-center shadow-lg shadow-blue-500/20">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* --- FORM: SIGN UP (Hidden on Left, Slides to Right) --- */}
        <div 
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out z-20 
          ${isSignUp ? 'translate-x-full opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Create Account</h2>
          <p className="text-gray-400 text-sm mb-8 text-center">Join us and start building</p>
          
          <form className="w-full space-y-4" onSubmit={handleLogin}>
            <InputIcon icon={<User size={18} />} type="text" placeholder="Full Name" />
            <InputIcon icon={<Mail size={18} />} type="email" placeholder="Email Address" />
            <InputIcon icon={<Lock size={18} />} type="password" placeholder="Password" />
            
            <button disabled={isLoading} className="primary-btn w-full mt-6 py-3 justify-center shadow-lg shadow-purple-500/20">
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* --- OVERLAY PANEL (The Moving Gradient) --- */}
        <div 
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30
          ${isSignUp ? '-translate-x-full' : ''}`}
        >
          <div className={`bg-gradient-to-br from-blue-600 to-purple-700 relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out flex flex-row 
            ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}
          >
            
            {/* OVERLAY CONTENT: LEFT (Shows when panel moves Left -> For Sign In) */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center text-center px-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-8 text-blue-100 text-sm leading-relaxed">
                To keep connected with us please login with your personal info
              </p>
              <button 
                onClick={() => setIsSignUp(false)} 
                className="px-8 py-2 border-2 border-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* OVERLAY CONTENT: RIGHT (Shows when panel is Right -> For Sign Up) */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center text-center px-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
              <p className="mb-8 text-purple-100 text-sm leading-relaxed">
                Enter your personal details and start journey with us
              </p>
              <button 
                onClick={() => setIsSignUp(true)} 
                className="px-8 py-2 border-2 border-white rounded-full font-bold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// Input Component
const InputIcon = ({ icon, type, placeholder }) => (
  <div className="relative group">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors">
      {icon}
    </div>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" 
      required 
    />
  </div>
);

export default AuthModal;
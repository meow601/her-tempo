import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ArrowRight } from 'lucide-react';
import { GoogleLogoIcon, AppleLogoIcon } from '../common/CycleIcons';
import { useCycle } from '../../context/CycleContext';

interface LoginGatewayScreenProps {
  onSuccess: () => void;
}

export const LoginGatewayScreen: React.FC<LoginGatewayScreenProps> = ({ onSuccess }) => {
  const { updateSettings } = useCycle();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'create' | 'signin'>('create');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleGoogleLogin = () => {
    updateSettings({
      userName: 'Maya Lin',
      email: 'maya.lin@gmail.com'
    });
    setShowAuthModal(false);
    onSuccess();
  };

  const handleAppleLogin = () => {
    updateSettings({
      userName: 'Maya',
      email: 'maya.apple@icloud.com'
    });
    setShowAuthModal(false);
    onSuccess();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const computedName = name.trim() || email.split('@')[0];
      updateSettings({
        userName: computedName.charAt(0).toUpperCase() + computedName.slice(1),
        email: email.trim()
      });
      setShowAuthModal(false);
      onSuccess();
    }
  };

  const openAuth = (mode: 'create' | 'signin') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center p-3 sm:p-6 selection:bg-[#DE9E8E]/30">
      {/* Mobile Card Container matching mockup */}
      <div className="w-full max-w-[390px] min-h-[760px] bg-[#FAF9F7] rounded-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#EDE6E1] overflow-hidden flex flex-col justify-between relative">
        
        {/* Top Circular Embrace Illustration */}
        <div className="relative w-full h-[360px] overflow-hidden flex items-center justify-center pt-3 flex-shrink-0">
          <img
            src="/assets/community_embrace_art_1787988487172.jpg"
            alt="Community embrace artwork"
            className="w-full h-full object-contain object-top"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 px-7 sm:px-8 pt-3 pb-8 flex flex-col justify-between text-center">
          {/* Typography */}
          <div className="space-y-3.5 my-auto">
            <h1 className="font-serif text-[40px] sm:text-[44px] font-normal text-[#1E191D] leading-[1.15] tracking-tight">
              Join our<br />community.
            </h1>
            <p className="text-[17px] sm:text-[18px] text-[#4A3D47] font-normal leading-snug max-w-xs mx-auto">
              Discover a supportive space<br />for your wellness journey.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-6">
            <button
              onClick={() => openAuth('create')}
              id="create_account_btn"
              className="w-full py-4.5 bg-[#543649] hover:bg-[#432939] active:scale-[0.98] text-white font-sans font-medium text-[18px] rounded-full shadow-[0_10px_28px_rgba(84,54,73,0.32)] transition-all cursor-pointer"
            >
              Create Account
            </button>

            <div>
              <button
                onClick={() => openAuth('signin')}
                id="sign_in_link_btn"
                className="text-[17px] sm:text-[18px] font-medium text-[#1E191D] hover:text-[#543649] hover:underline cursor-pointer py-1 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Authentication Drawer/Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-t-[36px] sm:rounded-[36px] w-full max-w-md p-6 sm:p-7 border border-[#EDE4DE] shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="text-center pt-2 space-y-1">
                <h2 className="font-serif text-2xl font-bold text-[#1E191D]">
                  {authMode === 'create' ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="text-xs text-[#7A6C74]">
                  {authMode === 'create'
                    ? 'Start syncing your health journey securely'
                    : 'Sign in to access your saved logs and cycle trends'}
                </p>
              </div>

              {/* Social Login Options */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-3.5 bg-white hover:bg-[#FAF8FA] text-[#20141E] font-medium text-[15px] rounded-full shadow-xs border border-[#EDE4DE] flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-98"
                >
                  <GoogleLogoIcon size={19} />
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleAppleLogin}
                  className="w-full py-3.5 bg-white hover:bg-[#FAF8FA] text-[#20141E] font-medium text-[15px] rounded-full shadow-xs border border-[#EDE4DE] flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-98"
                >
                  <AppleLogoIcon size={19} color="#000000" />
                  <span>Continue with Apple</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#ECE5DE]" />
                </div>
                <span className="relative bg-white px-3 text-[11px] uppercase tracking-widest text-[#8E7E87] font-semibold">
                  Or with email
                </span>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                {authMode === 'create' && (
                  <input
                    type="text"
                    placeholder="Your Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DDD0C8] rounded-full px-5 py-3 text-xs text-[#20171D] focus:outline-none focus:ring-2 focus:ring-[#543649]"
                  />
                )}
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD0C8] rounded-full px-5 py-3 text-xs text-[#20171D] focus:outline-none focus:ring-2 focus:ring-[#543649]"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#543649] hover:bg-[#432939] text-white font-medium text-[15px] rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <span>{authMode === 'create' ? 'Get Started' : 'Sign In'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'create' ? 'signin' : 'create')}
                  className="text-xs text-[#7A6C74] hover:text-[#1E191D]"
                >
                  {authMode === 'create'
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Create Account"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


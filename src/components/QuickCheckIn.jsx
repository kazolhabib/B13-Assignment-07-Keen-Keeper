'use client';

import { useState } from 'react';
import Image from 'next/image';
import PhoneCallIcon from '@/assets/PhoneCall.png';
import ChatDotsIcon from '@/assets/ChatDots.png';
import VideoCameraIcon from '@/assets/VideoCamera.png';

const BUTTONS = [
  { type: 'Call',  label: 'Call',  icon: PhoneCallIcon,   alt: 'Call',  description: 'Made a phone call' },
  { type: 'Text',  label: 'Text',  icon: ChatDotsIcon,    alt: 'Text',  description: 'Sent a text message' },
  { type: 'Video', label: 'Video', icon: VideoCameraIcon, alt: 'Video', description: 'Had a video call' },
];

const TYPE_LABEL = {
  Call:  'Phone Call',
  Text:  'Text Message',
  Video: 'Video Call',
};

export default function QuickCheckIn({ friendName, friendId, onCheckIn }) {
  const [toast, setToast] = useState(null);

  const handleCheckIn = (type, description) => {
    // Save entry to localStorage
    const entry = {
      id: Date.now(),
      friendName,
      friendId,
      type,
      description,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const existing = JSON.parse(localStorage.getItem('keenkeeper_timeline') || '[]');
    localStorage.setItem('keenkeeper_timeline', JSON.stringify([entry, ...existing]));

    // Call callback if provided to refresh parent UI
    if (onCheckIn) onCheckIn();

    // Show toast and auto-dismiss — no redirect
    setToast({ type });
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <>
      {/* Top-center Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            animation: 'dropDown 0.3s ease',
          }}
        >
          <style>{`
            @keyframes dropDown {
              from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
              to   { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
          `}</style>
          <div className="flex items-center gap-3 bg-[#1F2937] text-white px-5 py-3.5 rounded-xl shadow-2xl whitespace-nowrap">
            <div className="w-7 h-7 rounded-full bg-[#2c523d] flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold">{TYPE_LABEL[toast.type]} logged!</p>
              <p className="text-xs text-slate-400 mt-0.5">Added to your Timeline</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Quick Check-In Card */}
      <div className="bg-white rounded-lg drop-shadow-sm p-6">
        <h2 className="text-xl font-medium text-[#244D3F] mb-4">Quick Check-In</h2>
        <div className="grid grid-cols-3 gap-3">
          {BUTTONS.map(({ type, label, icon, alt, description }) => (
            <button
              key={type}
              onClick={() => handleCheckIn(type, description)}
              className="flex flex-col items-center justify-center gap-2 p-4 border border-[#E9E9E9] rounded-lg bg-[#F8FAFC] hover:bg-[#eff7ff] active:scale-95 transition-all text-[#1F2937] font-normal text-lg cursor-pointer"
            >
              <Image src={icon} alt={alt} width={30} height={30} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import PhoneCallIcon from '@/assets/PhoneCall.png';
import ChatDotsIcon from '@/assets/ChatDots.png';
import VideoCameraIcon from '@/assets/VideoCamera.png';


const TYPE_CONFIG = {
  Call: {
    icon: PhoneCallIcon,
    alt: 'Call',
  },
  Text: {
    icon: ChatDotsIcon,
    alt: 'Text',
  },
  Video: {
    icon: VideoCameraIcon,
    alt: 'Video',
  },
  Meetup: {
    icon: PhoneCallIcon,
    alt: 'Meetup',
  },
};

const FILTER_OPTIONS = ['All', 'Call', 'Text', 'Video', 'Meetup'];

function MeetupIcon() {
  return (
    <span style={{ fontSize: 28, lineHeight: 1 }} role="img" aria-label="Meetup">
      🤝
    </span>
  );
}

function EntryIcon({ type }) {
  if (type === 'Meetup') return <MeetupIcon />;
  const config = TYPE_CONFIG[type];
  if (!config) return null;
  return <Image src={config.icon} alt={config.alt} width={32} height={32} />;
}

export default function TimelinePage() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('All');
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem('keenkeeper_timeline');
    setEntries(raw ? JSON.parse(raw) : []);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem('keenkeeper_timeline');
    setEntries([]);

    // Clear any existing timer
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    // Show success toast
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
      toastTimerRef.current = null;
    }, 3000);
  };

  if (!mounted) return null;

  const filtered =
    filter === 'All' ? entries : entries.filter((e) => e.type === filter);

  return (
    <div className="px-4 md:px-5 py-10 md:py-20 w-full">
      {/* Top-center Toast */}
      {showToast && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-[dropDown_0.3s_ease]"
        >
          <div className="flex items-center gap-3 bg-[#1F2937] text-white px-5 py-3.5 rounded-xl shadow-2xl whitespace-nowrap">
            <div className="w-7 h-7 rounded-full bg-[#ef4444] flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold">Timeline cleared!</p>
              <p className="text-xs text-slate-400 mt-0.5">All interaction history removed</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-slate-400 hover:text-white transition-colors"
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1F2937]">Timeline</h1>

        {entries.length > 0 && (
          <button
            onClick={handleClearAll}
            className="self-start md:self-auto text-sm font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-sm transition-all border border-red-100 active:scale-95"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <div className="relative inline-block">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-white border border-[#E9E9E9] text-[#64748B] text-lg rounded-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#2c523d] cursor-pointer min-w-[345px]"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'All' ? 'Filter timeline' : opt}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>


      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E9E9E9] rounded-sm p-12 text-center">
          <p className="text-[#64748B] text-sm">No interactions found for this filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-[#E9E9E9] rounded-sm flex items-center gap-4 px-5 py-4 transition-all hover:shadow-sm"
            >

              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <EntryIcon type={entry.type} />
              </div>


              <div className="flex-1 min-w-0">
                <p className="text-[#1F2937] text-base leading-snug">
                  <span className="font-semibold">{entry.type}</span>
                  <span className="text-[#64748B] font-normal"> with {entry.friendName}</span>
                </p>
                <p className="text-sm text-[#64748B] mt-0.5">{entry.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

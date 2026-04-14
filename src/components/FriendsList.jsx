'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import friendsData from '@/data/friends.json';

export default function FriendsList() {
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const formatStatus = (status) => {
    if (status === 'overdue') return 'Overdue';
    if (status === 'almost due') return 'Almost Due';
    if (status === 'on-track') return 'On-Track';
    return status;
  };

  const getStatusColor = (status) => {
    if (status === 'overdue') return 'bg-[#ef4444]';
    if (status === 'almost due') return 'bg-[#f5b041]';
    if (status === 'on-track') return 'bg-[#2c523d]';
    return 'bg-slate-500';
  };

  const handleCardClick = (e, friend) => {
    e.preventDefault();
    setToast({ name: friend.name });
    
    setTimeout(() => {
      router.push(`/friends/${friend.id}`);
    }, 1000);
  };

  return (
    <section className="px-4 md:px-5 pb-10 lg:pb-20">
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
          <div className="flex items-center gap-3 bg-[#1F2937] text-white px-5 py-3.5 rounded-xl shadow-2xl whitespace-nowrap">
            <div className="w-7 h-7 rounded-full bg-[#2c523d] flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold">Opening {toast.name}'s profile...</p>
              <p className="text-xs text-slate-400 mt-0.5">Loading friend details</p>
            </div>
            <button
              onClick={() => setToast(null)}
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

      <div className='w-full h-[1px] bg-[#E9E9E9] my-6 lg:my-10'></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {friendsData.map((friend) => (
          <Link
            href={`/friends/${friend.id}`}
            key={friend.id}
            onClick={(e) => handleCardClick(e, friend)}
            className="flex flex-col items-center p-6 bg-white border border-[#F1F5F9] rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow cursor-pointer block hover:-translate-y-1 transform duration-200"
          >
            <div className="relative w-16 h-16 mb-4">
              <Image
                src={friend.picture}
                alt={friend.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-800 leading-tight">{friend.name}</h3>
            <span className="text-xs text-slate-400 mb-3 mt-1">{friend.days_since_contact}d ago</span>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 min-h-[24px]">
              {friend.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#d1fae5] text-[#059669] text-[10px] font-bold px-2 py-1 rounded-full tracking-wider uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-2">
              <span className={`text-xs font-bold px-4 py-1.5 rounded-full text-white inline-block ${getStatusColor(friend.status)}`}>
                {formatStatus(friend.status)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

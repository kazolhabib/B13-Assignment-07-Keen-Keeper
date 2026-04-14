'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import friendsData from '@/data/friends.json';
import ChatDotsIcon from '@/assets/ChatDots.png';
import PhoneCallIcon from '@/assets/PhoneCall.png';
import VideoCameraIcon from '@/assets/VideoCamera.png';
import QuickCheckIn from '@/components/QuickCheckIn';

export default function FriendDetailsClient({ id, friend }) {
  const [recentInteractions, setRecentInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DaisyUI loading spinner simulation
    const timer = setTimeout(() => {
      loadInteractions();
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [id]);

  const loadInteractions = () => {
    const raw = localStorage.getItem('keenkeeper_timeline');
    const allInteractions = raw ? JSON.parse(raw) : [];
    
    // Filter for this specific friend
    const filtered = allInteractions
      .filter(item => item.friendId.toString() === id)
      .slice(0, 4);
      
    setRecentInteractions(filtered);
  };

  if (!friend) {
    notFound();
  }

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

  const formattedNextDue = new Date(friend.next_due_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getInteractionIcon = (type) => {
    if (type === 'Text') return (
      <Image src={ChatDotsIcon} alt="Text" width={32} height={32} />
    );
    if (type === 'Meetup' || type === 'Call') return (
      <Image src={PhoneCallIcon} alt="Call" width={32} height={32} />
    );
    if (type === 'Video') return (
      <Image src={VideoCameraIcon} alt="Video" width={32} height={32} />
    );
    return null;
  };

  if (loading) {
     return (
       <div className="flex items-center justify-center min-h-screen">
         <span className="loading loading-spinner loading-lg text-[#2c523d]"></span>
       </div>
     );
  }

  return (
    <div className="px-4 md:px-5 py-10 md:py-20 w-full">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center text-[#2c523d] hover:text-[#1a3225] font-medium mb-6 transition-colors text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-5 items-start">

        {/* ─── LEFT COLUMN ─── */}
        <div className="w-full md:w-[270px] lg:w-[350px] shrink-0 flex flex-col gap-4">

          {/* Friend Info Card */}
          <div className="bg-white rounded-lg drop-shadow-md p-5 md:p-6 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-4">
              <Image
                src={friend.picture}
                alt={friend.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold text-slate-800 mb-2">{friend.name}</h1>

            
            <span className={`text-xs font-bold px-4 py-1 rounded-full text-white mb-2 inline-block ${getStatusColor(friend.status)}`}>
              {formatStatus(friend.status)}
            </span>

            
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {friend.tags.map((tag, idx) => (
                <span key={idx} className="bg-[#d1fae5] text-[#059669] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-base text-[#64748B] italic mb-2">"{friend.bio}"</p>

            <p className="text-sm text-[#64748B]">Preferred: {friend.email.split('@')[0]}</p>
          </div>

          
          <div className="flex flex-col gap-2">
            
            <button className="w-full flex items-center justify-center gap-3 px-5 py-4 text-sm font-medium border border-[#E9E9E9] rounded-sm text-slate-700 bg-white hover:bg-[#F8FAFC] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Snooze 2 Weeks
            </button>

            
            <button className="w-full flex items-center justify-center gap-3 px-5 py-4 text-sm font-medium border border-[#E9E9E9] rounded-sm text-slate-700 bg-white hover:bg-[#F8FAFC] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" />
              </svg>
              Archive
            </button>

            
            <button className="ww-full flex items-center justify-center gap-3 px-5 py-4 text-sm font-medium border border-[#E9E9E9] rounded-sm text-red-500 bg-white hover:bg-[#F8FAFC] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="w-full md:flex-1 flex flex-col gap-5">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border drop-shadow-sm px-4 py-5 lg:py-8 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl font-semibold text-[#244D3F]">{friend.days_since_contact}</span>
              <span className="text-sm lg:text-lg font-normal text-[#64748B]">Days Since Contact</span>
            </div>
            <div className="bg-white rounded-lg border drop-shadow-sm px-4 py-5 lg:py-8 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl font-semibold text-[#244D3F]">{friend.goal}</span>
              <span className="text-sm lg:text-lg font-normal text-[#64748B]">Goal (Days)</span>
            </div>
            <div className="bg-white rounded-lg border drop-shadow-sm px-4 py-5 lg:py-8 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl font-semibold text-[#244D3F]">{formattedNextDue}</span>
              <span className="text-sm lg:text-lg font-normal text-[#64748B]">Next Due</span>
            </div>
          </div>

          {/* Relationship Cards */}
          <div className="bg-white rounded-lg drop-shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg lg:text-xl font-medium text-[#244D3F]">Relationship Goal</h2>
              <button className="text-sm border border-[#E9E9E9] text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-sm transition-colors font-medium">
                Edit
              </button>
            </div>
            <p className="text-base lg:text-lg text-[#64748B]">
              Connect every <span className="font-bold text-black">{friend.goal} days</span>
            </p>
          </div>

          {/* Quick Check-In Cards */}
          <QuickCheckIn 
            friendName={friend.name} 
            friendId={friend.id} 
            onCheckIn={loadInteractions}
          />

          {/* Recent Interactions Card List */}
          <div className="bg-white rounded-lg border drop-shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg lg:text-xl font-medium text-[#244D3F]">Recent Interactions</h2>
              <Link href="/timeline" className="flex items-center gap-1 text-sm border border-[#E9E9E9] text-[#1F2937] bg-[#F8FAFC] hover:bg-slate-50 p-2 rounded-sm transition-colors font-medium cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                Full History
              </Link>
            </div>
            <div className="flex flex-col divide-y divide-[#e9e9e9]">
              {recentInteractions.length === 0 ? (
                <p className="text-slate-400 text-sm py-4 italic">No recent interactions logged.</p>
              ) : (
                recentInteractions.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4">
                    <div className="shrink-0">
                      {getInteractionIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base lg:text-lg font-normal text-[#1F2937] leading-tight">{item.type}</p>
                      <p className="text-sm lg:text-base text-[#64748B] font-normal truncate">{item.description}</p>
                    </div>
                    <span className="text-sm lg:text-base text-[#64748B] font-normal shrink-0">{item.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import friendsData from '@/data/friends.json';
import FriendDetailsClient from './FriendDetailsClient';

export async function generateStaticParams() {
  return friendsData.map((friend) => ({
    id: friend.id.toString(),
  }));
}

export default async function FriendDetailsPage({ params }) {
  const { id } = await params;
  const friend = friendsData.find(f => f.id.toString() === id);

  if (!friend) {
    notFound();
  }

  return <FriendDetailsClient id={id} friend={friend} />;
}

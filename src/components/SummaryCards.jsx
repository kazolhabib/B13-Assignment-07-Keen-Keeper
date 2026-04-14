import friendsData from '@/data/friends.json';

export default function SummaryCards() {
  const totalFriends = friendsData.length;
  const onTrackCount = friendsData.filter(f => f.status.toLowerCase() === 'on-track').length;
  const needAttentionCount = friendsData.filter(f => f.status.toLowerCase() === 'overdue').length;

  const cards = [
    { label: 'Total Friends', value: totalFriends.toString() },
    { label: 'On Track', value: onTrackCount.toString() },
    { label: 'Need Attention', value: needAttentionCount.toString() },
    { label: 'Interactions This Month', value: '12' },
  ];

  return (
    <section className="w-full px-4 md:px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="flex flex-col items-center justify-center px-6 py-8 bg-white border border-[#F1F5F9] rounded-lg shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]"
          >
            <span className="text-[2rem] font-semibold text-[#244D3F] mb-2">{card.value}</span>
            <span className="text-lg font-normal text-center text-[#64748B]">{card.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

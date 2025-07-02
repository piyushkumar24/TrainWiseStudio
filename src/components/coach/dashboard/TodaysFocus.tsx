
import React from 'react';

const focusItems = [
  {
    id: 1,
    emoji: '🔥',
    title: 'Plans Expiring Soon',
    subtext: '3 plans expire in 3 days',
    cta: 'Review'
  },
  {
    id: 2,
    emoji: '🆕',
    title: 'New Signups Awaiting',
    subtext: '2 clients need programs',
    cta: 'Assign'
  },
  {
    id: 3,
    emoji: '📬',
    title: 'Feedback To Send',
    subtext: '1 check-in to respond to',
    cta: 'Respond'
  },
  {
    id: 4,
    emoji: '🚨',
    title: 'Inactive Clients',
    subtext: '5 clients inactive 7+ days',
    cta: 'Follow Up'
  }
];

export const TodaysFocus = () => {
  const handleCardClick = (item: typeof focusItems[0]) => {
    console.log(`Opening ${item.title} view`);
    // Placeholder for opening contextual views/modals
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Today's Focus</h2>
      
      {/* Mobile: Horizontal scroll with snap, Desktop: 3-column grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none">
        {focusItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="bg-white rounded-xl shadow-md p-4 min-w-[250px] md:min-w-0 shrink-0 snap-start transition-all hover:scale-[1.02] cursor-pointer animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Emoji Icon */}
            <div className="text-3xl mb-2">
              {item.emoji}
            </div>
            
            {/* Title */}
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {item.title}
            </h3>
            
            {/* Subtext */}
            <p className="text-sm text-gray-500 mb-2">
              {item.subtext}
            </p>
            
            {/* CTA */}
            <button className="text-sm text-[#FF6B2C] font-medium hover:underline mt-2 inline-block transition-colors">
              {item.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

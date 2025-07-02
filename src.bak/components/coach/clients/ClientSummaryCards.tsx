
import React from 'react';
import { Card } from '@/components/ui/card';

interface ClientSummaryCardsProps {
  urgent: number;
  active: number;
  total: number;
  checkIn: number;
  setStatusFilter: (filter: string) => void;
}

export const ClientSummaryCards = ({
  urgent,
  active,
  total,
  checkIn,
  setStatusFilter
}: ClientSummaryCardsProps) => {
  const handleUrgentClick = () => {
    // Filter to show urgent clients (missing-program, needs-follow-up, program-expired)
    setStatusFilter('urgent');
  };

  const handleActiveClick = () => {
    // Filter to show active clients (on-track, new-comer)
    setStatusFilter('active');
  };

  const handleTotalClick = () => {
    // Show all clients
    setStatusFilter('all');
  };

  const handleCheckInClick = () => {
    // Filter to show check-in clients (waiting-feedback, off-track)
    setStatusFilter('check-in');
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4 mb-6 scrollbar-hide">
      <Card 
        className="bg-white rounded-xl shadow-md p-4 min-w-[200px] sm:min-w-0 hover:scale-[1.02] transition-all cursor-pointer hover:shadow-lg"
        onClick={handleUrgentClick}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-100 rounded-lg flex-shrink-0">
            <div className="text-xl">🔴</div>
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{urgent}</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-700">Urgent Clients</p>
            <p className="text-xs text-gray-500 truncate">Needing follow-up or missing programs</p>
          </div>
        </div>
      </Card>

      <Card 
        className="bg-white rounded-xl shadow-md p-4 min-w-[200px] sm:min-w-0 hover:scale-[1.02] transition-all cursor-pointer hover:shadow-lg"
        onClick={handleActiveClick}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-100 rounded-lg flex-shrink-0">
            <div className="text-xl">🟢</div>
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{active}</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-700">Active Clients</p>
            <p className="text-xs text-gray-500 truncate">Clients with current programs</p>
          </div>
        </div>
      </Card>

      <Card 
        className="bg-white rounded-xl shadow-md p-4 min-w-[200px] sm:min-w-0 hover:scale-[1.02] transition-all cursor-pointer hover:shadow-lg"
        onClick={handleTotalClick}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gray-100 rounded-lg flex-shrink-0">
            <div className="text-xl">⚪</div>
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{total}</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-700">Total Clients</p>
            <p className="text-xs text-gray-500 truncate">All onboarded clients</p>
          </div>
        </div>
      </Card>

      <Card 
        className="bg-white rounded-xl shadow-md p-4 min-w-[200px] sm:min-w-0 hover:scale-[1.02] transition-all cursor-pointer hover:shadow-lg"
        onClick={handleCheckInClick}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-100 rounded-lg flex-shrink-0">
            <div className="text-xl">🟠</div>
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{checkIn}</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-700">Check In</p>
            <p className="text-xs text-gray-500 truncate">Waiting Feedback (Premium only)</p>
            <p className="text-xs text-gray-500 truncate">Off Track</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

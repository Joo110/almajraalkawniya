import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationCardProps {
  destination: Destination;
}

const fallbackImages: Record<string, string> = {
  default: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const img = destination.coverImage || fallbackImages.default;

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="card-hover group relative block rounded-2xl overflow-hidden h-72"
      dir="rtl"
    >
      <img
        src={img}
        alt={destination.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-1.5 text-white/60 mb-2">
          <MapPin className="w-3.5 h-3.5 text-sand-400" />
          <span className="font-sans text-xs">{destination.country || 'وجهة عالمية'}</span>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-sand-300 transition-colors">
            {destination.name}
          </h3>
          <div className="w-8 h-8 rounded-full bg-sand-500/20 border border-sand-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
            <ArrowLeft className="w-4 h-4 text-sand-400" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact' | 'featured';
}

export default function PropertyCard({ property, variant = 'default' }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { state, toggleSaveProperty } = useApp();
  const isSaved = state.savedProperties.includes(property.id);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const statusColors = {
    available: 'bg-success text-success-foreground',
    sold: 'bg-destructive text-destructive-foreground',
    unavailable: 'bg-muted text-muted-foreground',
    pending: 'bg-warning text-warning-foreground',
  };

  const typeLabels = {
    apartment: 'Apartment',
    villa: 'Villa',
    house: 'House',
    plot: 'Plot',
    commercial: 'Commercial',
    penthouse: 'Penthouse',
  };

  return (
    <Link
      to={`/properties/${property.id}`}
      className={cn(
        'group block overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:shadow-card',
        variant === 'featured' && 'lg:flex'
      )}
    >
      {/* Image Section */}
      <div
        className={cn(
          'relative overflow-hidden',
          variant === 'featured' ? 'lg:w-1/2' : 'aspect-[4/3]'
        )}
      >
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
              {property.images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-colors',
                    idx === currentImageIndex ? 'bg-primary-foreground' : 'bg-primary-foreground/50'
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge className={statusColors[property.status]}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
          {property.featured && (
            <Badge variant="secondary" className="gold-gradient border-0">
              Featured
            </Badge>
          )}
        </div>

        {/* Save Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={(e) => {
            e.preventDefault();
            toggleSaveProperty(property.id);
          }}
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-colors',
              isSaved ? 'fill-destructive text-destructive' : 'text-foreground'
            )}
          />
        </Button>
      </div>

      {/* Content Section */}
      <div className={cn('p-5', variant === 'featured' && 'lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:p-8')}>
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">{typeLabels[property.type]}</Badge>
          <span>•</span>
          <span>{property.agency.name}</span>
        </div>

        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-foreground group-hover:text-primary">
          {property.title}
        </h3>

        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{property.location.city}, {property.location.state}</span>
        </div>

        {variant !== 'compact' && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {property.description}
          </p>
        )}

        {/* Features */}
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          {property.features.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.features.bedrooms}</span>
            </div>
          )}
          {property.features.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.features.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>
              {property.features.area.toLocaleString()} {property.features.areaUnit}
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
}

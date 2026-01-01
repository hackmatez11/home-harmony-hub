import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: any;
  showActions?: boolean;
}

export default function PropertyCard({ property, showActions = false }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const statusColors: Record<string, string> = {
    available: 'bg-green-500',
    sold: 'bg-red-500',
    rented: 'bg-blue-500',
    unavailable: 'bg-gray-500',
  };

  const imageUrl = property.images && property.images[0]?.url 
    ? `http://localhost:5000${property.images[0].url}`
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';

  return (
    <Link
      to={`/properties/${property._id}`}
      className="group block overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';
          }}
        />
        
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge className={`${statusColors[property.availability]} text-white`}>
            {property.availability}
          </Badge>
          {property.isFeatured && (
            <Badge variant="secondary">Featured</Badge>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">{property.propertyType}</Badge>
          {property.agencyId && (
            <>
              <span>•</span>
              <span className="line-clamp-1">{property.agencyId.agencyName || 'Agency'}</span>
            </>
          )}
        </div>

        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-foreground group-hover:text-primary">
          {property.title}
        </h3>

        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">
            {property.location?.city || 'Location'}, {property.location?.state || ''}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {property.description}
        </p>

        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>
                {property.area.value.toLocaleString()} {property.area.unit}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(property.price)}
            </span>
            {property.listingType === 'rent' && (
              <span className="text-sm text-muted-foreground">/month</span>
            )}
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>

        {showActions && (
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link to={`/dashboard/properties/edit/${property._id}`}>Edit</Link>
            </Button>
            <Button variant="destructive" size="sm" className="flex-1">
              Delete
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
}

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/properties/PropertyCard';
import { propertyService } from '@/services/propertyService';

export default function DashboardProperties() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-properties'],
    queryFn: propertyService.getMyProperties
  });

  return (
    <div className="min-h-screen bg-muted/50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Properties</h1>
          <Button asChild>
            <Link to="/dashboard/properties/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : data?.properties?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.properties.map((property: any) => (
              <PropertyCard key={property._id} property={property} showActions />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties yet. Start by adding your first property!</p>
          </div>
        )}
      </div>
    </div>
  );
}

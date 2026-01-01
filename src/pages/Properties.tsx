import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import { propertyService } from '@/services/propertyService';
import { Skeleton } from '@/components/ui/skeleton';
import { PropertyFilters as FilterType } from '@/types';

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterType>({
    page: 1,
    limit: 12
  });

  useEffect(() => {
    const newFilters: FilterType = {
      page: Number(searchParams.get('page')) || 1,
      limit: 12,
      search: searchParams.get('search') || undefined,
      propertyType: searchParams.get('type') || undefined,
      city: searchParams.get('city') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
      furnished: searchParams.get('furnished') || undefined,
      availability: searchParams.get('availability') || 'available',
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    };
    setFilters(newFilters);
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyService.getAll(filters)
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Properties</h1>
          <p className="text-muted-foreground mt-2">
            {data?.pagination.total || 0} properties available
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <PropertyFilters />
          </aside>

          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-96 rounded-lg" />
                ))}
              </div>
            ) : data?.properties.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.properties.map((property: any) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No properties found matching your criteria</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

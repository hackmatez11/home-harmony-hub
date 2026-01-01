import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Bed, Bath, Maximize, Phone, Mail, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { propertyService } from '@/services/propertyService';

export default function PropertyDetails() {
  const { id } = useParams();
  
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyService.getById(id!)
  });

  if (isLoading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {property.images?.length > 0 && (
              <Carousel className="mb-6">
                <CarouselContent>
                  {property.images.map((img: any, idx: number) => (
                    <CarouselItem key={idx}>
                      <img 
                        src={`http://localhost:5000${img.url}`}
                        alt={property.title}
                        className="w-full h-96 object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}

            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.location.address}, {property.location.city}
                    </div>
                  </div>
                  <Badge>{property.availability}</Badge>
                </div>
                <div className="text-3xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                  {property.listingType === 'rent' && '/month'}
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                {property.area && (
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5" />
                    <span>{property.area.value} {property.area.unit}</span>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">{property.description}</p>
              </div>

              {property.features?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature: string, idx: number) => (
                      <Badge key={idx} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Listed By</h3>
                <div className="space-y-3">
                  <p className="font-semibold">{property.agencyId?.agencyName}</p>
                  {property.contactDetails && (
                    <>
                      {property.contactDetails.phone && (
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href={`tel:${property.contactDetails.phone}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </a>
                        </Button>
                      )}
                      {property.contactDetails.email && (
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href={`mailto:${property.contactDetails.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </a>
                        </Button>
                      )}
                      {property.contactDetails.whatsapp && (
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href={`https://wa.me/${property.contactDetails.whatsapp}`} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            WhatsApp
                          </a>
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {property.googleMapsLink && (
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Location</h3>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={property.googleMapsLink} target="_blank" rel="noopener noreferrer">
                      View on Google Maps
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

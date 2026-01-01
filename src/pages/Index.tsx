import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Building2, Users, Home, ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/properties/PropertyCard';
import Chatbot from '@/components/chat/Chatbot';
import VoiceBot from '@/components/chat/VoiceBot';
import { propertyService } from '@/services/propertyService';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { data: propertiesData } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => propertyService.getAll({ limit: 3, sortBy: 'views', sortOrder: 'desc' })
  });
  
  const featuredProperties = propertiesData?.properties || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const stats = [
    { icon: Building2, label: 'Properties Listed', value: '10,000+' },
    { icon: Users, label: 'Trusted Agencies', value: '500+' },
    { icon: Home, label: 'Happy Clients', value: '25,000+' },
  ];

  const features = [
    { icon: Shield, title: 'Verified Listings', description: 'All properties are verified by our team for authenticity.' },
    { icon: Star, title: 'Premium Support', description: '24/7 customer support to help you find your perfect home.' },
    { icon: Clock, title: 'Quick Process', description: 'Streamlined process from search to purchase.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-up">
              Find Your Dream Property
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Discover thousands of properties from trusted agencies worldwide. Your perfect home is just a search away.
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur-xl sm:flex-row animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-foreground/60" />
                <Input
                  placeholder="Search by location, property type..."
                  className="h-14 border-primary-foreground/20 bg-primary-foreground/10 pl-12 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20"
                />
              </div>
              <Button variant="accent" size="xl">
                Search Properties
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="mx-auto mb-2 h-8 w-8 text-primary-foreground/80" />
                  <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Properties</h2>
              <p className="mt-2 text-muted-foreground">Handpicked properties from our top agencies</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/properties">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.length > 0 ? featuredProperties.map((property: any) => (
              <PropertyCard key={property._id} property={property} />
            )) : (
              <p className="col-span-3 text-center text-muted-foreground">Loading featured properties...</p>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Why Choose Our Platform</h2>
            <p className="mt-2 text-muted-foreground">The trusted platform for finding your next property</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-card p-8 shadow-soft transition-shadow hover:shadow-card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl hero-gradient">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Agencies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-3xl hero-gradient p-12 text-center lg:p-16">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
              Are You a Real Estate Agency?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
              Join thousands of agencies already listing on PropHub. Get more visibility, reach more clients, and grow your business.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="accent" size="xl" asChild>
                <Link to="/signup?type=agency">Start Listing Today</Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
      <VoiceBot />
    </div>
  );
}

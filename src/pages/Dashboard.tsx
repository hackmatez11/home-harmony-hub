import { useQuery } from '@tantml:query';
import { Link } from 'react-router-dom';
import { Building2, Home, Eye, TrendingUp, Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { agencyService } from '@/services/propertyService';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: agencyService.getDashboardStats
  });

  if (isLoading) return <div>Loading...</div>;

  const statCards = [
    { icon: Home, label: 'Total Properties', value: stats?.totalProperties || 0, color: 'text-blue-600' },
    { icon: Building2, label: 'Available', value: stats?.availableProperties || 0, color: 'text-green-600' },
    { icon: TrendingUp, label: 'Sold', value: stats?.soldProperties || 0, color: 'text-purple-600' },
    { icon: Eye, label: 'Total Views', value: stats?.totalViews || 0, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your properties and track performance</p>
          </div>
          <Button asChild>
            <Link to="/dashboard/properties/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>
                {((stats?.storageUsed || 0) / (1024 * 1024)).toFixed(2)} MB of {((stats?.storageLimit || 0) / (1024 * 1024 * 1024)).toFixed(2)} GB used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={stats?.storageUsedPercent || 0} />
              <p className="text-sm text-muted-foreground mt-2">
                {stats?.storageUsedPercent?.toFixed(1)}% used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Listing Limit</CardTitle>
              <CardDescription>
                {stats?.listingCount || 0} of {stats?.listingLimit || 0} properties listed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={stats?.listingUsedPercent || 0} />
              <p className="text-sm text-muted-foreground mt-2">
                {stats?.listingUsedPercent?.toFixed(1)}% used
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button asChild variant="outline">
              <Link to="/dashboard/properties">View All Properties</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/properties/add">Add New Property</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

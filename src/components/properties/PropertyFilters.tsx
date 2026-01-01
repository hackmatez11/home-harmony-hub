import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { FilterOptions, Property } from '@/types';

interface PropertyFiltersProps {
  onSearch: (query: string) => void;
}

export default function PropertyFilters({ onSearch }: PropertyFiltersProps) {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [isOpen, setIsOpen] = useState(false);

  const propertyTypes: Property['type'][] = ['apartment', 'villa', 'house', 'plot', 'commercial', 'penthouse'];

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const applyFilters = (filters: Partial<FilterOptions>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
    setPriceRange([0, 5000000]);
  };

  const activeFilterCount = Object.keys(state.filters).filter(
    (key) => state.filters[key as keyof FilterOptions] !== undefined
  ).length;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by location, property type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="h-12 pl-10"
        />
      </div>

      {/* Quick Filters - Desktop */}
      <div className="hidden items-center gap-2 lg:flex">
        <Select
          value={state.filters.type?.[0]}
          onValueChange={(value) => applyFilters({ type: [value as Property['type']] })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={state.filters.bedrooms?.toString()}
          onValueChange={(value) => applyFilters({ bedrooms: parseInt(value) })}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}+ Beds
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={state.filters.sortBy}
          onValueChange={(value) => applyFilters({ sortBy: value as FilterOptions['sortBy'] })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* All Filters Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              Filters
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <X className="mr-1 h-4 w-4" />
                  Clear All
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Price Range */}
            <div>
              <Label className="text-base font-semibold">Price Range</Label>
              <div className="mt-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={10000000}
                  step={50000}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <Label className="text-base font-semibold">Property Type</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={state.filters.type?.includes(type) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = state.filters.type || [];
                      const updated = current.includes(type)
                        ? current.filter((t) => t !== type)
                        : [...current, type];
                      applyFilters({ type: updated.length > 0 ? updated : undefined });
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <Label className="text-base font-semibold">Bedrooms</Label>
              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={state.filters.bedrooms === num ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => applyFilters({ bedrooms: num === state.filters.bedrooms ? undefined : num })}
                  >
                    {num}+
                  </Button>
                ))}
              </div>
            </div>

            {/* Furnished */}
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Furnished Only</Label>
              <Switch
                checked={state.filters.furnished}
                onCheckedChange={(checked) => applyFilters({ furnished: checked || undefined })}
              />
            </div>

            {/* Status */}
            <div>
              <Label className="text-base font-semibold">Status</Label>
              <Select
                value={state.filters.status}
                onValueChange={(value) => applyFilters({ status: value as Property['status'] })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apply Button */}
            <Button
              className="w-full"
              onClick={() => {
                applyFilters({ priceMin: priceRange[0], priceMax: priceRange[1] });
                setIsOpen(false);
              }}
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Button onClick={handleSearch}>
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  );
}

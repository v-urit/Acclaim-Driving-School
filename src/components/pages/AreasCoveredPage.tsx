import React, { useState } from 'react';
import { MapPin, Search, Award, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { LOCATIONS_DATA } from '../../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AreasCoveredPageProps {
  onSelectAreaPostcode: (postcode: string) => void;
  onOpenBooking: () => void;
}

export const AreasCoveredPage: React.FC<AreasCoveredPageProps> = ({
  onSelectAreaPostcode,
  onOpenBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = LOCATIONS_DATA.filter((loc) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q) ||
      loc.postcodePrefixes.some((p) => p.toLowerCase().includes(q)) ||
      loc.testCentres.some((tc) => tc.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
          <MapPin className="h-4 w-4" />
          <span>UK NATIONWIDE DRIVING SCHOOL NETWORK</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Areas We Cover Across the UK
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From our founding headquarters in Leicestershire to hubs across the West Midlands, London, Wales, and Northern Ireland, Acclaim delivers expert local instruction on your local test routes.
        </p>

        {/* Postcode Search */}
        <div className="max-w-md mx-auto pt-4 relative">
          <Search className="absolute left-3.5 top-6.5 h-4 w-4 text-emerald-400" />
          <Input
            placeholder="Search area (e.g. Leicester, Belfast, Birmingham, LE19, BT1)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 font-mono text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Coverage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((loc) => (
          <Card
            key={loc.id}
            className="flex flex-col justify-between border-slate-800 bg-slate-900/70 p-6 hover:border-slate-700 transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                  {loc.region}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                  <Award className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{loc.passRate}% Pass Rate</span>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  {loc.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {loc.description}
                </p>
              </div>

              {/* Primary Test Centres */}
              <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  Official DVSA Test Centres:
                </span>
                <div className="flex flex-wrap gap-1">
                  {loc.testCentres.map((tc) => (
                    <span
                      key={tc}
                      className="text-xs font-medium text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                    >
                      {tc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Covered Postcodes */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  Postcodes Covered:
                </span>
                <div className="flex flex-wrap gap-1">
                  {loc.postcodePrefixes.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] font-mono bg-emerald-950/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800/40"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <Users className="h-3.5 w-3.5 text-emerald-400" />
                <span>{loc.activeInstructors} Instructors</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectAreaPostcode(loc.postcodePrefixes[0])}
                className="text-xs text-emerald-400 hover:text-white p-0 flex items-center gap-1"
              >
                <span>View Instructors</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

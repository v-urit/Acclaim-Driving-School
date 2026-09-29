import React, { useState, useMemo } from 'react';
import { Star, ShieldCheck, MapPin, Car, Filter, Calendar, ArrowRight, UserCheck } from 'lucide-react';
import { INSTRUCTORS_DATA } from '../../data/mockData';
import { Instructor } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface InstructorDirectoryProps {
  initialPostcode?: string;
  onSelectInstructor: (instructor: Instructor) => void;
}

export const InstructorDirectory: React.FC<InstructorDirectoryProps> = ({
  initialPostcode = '',
  onSelectInstructor,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialPostcode);
  const [selectedTransmission, setSelectedTransmission] = useState<'all' | 'manual' | 'automatic'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredInstructors = useMemo(() => {
    return INSTRUCTORS_DATA.filter((inst) => {
      // Transmission filter
      if (selectedTransmission !== 'all') {
        if (inst.transmission !== 'both' && inst.transmission !== selectedTransmission) {
          return false;
        }
      }

      // Region/Area filter
      if (selectedRegion !== 'all') {
        const matchesArea = inst.areas.some((a) =>
          a.toLowerCase().includes(selectedRegion.toLowerCase())
        );
        if (!matchesArea) return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.trim().toLowerCase();
        const matchesName = inst.name.toLowerCase().includes(query);
        const matchesPostcode = inst.postcodes.some((pc) => pc.toLowerCase().includes(query));
        const matchesArea = inst.areas.some((a) => a.toLowerCase().includes(query));
        const matchesCar = inst.car.toLowerCase().includes(query);
        if (!matchesName && !matchesPostcode && !matchesArea && !matchesCar) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedTransmission, selectedRegion]);

  return (
    <section id="instructors-section" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <UserCheck className="h-4 w-4" />
            <span>DVSA APPROVED DRIVING INSTRUCTORS (ADI)</span>
            <span aria-hidden="true">·</span>
            <span>GRADE A STANDARD</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Your Local Acclaim Instructors
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Every Acclaim instructor is fully qualified, police DBS checked, and rigorously assessed by the DVSA. Choose your instructor, check their dual-control car, and book directly.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/80 mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search by Postcode or Name */}
          <div className="sm:col-span-6 relative">
            <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400" />
            <Input
              type="text"
              placeholder="Search by postcode (e.g. LE19, B1, CV1), town or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-mono text-xs sm:text-sm"
            />
          </div>

          {/* Transmission segmented control */}
          <div className="sm:col-span-3 flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            {(['all', 'manual', 'automatic'] as const).map((trans) => (
              <button
                key={trans}
                type="button"
                onClick={() => setSelectedTransmission(trans)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-colors cursor-pointer ${
                  selectedTransmission === trans
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {trans === 'all' ? 'All Gears' : trans}
              </button>
            ))}
          </div>

          {/* Region Quick Dropdown */}
          <div className="sm:col-span-3">
            <select
              aria-label="Filter by UK Region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-slate-700 bg-slate-950 text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All UK Regions</option>
              <option value="Leicester">Leicestershire</option>
              <option value="Birmingham">West Midlands / Birmingham</option>
              <option value="Warwick">Warwickshire & Coventry</option>
              <option value="Nottingham">Nottingham & Derby</option>
              <option value="Belfast">Northern Ireland (Belfast)</option>
              <option value="London">London Metro</option>
              <option value="Cardiff">Cardiff & Wales</option>
            </select>
          </div>
        </div>

        {/* Active filter count feedback */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <span>
            Showing <strong className="text-white font-mono">{filteredInstructors.length}</strong> available instructors
          </span>
          {(searchTerm || selectedTransmission !== 'all' || selectedRegion !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTransmission('all');
                setSelectedRegion('all');
              }}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Instructors Grid */}
      {filteredInstructors.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <Filter className="h-8 w-8 text-slate-500 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-white">No instructors matched your criteria</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try searching for a different postcode prefix or clearing your transmission filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedTransmission('all');
              setSelectedRegion('all');
            }}
            className="mt-4 text-xs"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredInstructors.map((instructor) => (
            <Card
              key={instructor.id}
              className="flex flex-col justify-between border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all duration-200 group"
            >
              <CardContent className="p-5 space-y-4">
                {/* Header: Avatar Initials + DVSA Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-14 h-14 rounded-xl ${instructor.avatarBg} border border-slate-700/80 flex items-center justify-center font-display font-black text-xl text-white shadow-md shrink-0`}>
                    {instructor.avatarInitials}
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                      {instructor.grade}
                    </span>
                    <div className="flex items-center justify-end gap-1 text-xs text-amber-400 mt-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span className="font-mono font-bold text-white tabular-nums">{instructor.rating}</span>
                      <span className="text-[11px] text-slate-400">({instructor.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Name & Bio */}
                <div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                    {instructor.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>

                {/* Car & Transmission */}
                <div className="space-y-1.5 border-t border-slate-800/80 pt-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Car className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{instructor.car}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="uppercase text-emerald-400">{instructor.transmission} Gearbox</span>
                    <span>{instructor.experienceYears}y experience</span>
                  </div>
                </div>

                {/* Areas & Postcode Badges */}
                <div className="space-y-1 border-t border-slate-800/80 pt-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Areas Covered:</span>
                  <div className="text-xs text-slate-300 font-medium truncate">
                    {instructor.areas.slice(0, 3).join(', ')}
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {instructor.postcodes.map((pc) => (
                      <span key={pc} className="text-[10px] font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                        {pc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pass Rate & Rate */}
                <div className="flex items-baseline justify-between border-t border-slate-800/80 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">1ST-TIME PASS</span>
                    <span className="font-mono text-base font-bold text-emerald-400">
                      {instructor.firstTimePassRate}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">HOURLY RATE</span>
                    <span className="font-mono text-lg font-extrabold text-white">
                      £{instructor.hourlyRate}
                    </span>
                  </div>
                </div>

                {/* Book Action */}
                <Button
                  onClick={() => onSelectInstructor(instructor)}
                  variant="default"
                  size="sm"
                  className="w-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 pt-2"
                >
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>Book with {instructor.name.split(' ')[0]}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { RoadCanvasAnimation, CHECKPOINTS } from './components/highway/RoadCanvasAnimation';
import { TelemetryHUD } from './components/highway/TelemetryHUD';
import { CourseSelectionTabs } from './components/home/CourseSelectionTabs';
import { PassCostCalculator } from './components/home/PassCostCalculator';
import { InstructorDirectory } from './components/home/InstructorDirectory';
import { TheoryRevisionHub } from './components/home/TheoryRevisionHub';
import { DualControlFleet } from './components/home/DualControlFleet';
import { TestimonialsVerified } from './components/home/TestimonialsVerified';
import { FAQSection } from './components/home/FAQSection';
import { ModCareersPage } from './components/pages/ModCareersPage';
import { GiftVouchersPage } from './components/pages/GiftVouchersPage';
import { InfoCentrePage } from './components/pages/InfoCentrePage';
import { AreasCoveredPage } from './components/pages/AreasCoveredPage';
import { BookingModal } from './components/modals/BookingModal';
import { PortalLoginModal } from './components/modals/PortalLoginModal';
import { Course, Instructor } from './types';
import { COURSES_DATA } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Modals state
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [selectedTransmission, setSelectedTransmission] = useState<'manual' | 'automatic'>('manual');
  const [searchedPostcode, setSearchedPostcode] = useState('');

  // Scroll Telemetry State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(24);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const speedDecayTimeout = useRef<any>(null);

  // Monitor Scroll Progress & Velocity
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentY = window.scrollY;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, currentY / scrollHeight)) : 0;
      setScrollProgress(progress);

      // Determine active milestone index based on progress
      let mIndex = 0;
      for (let i = CHECKPOINTS.length - 1; i >= 0; i--) {
        if (progress >= CHECKPOINTS[i].progressThreshold - 0.05) {
          mIndex = i;
          break;
        }
      }
      setActiveMilestoneIndex(mIndex);

      // Calculate scroll speed (mph representation)
      const now = Date.now();
      const dt = Math.max(16, now - lastScrollTime.current);
      const dy = Math.abs(currentY - lastScrollY.current);
      const velocity = dy / dt; // pixels per ms

      // Scale to realistic UK speed: 0 mph at rest, up to 70 mph spirited scroll
      const instantaneousMph = Math.min(70, Math.max(0, Math.round(velocity * 32)));
      setScrollSpeed(instantaneousMph);

      lastScrollY.current = currentY;
      lastScrollTime.current = now;

      // When user stops scrolling, decay speed smoothly to 0 mph (idle rest)
      clearTimeout(speedDecayTimeout.current);
      speedDecayTimeout.current = setTimeout(() => {
        setScrollSpeed(0);
      }, 140);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(speedDecayTimeout.current);
    };
  }, []);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchPostcode = (pc: string) => {
    setSearchedPostcode(pc);
    setCurrentTab('instructors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourseToBook = (course: Course) => {
    setSelectedCourse(course);
    setBookingOpen(true);
  };

  const handleSelectInstructorToBook = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setBookingOpen(true);
  };

  const handleBookFromCalculator = (details: {
    hours: number;
    price: number;
    transmission: 'manual' | 'automatic';
    level: string;
  }) => {
    setSelectedTransmission(details.transmission);
    let matchedCourse = COURSES_DATA.find((c) => c.hours === details.hours);
    if (!matchedCourse) {
      if (details.hours <= 15) matchedCourse = COURSES_DATA.find((c) => c.id === 'intensive-3day');
      else if (details.hours <= 25) matchedCourse = COURSES_DATA.find((c) => c.id === 'intensive-5day');
      else matchedCourse = COURSES_DATA.find((c) => c.id === 'intensive-10day');
    }
    if (matchedCourse) setSelectedCourse(matchedCourse);
    setBookingOpen(true);
  };

  const handleStageChange = (stageIndex: number) => {
    setActiveMilestoneIndex(stageIndex);
  };

  const handleCruiseSpeedChange = (speed: number) => {
    setScrollSpeed(speed);
  };

  const handleJumpToMilestone = (index: number) => {
    const target = CHECKPOINTS[index]?.progressThreshold || 0;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollHeight * target,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white pb-14 md:pb-0">
      {/* Top Bar strictly complying with Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />

      {/* Floating Vehicle Telemetry Instrument Cluster */}
      <TelemetryHUD
        scrollProgress={scrollProgress}
        scrollSpeed={scrollSpeed}
        activeMilestoneIndex={activeMilestoneIndex}
        onJumpToMilestone={handleJumpToMilestone}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <HeroSection
              onSearchPostcode={handleSearchPostcode}
              onOpenBooking={() => setBookingOpen(true)}
              onNavigateTab={handleNavigate}
            />

            {/* Scroll-Driven British Road Highway Animation */}
            <RoadCanvasAnimation
              scrollProgress={scrollProgress}
              onStageChange={handleStageChange}
              onCruiseSpeedChange={handleCruiseSpeedChange}
              onOpenBooking={() => setBookingOpen(true)}
            />

            {/* Course Selection Tabs */}
            <CourseSelectionTabs
              onSelectCourse={handleSelectCourseToBook}
              onNavigateTab={handleNavigate}
            />

            {/* Interactive Pass & Cost Calculator */}
            <PassCostCalculator onBookEstimatedCourse={handleBookFromCalculator} />

            {/* Instructor Directory Preview */}
            <InstructorDirectory
              initialPostcode={searchedPostcode}
              onSelectInstructor={handleSelectInstructorToBook}
            />

            {/* Theory Revision Hub with Highway Code Quiz */}
            <TheoryRevisionHub onOpenBooking={() => setBookingOpen(true)} />

            {/* Dual Control Fleet & He-Man Specs */}
            <DualControlFleet />

            {/* Testimonials & Verified Passes */}
            <TestimonialsVerified />

            {/* FAQs */}
            <FAQSection />
          </>
        )}

        {currentTab === 'instructors' && (
          <div className="pt-6">
            <InstructorDirectory
              initialPostcode={searchedPostcode}
              onSelectInstructor={handleSelectInstructorToBook}
            />
          </div>
        )}

        {currentTab === 'theory' && (
          <div className="pt-6">
            <TheoryRevisionHub onOpenBooking={() => setBookingOpen(true)} />
          </div>
        )}

        {currentTab === 'mod' && (
          <ModCareersPage onOpenBooking={() => setBookingOpen(true)} />
        )}

        {currentTab === 'vouchers' && (
          <GiftVouchersPage onOpenBooking={() => setBookingOpen(true)} />
        )}

        {currentTab === 'info' && <InfoCentrePage />}

        {currentTab === 'areas' && (
          <AreasCoveredPage
            onSelectAreaPostcode={handleSearchPostcode}
            onOpenBooking={() => setBookingOpen(true)}
          />
        )}
      </main>

      {/* Authentic British Driving School Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />

      {/* Multi-Step Booking Modal */}
      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        preselectedCourse={selectedCourse}
        preselectedInstructor={selectedInstructor}
        preselectedPostcode={searchedPostcode}
        preselectedTransmission={selectedTransmission}
      />

      {/* Pupil & Instructor Portal Login Modal */}
      <PortalLoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}

import React, { useState } from 'react';
import { Check, Clock, Calendar, ArrowRight, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import { COURSES_DATA } from '../../data/mockData';
import { Course } from '../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

interface CourseSelectionTabsProps {
  onSelectCourse: (course: Course) => void;
  onNavigateTab: (tab: string) => void;
}

export const CourseSelectionTabs: React.FC<CourseSelectionTabsProps> = ({
  onSelectCourse,
  onNavigateTab,
}) => {
  const [activeTab, setActiveTab] = useState('intensive');

  const intensiveCourses = COURSES_DATA.filter((c) => c.id.startsWith('intensive'));
  const weeklyCourses = COURSES_DATA.filter((c) => c.id.startsWith('weekly'));

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>STRUCTURED SYLLABUS</span>
            <span aria-hidden="true">·</span>
            <span>CHOOSE YOUR LEARNING PATH</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Driving Courses Designed for Your Pace
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Whether you want to compress tuition into a rapid 10-day intensive or spread weekly lessons at your own schedule, we have the DVSA curriculum tailored for you.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 max-w-2xl mb-8">
          <TabsTrigger value="intensive">Intensive Courses</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Lessons</TabsTrigger>
          <TabsTrigger value="theory">Theory App Partner</TabsTrigger>
          <TabsTrigger value="training">Become Instructor</TabsTrigger>
        </TabsList>

        {/* Tab 1: Intensive Courses */}
        <TabsContent value="intensive">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {intensiveCourses.map((course) => (
              <Card
                key={course.id}
                className={`relative flex flex-col justify-between transition-all duration-200 ${
                  course.popular
                    ? 'border-emerald-500/80 bg-slate-900/90 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-[11px] font-mono uppercase font-bold px-2.5 py-0.5 rounded shadow-sm">
                    Most Popular
                  </div>
                )}
                <div>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.subtitle}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
                        £{course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="font-mono text-sm text-slate-400 line-through tabular-nums">
                          £{course.originalPrice}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 ml-auto font-mono">
                        {course.hours} Tuition Hours
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      <span className="font-semibold text-white">Ideal for: </span>
                      {course.idealFor}
                    </p>

                    <div className="space-y-2 text-xs text-slate-300 pt-1">
                      {course.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-4 border-t border-slate-800/80">
                  <Button
                    onClick={() => onSelectCourse(course)}
                    variant={course.popular ? "default" : "secondary"}
                    className="w-full text-xs font-semibold"
                  >
                    <span>Book {course.title}</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: Weekly Lessons */}
        <TabsContent value="weekly">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {weeklyCourses.map((course) => (
              <Card
                key={course.id}
                className="flex flex-col justify-between border-slate-800 bg-slate-900/70"
              >
                <div>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.subtitle}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
                        £{course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="font-mono text-sm text-slate-400 line-through tabular-nums">
                          £{course.originalPrice}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 ml-auto font-mono">
                        {course.hours} Hours
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {course.description}
                    </p>

                    <div className="space-y-2 text-xs text-slate-300 pt-1">
                      {course.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-4 border-t border-slate-800/80">
                  <Button
                    onClick={() => onSelectCourse(course)}
                    variant="default"
                    className="w-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-500"
                  >
                    <span>Choose {course.title}</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Theory App Partner */}
        <TabsContent value="theory">
          <Card className="border-slate-800 bg-slate-900/80 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <BookOpen className="h-4 w-4" />
                  <span>OFFICIAL DVSA LEARNING PARTNER</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Driving Test Success 4-in-1 Theory Kit
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We have partnered with Driving Test Success, the UK’s #1 theory test revision app. Through Acclaim, receive 3 months full access for just <strong className="text-emerald-400">£7.50</strong> with pass guarantee.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Every official DVSA revision question & answer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>85 CGI Hazard Perception video clips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Complete UK Highway Code with interactive road signs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Pass Guarantee: £23 refund if you fail</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                  <Button
                    onClick={() => onNavigateTab('theory')}
                    variant="default"
                    className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold"
                  >
                    <span>Practice Theory Quiz Now</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>

              <div className="md:col-span-4 bg-slate-950/80 rounded-xl p-6 border border-slate-800 text-center space-y-3">
                <span className="text-xs font-mono text-slate-400 block uppercase">Special Acclaim Rate</span>
                <div className="font-mono text-4xl font-extrabold text-emerald-400">
                  £7.50
                </div>
                <span className="text-xs text-slate-400 block">3 Months Full Premium Access</span>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 border border-emerald-800/60 py-1.5 px-3 rounded-md">
                  ★ 4.9 App Store Rating
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 4: Instructor Training */}
        <TabsContent value="training">
          <Card className="border-slate-800 bg-slate-900/80 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <GraduationCap className="h-4 w-4" />
                  <span>NEW CAREER OPPORTUNITY</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Train to Become an Approved Driving Instructor (ADI)
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Be your own boss, choose your working hours, and enjoy high earning potential (£800–£1,200+ per week). Acclaim offers comprehensive ADI Part 1, 2, and 3 training with guaranteed franchise placement upon qualification.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Average earnings £850 - £1,200 / week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Flexible hours to match family lifestyle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Buy Now Pay Later financing via Payl8r</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Exclusive military driver contract opportunities (MOD)</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                  <Button
                    onClick={() => onNavigateTab('mod')}
                    variant="default"
                    className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold"
                  >
                    <span>View MOD & Trainee Careers</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>

              <div className="md:col-span-4 bg-slate-950/80 rounded-xl p-6 border border-slate-800 text-center space-y-3">
                <span className="text-xs font-mono text-slate-400 block uppercase">Weekly Earning Potential</span>
                <div className="font-mono text-3xl font-extrabold text-emerald-400">
                  £800 - £1,200+
                </div>
                <span className="text-xs text-slate-400 block">Weekly Gross Revenue</span>
                <div className="text-xs text-slate-300 font-semibold bg-slate-900 border border-slate-700 py-1.5 px-3 rounded-md">
                  Guaranteed Franchise Offer
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

import React, { useState } from 'react';
import { Shield, CheckCircle, Award, Users, ChevronRight, PhoneCall, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

interface ModCareersPageProps {
  onOpenBooking: () => void;
}

export const ModCareersPage: React.FC<ModCareersPageProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    experience: 'qualified-adi',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setSubmitted(true);
  };

  const modFaqs = [
    {
      id: 'mod-1',
      question: 'What is the MOD Army Driver Training Project?',
      answer: 'Acclaim Driving has an exclusive government contract to provide civilian and military Category B driver training for British Army personnel. Instructors teach recruits and active service members at bases and regional centers across the UK.'
    },
    {
      id: 'mod-2',
      question: 'Can I teach on the MOD project as a Trainee (PDI)?',
      answer: 'Yes! Acclaim provides a sponsored path allowing Potential Driving Instructors (PDIs) who have passed ADI Part 1 and Part 2, and completed their 40 hours of Part 3 training, to deliver tuition on trainee licenses.'
    },
    {
      id: 'mod-3',
      question: 'What are the typical weekly earnings on this project?',
      answer: 'Instructors on the MOD project typically bill between £850 and £1,200+ per week depending on hours delivered. All military hours are block-booked in advance, eliminating lesson cancellations and unbilled downtime.'
    },
    {
      id: 'mod-4',
      question: 'Do I need military or security clearance?',
      answer: 'You will need standard Baseline Personnel Security Standard (BPSS) clearance and an enhanced DBS check, which our dedicated MOD operations office will coordinate and fund on your behalf.'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-14 overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            <Shield className="h-4 w-4" />
            <span>BRITISH MINISTRY OF DEFENCE TRAINING PARTNER</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Train Military Recruits as an Acclaim MOD Instructor
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Acclaim Driving provides contracted driver training to the British Armed Forces. We are recruiting both fully qualified Approved Driving Instructors (ADIs) and Trainee Instructors (PDIs) nationwide with guaranteed hours and top-tier weekly earnings.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-mono text-slate-200">
            <div>
              <span className="text-emerald-400 font-bold text-xl block">£850–£1,200+</span>
              <span className="text-xs text-slate-400 font-sans">Weekly Gross Revenue</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-white font-bold text-xl block">Block-Booked</span>
              <span className="text-xs text-slate-400 font-sans">Zero Cancellation Waste</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-emerald-400 font-bold text-xl block">UK Nationwide</span>
              <span className="text-xs text-slate-400 font-sans">Bases & Regional Centers</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-800 bg-slate-900/60 p-6">
          <CardHeader className="p-0 pb-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
              <Award className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Pre-Booked Hours</CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-slate-400 text-xs sm:text-sm leading-relaxed">
            Unlike standard private pupils, MOD military contracts schedule full-day intensive training rosters in advance. You have stable income guaranteed without chasing calendar vacancies.
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-6">
          <CardHeader className="p-0 pb-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
              <Users className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Trainee (PDI) Fast Track</CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-slate-400 text-xs sm:text-sm leading-relaxed">
            Begin earning while you train for ADI Part 3. Acclaim sponsors your trainee licence, provides a dual-control training car, and pairs you with senior DVSA Grade A mentor trainers.
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-6">
          <CardHeader className="p-0 pb-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Secure MOD Contract</CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-slate-400 text-xs sm:text-sm leading-relaxed">
            Acclaim has operated military driver training frameworks for years with strict adherence to British defence standards, safe systems of work, and professional civilian instructors.
          </CardContent>
        </Card>
      </div>

      {/* Application Form & FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Express Application Form */}
        <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="space-y-2 mb-6">
            <h3 className="font-display text-2xl font-bold text-white">
              Apply for MOD Project / Instructor Training
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Speak with our Instructor Recruitment Manager to discuss earnings, locations, and joining the team.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Captain David Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="david@example.co.uk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="07123 456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Your Home Postcode
                  </label>
                  <Input
                    placeholder="e.g. LE19, B1, CV1..."
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Current Qualification
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full h-11 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="qualified-adi">Qualified ADI (Green Badge)</option>
                    <option value="trainee-pdi">Trainee PDI (Pink Badge)</option>
                    <option value="new-to-industry">Beginner (Want to Train)</option>
                    <option value="military-veteran">Armed Forces Veteran</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Questions / Preferred Locations
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your driving experience or current situation..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold"
              >
                Submit MOD Instructor Application
              </Button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h4 className="font-display text-xl font-bold text-white">Application Received</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, {formData.name}. Our MOD Recruitment Officer will review your details and contact you at {formData.phone} within 24 business hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
                className="text-xs mt-2"
              >
                Submit another inquiry
              </Button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
              Direct Recruitment Line: 0800 838 440
            </span>
            <span className="text-emerald-400">Mon-Fri 9am-5pm</span>
          </div>
        </div>

        {/* Right: MOD FAQs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase">MOD FAQs</span>
            <h3 className="font-display text-2xl font-bold text-white">
              Everything You Need to Know
            </h3>
          </div>

          <Accordion defaultValue="mod-1" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            {modFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger value={faq.id}>{faq.question}</AccordionTrigger>
                <AccordionContent value={faq.id}>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
            <h4 className="font-display font-bold text-white text-base">
              Already an Acclaim Franchisee?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If you are currently teaching with Acclaim Driving and want to add MOD military hours to your weekly diary, log into your Instructor Portal to request assignment allocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

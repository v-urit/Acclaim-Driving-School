import React, { useState } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, ShieldCheck, HelpCircle, ChevronRight, Eye } from 'lucide-react';
import { MANOEUVRES_DATA, SHOW_ME_TELL_ME_DATA } from '../../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

export const InfoCentrePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('manoeuvres');
  const [selectedManoeuvreId, setSelectedManoeuvreId] = useState(MANOEUVRES_DATA[0].id);
  const [revealedAnswers, setRevealedAnswers] = useState<{ [id: string]: boolean }>({});

  const activeManoeuvre = MANOEUVRES_DATA.find((m) => m.id === selectedManoeuvreId) || MANOEUVRES_DATA[0];

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const cockpitDrillSteps = [
    {
      letter: 'D',
      title: 'Doors',
      desc: 'Ensure all doors including boot are securely shut. Confirm no red door-ajar warning lights on instrument cluster before starting engine.',
      check: 'Check child locks if carrying passengers; ensure doors are closed firmly without rattling.'
    },
    {
      letter: 'S',
      title: 'Seat & Head Restraint',
      desc: 'Depress clutch pedal fully to the floor. Your left knee should maintain a slight comfortable bend. Set backrest angle so wrists rest naturally on top of steering wheel without reaching.',
      check: 'Adjust rigid head restraint so the rigid central section is at least level with top of ears.'
    },
    {
      letter: 'S',
      title: 'Steering',
      desc: 'Hold steering wheel at 9-and-3 or 10-and-2 position. Ensure you have an unobstructed view of all dashboard instruments through the steering wheel rim.',
      check: 'Arms should be slightly bent, relaxed, and free of steering lock interference.'
    },
    {
      letter: 'S',
      title: 'Seatbelt',
      desc: 'Fasten your seatbelt ensuring the diagonal strap crosses your collarbone and chest without twisting, and lap portion rests across hips.',
      check: 'Give the strap a swift tug to verify the inertia-reel locking mechanism catches.'
    },
    {
      letter: 'M',
      title: 'Mirrors',
      desc: 'Adjust interior mirror with left hand by holding edges to frame entire rear window. Set left & right wing mirrors to see a small sliver of car body and road horizon centered.',
      check: 'Never adjust mirrors whilst vehicle is in motion.'
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
          <BookOpen className="h-4 w-4" />
          <span>DVSA OFFICIAL CURRICULUM REFERENCE</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Learner Information Centre
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Master the DSSSM cockpit setup, examiner-approved manoeuvre reference points, and official DVSA &ldquo;Show Me / Tell Me&rdquo; vehicle safety questions.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-8">
          <TabsTrigger value="cockpit">Cockpit Drill (DSSSM)</TabsTrigger>
          <TabsTrigger value="manoeuvres">4 Core Manoeuvres</TabsTrigger>
          <TabsTrigger value="show-me">Show Me / Tell Me</TabsTrigger>
        </TabsList>

        {/* Tab 1: DSSSM Cockpit Drill */}
        <TabsContent value="cockpit">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 max-w-3xl mx-auto text-center space-y-2">
              <span className="font-mono text-xs uppercase text-emerald-400">Golden Routine</span>
              <h3 className="font-display text-2xl font-bold text-white">
                The DSSSM Sequence Before Turning the Key
              </h3>
              <p className="text-xs text-slate-300">
                Examiners expect this systematic routine on your very first lesson and before setting off on your practical test.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {cockpitDrillSteps.map((step) => (
                <Card key={step.letter + step.title} className="border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center font-display font-black text-2xl text-emerald-400">
                      {step.letter}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 mt-4 text-[11px] text-emerald-400/90 font-mono">
                    ✓ {step.check}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: 4 Core Driving Manoeuvres */}
        <TabsContent value="manoeuvres">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Manoeuvre Selector List */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className="text-xs font-mono text-slate-400 uppercase block mb-1">
                Select Manoeuvre:
              </span>
              {MANOEUVRES_DATA.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedManoeuvreId(m.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedManoeuvreId === m.id
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50 shadow-md'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase">
                      {m.dvsaCode}
                    </span>
                    <span className="font-semibold text-white text-sm">{m.name}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${selectedManoeuvreId === m.id ? 'text-emerald-400 translate-x-1' : ''}`} />
                </button>
              ))}
            </div>

            {/* Manoeuvre Deep Dive Card */}
            <div className="lg:col-span-8">
              <Card className="border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                      {activeManoeuvre.dvsaCode}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">
                      {activeManoeuvre.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                    Accuracy & Control Criterion
                  </span>
                </div>

                {/* Key Steps */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>Step-by-Step Execution Sequence</span>
                  </h4>
                  <div className="space-y-2">
                    {activeManoeuvre.keySteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200">
                        <span className="w-5 h-5 rounded-md bg-emerald-950 text-emerald-400 flex items-center justify-center font-mono font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examiner Checks & Faults side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <h5 className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Examiner Golden Checks</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeManoeuvre.examinerChecks.map((chk, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">✓</span>
                          <span>{chk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                    <h5 className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Avoid Serious / Dangerous Faults</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeManoeuvre.commonFaults.map((flt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400">✕</span>
                          <span>{flt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Official Show Me / Tell Me Questions */}
        <TabsContent value="show-me">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 max-w-3xl mx-auto text-center space-y-2">
              <span className="font-mono text-xs uppercase text-emerald-400">DVSA Vehicle Safety Checks</span>
              <h3 className="font-display text-2xl font-bold text-white">
                Show Me & Tell Me Questions
              </h3>
              <p className="text-xs text-slate-300">
                You will be asked 1 &apos;Tell Me&apos; question at the test centre before moving off, and 1 &apos;Show Me&apos; question while driving. Click any card to reveal the model answer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SHOW_ME_TELL_ME_DATA.map((item) => {
                const isRevealed = revealedAnswers[item.id];
                return (
                  <Card
                    key={item.id}
                    className="border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={`px-2 py-0.5 rounded uppercase font-semibold ${
                          item.type === 'tell-me'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {item.type === 'tell-me' ? 'Tell Me (Stationary)' : 'Show Me (While Driving)'}
                        </span>
                        <span className="text-slate-400">{item.whenAsked}</span>
                      </div>

                      <h4 className="font-display font-bold text-base text-white leading-snug">
                        {item.question}
                      </h4>

                      {isRevealed ? (
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-200 space-y-2 animate-in fade-in-50">
                          <p className="leading-relaxed"><strong className="text-emerald-400">Model Answer: </strong>{item.answer}</p>
                          <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 font-mono">
                            Safety tip: {item.safetyTip}
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-slate-950/50 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                          Click &apos;Reveal Model Answer&apos; to practice your verbal response
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleReveal(item.id)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer w-full"
                    >
                      <Eye className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{isRevealed ? 'Hide Answer' : 'Reveal Model Answer'}</span>
                    </button>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

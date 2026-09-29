import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, Award, RotateCcw, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { THEORY_QUESTIONS_DATA } from '../../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface TheoryRevisionHubProps {
  onOpenBooking: () => void;
}

export const TheoryRevisionHub: React.FC<TheoryRevisionHubProps> = ({
  onOpenBooking,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const question = THEORY_QUESTIONS_DATA[currentQuestionIndex];
  const totalQuestions = THEORY_QUESTIONS_DATA.length;

  const handleSelectOption = (index: number) => {
    if (selectedAnswers[question.id] !== undefined) return; // locked once answered
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: index }));
  };

  const isCurrentAnswered = selectedAnswers[question.id] !== undefined;
  const isCorrect = selectedAnswers[question.id] === question.correctIndex;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
  };

  const score = Object.keys(selectedAnswers).reduce((acc, qId) => {
    const q = THEORY_QUESTIONS_DATA.find((item) => item.id === Number(qId));
    return acc + (q && selectedAnswers[Number(qId)] === q.correctIndex ? 1 : 0);
  }, 0);

  const hasPassed = score >= 4;

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Partnership Hero Card */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-10 shadow-2xl mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Sparkles className="h-4 w-4" />
              <span>OFFICIAL REVISION PARTNER · DRIVING TEST SUCCESS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pass Your DVSA Theory Test First Time
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We have teamed up with the UK’s #1 theory revision app to offer our pupils 3 full months of unlimited access for only <strong className="text-emerald-400 font-bold">£7.50</strong> (usually £14.99). Includes every official 2026 DVSA question, CGI Hazard Perception simulator, and full pass guarantee.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Pass Guarantee (£23 fee refund)
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                iOS & Android App Access
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 rounded-xl p-6 border border-slate-800 text-center space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase">Acclaim Pupil Exclusive</span>
              <div className="font-mono text-4xl font-extrabold text-emerald-400">
                £7.50
              </div>
              <span className="text-xs text-slate-400">3 Months Access (Save 50%)</span>
            </div>
            <Button
              onClick={onOpenBooking}
              variant="default"
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs"
            >
              Get Theory App Deal
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive Highway Code Practice Quiz */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <BookOpen className="h-4 w-4" />
            <span>INTERACTIVE KNOWLEDGE TEST</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-white">
            Official Highway Code Practice Quiz
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Test your knowledge of stopping distances, smart motorways, pedestrian priorities, and roundabouts. DVSA theory pass mark is 86% (43/50).
          </p>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Current Question:</span>
              <span className="font-mono text-white font-semibold">{currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Correct Answers:</span>
              <span className="font-mono text-emerald-400 font-semibold">{score} / {Object.keys(selectedAnswers).length}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Pass Target:</span>
              <span className="font-mono text-slate-200">4 or 5 correct</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Card className="border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            {!quizFinished ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                    Category: {question.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                </div>

                {/* Question */}
                <h4 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                  {question.question}
                </h4>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[question.id] === idx;
                    const isRightOption = idx === question.correctIndex;
                    const hasAnswered = selectedAnswers[question.id] !== undefined;

                    let btnClass = "border-slate-800 bg-slate-950/70 text-slate-200 hover:border-slate-700";
                    if (hasAnswered) {
                      if (isRightOption) {
                        btnClass = "border-emerald-500 bg-emerald-950/60 text-white font-medium";
                      } else if (isSelected && !isRightOption) {
                        btnClass = "border-rose-500 bg-rose-950/60 text-rose-200";
                      } else {
                        btnClass = "border-slate-900 bg-slate-950/40 text-slate-500";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        disabled={hasAnswered}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${btnClass}`}
                      >
                        <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700/80 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm pt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback once answered */}
                {isCurrentAnswered && (
                  <div className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in-50 duration-200 ${
                    isCorrect
                      ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                      : 'border-rose-500/40 bg-rose-950/30 text-rose-300'
                  }`}>
                    <div className="flex items-center gap-2 font-bold font-display text-sm">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          <span>Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-rose-400" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed">{question.explanation}</p>
                    <div className="font-mono text-[11px] text-emerald-400 pt-1">
                      Reference: {question.highwayCodeRef}
                    </div>
                  </div>
                )}

                {/* Navigation Button */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                  {isCurrentAnswered && (
                    <Button
                      onClick={handleNext}
                      variant="default"
                      className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold"
                    >
                      <span>{currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'View Test Results'}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Results screen */
              <div className="text-center py-8 space-y-6">
                <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
                  hasPassed
                    ? 'bg-emerald-600/20 border border-emerald-500 text-emerald-400'
                    : 'bg-amber-600/20 border border-amber-500 text-amber-400'
                }`}>
                  <Award className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-2xl font-bold text-white">
                    {hasPassed ? 'Congratulations! You Passed!' : 'Good Effort! Keep Revising'}
                  </h4>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    You scored <strong className="text-white font-mono text-base">{score} / {totalQuestions}</strong> ({Math.round((score / totalQuestions) * 100)}%). {hasPassed ? 'You demonstrated solid UK Highway Code comprehension.' : 'DVSA requires an 86% pass mark. Use our Driving Test Success revision app to guarantee your pass.'}
                  </p>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Button
                    onClick={handleResetQuiz}
                    variant="outline"
                    className="text-xs"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Quiz
                  </Button>
                  <Button
                    onClick={onOpenBooking}
                    variant="default"
                    className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold"
                  >
                    Get Full Theory App (£7.50)
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

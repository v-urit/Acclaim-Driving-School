import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      id: 'faq-1',
      question: 'What do I need before I can book my first driving lesson?',
      answer: 'You must hold a valid UK Provisional Driving Licence (apply online at gov.uk at age 15 years and 9 months). You must also be able to read an old-style number plate from 20.5 metres away, or a modern number plate from 20 metres away (with glasses or contact lenses if worn).'
    },
    {
      id: 'faq-2',
      question: 'How many lessons does the average UK learner need to pass?',
      answer: 'According to official DVSA statistics, the average learner driver takes approximately 45 hours of professional tuition combined with 22 hours of private practice. With Acclaim’s structured syllabus and Grade A coaching, many pupils pass first time in 30–35 hours.'
    },
    {
      id: 'faq-3',
      question: 'Should I choose an Intensive Course or Weekly Driving Lessons?',
      answer: 'If you need your full licence urgently for work, university, or travel, our 3, 5, or 10-day intensive driving courses condense months of learning into consecutive days with a practical test booked at the end. If you prefer spreading tuition costs and balancing lessons around a routine, our 10-hour saver blocks or weekly pay-as-you-go sessions are ideal.'
    },
    {
      id: 'faq-4',
      question: 'Can I learn and take my test in an Automatic car?',
      answer: 'Yes! Acclaim operates an extensive fleet of modern automatic hatchbacks across our coverage areas. Automatic cars have no clutch pedal and cannot stall, making them easier and quicker to master. Passing in an automatic gives you a Category B Auto licence.'
    },
    {
      id: 'faq-5',
      question: 'How does Acclaim’s 82% 1st-time pass rate compare to the UK national average?',
      answer: 'The UK national driving test pass rate is approximately 48% (DVSA statistics). Acclaim pupils achieve an 82% first-time pass rate because we conduct realistic mock driving tests on actual local test routes and will only put you forward for your test when you are demonstrably driving at independent test standard.'
    },
    {
      id: 'faq-6',
      question: 'Can I spread the cost of my intensive course or lessons?',
      answer: 'Yes. Through our partner Payl8r, you can spread your driving lesson payments across 3, 6, 9, or 12 months with flexible finance options and 0% interest terms available.'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
          <HelpCircle className="h-4 w-4" />
          <span>LEARNER FAQS & ANSWERS</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Everything you need to know about provisional licences, intensive driving courses, and passing the DVSA test.
        </p>
      </div>

      <Accordion defaultValue="faq-1" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger value={faq.id}>{faq.question}</AccordionTrigger>
            <AccordionContent value={faq.id}>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

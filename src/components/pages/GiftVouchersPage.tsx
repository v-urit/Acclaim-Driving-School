import React, { useState } from 'react';
import { Gift, Printer, CheckCircle, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface GiftVouchersPageProps {
  onOpenBooking: () => void;
}

export const GiftVouchersPage: React.FC<GiftVouchersPageProps> = ({ onOpenBooking }) => {
  const [hours, setHours] = useState<number>(10);
  const [recipient, setRecipient] = useState<string>('Sophie Harrison');
  const [sender, setSender] = useState<string>('Mum & Dad');
  const [message, setMessage] = useState<string>(
    'Happy 17th Birthday Sophie! You are going to be an amazing driver. Safe travels!'
  );
  const [transmission, setTransmission] = useState<'manual' | 'automatic'>('manual');
  const [isPurchased, setIsPurchased] = useState(false);

  const voucherOptions = [
    { hours: 2, price: 70, desc: 'Introductory taster lesson (2 hours)' },
    { hours: 5, price: 170, desc: 'Confidence building block' },
    { hours: 10, price: 330, desc: 'Most popular 10-hour saver package' },
    { hours: 20, price: 650, desc: 'Comprehensive foundation block' },
  ];

  const currentOption = voucherOptions.find((o) => o.hours === hours) || voucherOptions[2];
  const voucherCode = `ACCLAIM-${hours}H-${transmission === 'manual' ? 'MAN' : 'AUT'}-9284`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Gift className="h-4 w-4" />
          <span>THE ULTIMATE 17TH BIRTHDAY & CHRISTMAS GIFT</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Driving Lesson Gift Vouchers
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Give the gift of lifetime freedom and independence. Customise an official Acclaim driving tuition voucher with immediate digital presentation and 12-month validity nationwide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Customizer */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-display text-lg font-bold text-white">Customise Your Voucher</h3>
            <p className="text-xs text-slate-400">Live preview updates automatically on the right</p>
          </div>

          {/* Select Hours */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
              1. Choose Tuition Hours
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {voucherOptions.map((opt) => (
                <button
                  key={opt.hours}
                  type="button"
                  onClick={() => setHours(opt.hours)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    hours === opt.hours
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white text-sm">{opt.hours} Hours</div>
                  <div className="font-mono text-xs text-emerald-400 font-semibold mt-0.5">
                    £{opt.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
              2. Transmission
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTransmission('manual')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  transmission === 'manual'
                    ? 'border-emerald-500 bg-emerald-950/60 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                Manual Gearbox
              </button>
              <button
                type="button"
                onClick={() => setTransmission('automatic')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  transmission === 'automatic'
                    ? 'border-emerald-500 bg-emerald-950/60 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                Automatic Car
              </button>
            </div>
          </div>

          {/* Recipient & Sender */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Recipient Name (Pupil)
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Sophie Harrison"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Sender Name (Gifter)
              </label>
              <Input
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. Mum & Dad"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Personalised Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a warm note for the recipient..."
                className="w-full p-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Checkout action */}
          <div className="pt-2">
            <Button
              onClick={() => setIsPurchased(true)}
              variant="default"
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold text-sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Purchase Voucher · £{currentOption.price}</span>
            </Button>
          </div>
        </div>

        {/* Right: Live Realistic Voucher Certificate Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase text-emerald-400">Live Voucher Preview</span>
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <Printer className="h-3.5 w-3.5 mr-1.5" />
              Print / Save Certificate
            </Button>
          </div>

          {/* The Certificate Box */}
          <div className="relative rounded-2xl border-4 border-emerald-600/40 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30 p-8 sm:p-10 shadow-2xl text-slate-100 overflow-hidden print:bg-white print:text-black">
            {/* Corner Ornamental Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-400 opacity-60" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-400 opacity-60" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-400 opacity-60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-400 opacity-60" />

            {/* Header Stamp */}
            <div className="flex items-start justify-between border-b border-emerald-500/20 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center font-display font-black text-white text-2xl shadow-md">
                  L
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-white tracking-wide">
                    Acclaim Driving School
                  </h2>
                  <p className="text-xs text-emerald-400 font-mono">
                    Official UK Driving Tuition Gift Certificate
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-xs text-slate-400">VOUCHER VALUE</div>
                <div className="font-mono text-2xl font-extrabold text-white">
                  {hours} Hours Tuition
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase">
                  {transmission} Transmission
                </span>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="space-y-6 text-center my-6">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                This Certificate Entitles
              </div>

              <div className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight border-b border-slate-800 pb-3 max-w-md mx-auto">
                {recipient || 'Recipient Name'}
              </div>

              <div className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto italic leading-relaxed py-2">
                &ldquo;{message || 'Your custom message here'}&rdquo;
              </div>

              <div className="text-xs text-slate-400">
                With best wishes from: <strong className="text-white">{sender || 'Sender Name'}</strong>
              </div>
            </div>

            {/* Hologram / Authentication Seal & Code */}
            <div className="border-t border-emerald-500/20 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-bold text-white block">DVSA Grade A Tuition</span>
                  <span className="text-[10px] text-slate-400">Valid at all UK test centres · 12 months</span>
                </div>
              </div>

              <div className="text-center sm:text-right font-mono bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">AUTHENTICATION CODE:</span>
                <span className="font-bold text-emerald-400 text-xs tracking-wider">
                  {voucherCode}
                </span>
              </div>
            </div>
          </div>

          {isPurchased && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-3 animate-in fade-in-50">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <strong>Voucher Ready!</strong> A digital copy has been generated with reference <span className="font-mono font-bold text-white">{voucherCode}</span>. Use the &apos;Print / Save Certificate&apos; button above or redeem via our booking portal.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

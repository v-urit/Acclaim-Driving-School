import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./button";

interface AccordionContextValue {
  openItem: string | null;
  toggleItem: (id: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  defaultValue,
  className,
  children,
  ...props
}) => {
  const [openItem, setOpenItem] = React.useState<string | null>(defaultValue || null);

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className={cn("divide-y divide-slate-800 border-y border-slate-800", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("py-2", className)} data-value={value} {...props}>
      {children}
    </div>
  );
};

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used inside Accordion");
  const isOpen = context.openItem === value;

  return (
    <button
      type="button"
      onClick={() => context.toggleItem(value)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-display font-medium text-slate-100 hover:text-emerald-400 transition-colors cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <span className="text-base font-semibold">{children}</span>
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
          isOpen && "rotate-180 text-emerald-400"
        )}
      />
    </button>
  );
};

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionContent: React.FC<AccordionContentProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used inside Accordion");
  const isOpen = context.openItem === value;

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "pb-4 pt-1 text-sm text-slate-400 leading-relaxed animate-in fade-in-50 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

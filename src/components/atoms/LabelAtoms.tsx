import type { ReactNode } from 'react';

export function Separator({ weight = 'normal' }: { weight?: 'normal' | 'heavy' | 'light' }) {
  const className = {
    light: 'border-t border-gray-300',
    normal: 'border-t-2 border-black',
    heavy: 'border-t-[3px] border-black',
  }[weight];

  return <div className={className} />;
}

export function HeaderBand({ children }: { children: ReactNode }) {
  return (
    <div>
      <Separator weight="heavy" />
      <div className="py-2 text-3xl font-bold text-center bg-gray-50">
        {children}
      </div>
      <Separator weight="heavy" />
    </div>
  );
}

export function Row({
  label,
  amount,
  percentDV,
  indent = false,
  bold = false,
}: {
  label: string;
  amount?: string;
  percentDV?: string | null;
  indent?: boolean;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-1 text-sm ${
        indent ? 'pl-4' : ''
      } ${bold ? 'font-bold' : ''}`}
    >
      <div className="flex-1">{label}</div>
      {amount && <div className="text-right pr-2 min-w-[60px]">{amount}</div>}
      {percentDV !== undefined && (
        <div className="text-right min-w-[50px] font-bold">
          {percentDV || ''}
        </div>
      )}
    </div>
  );
}

export function Title() {
  return (
    <div className="text-center py-3">
      <div className="text-2xl font-bold leading-tight">Nutrition Facts</div>
      <div className="text-2xl font-bold leading-tight">Valeur nutritive</div>
    </div>
  );
}

export function ServingLine({ text }: { text: string }) {
  return (
    <div className="py-2 text-sm">
      {text}
    </div>
  );
}

export function FootNote({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs text-gray-700 py-2 border-t border-gray-300">
      {children}
    </div>
  );
}

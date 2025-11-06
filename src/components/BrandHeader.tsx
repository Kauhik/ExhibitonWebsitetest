type BrandHeaderProps = {
  compact?: boolean;
};

const BrandHeader = ({ compact = false }: BrandHeaderProps) => (
  <header
    className={`text-center ${compact ? 'space-y-1' : 'space-y-2'} text-brand-primary`}
  >
    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
      Apple Developer Academy · Games Institute
    </p>
    <h1 className="text-2xl font-semibold leading-tight md:text-3xl">
      Apple Developer Academy Exhibition 2025
    </h1>
  </header>
);

export default BrandHeader;

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
        bg-accent text-white px-4 py-2 rounded-[var(--radius-md)]
        font-medium z-[100] transition-all
      "
    >
      Skip to content
    </a>
  );
}

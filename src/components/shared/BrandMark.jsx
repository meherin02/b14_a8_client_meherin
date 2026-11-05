export default function BrandMark({ className = "h-10 w-10" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <rect width="64" height="64" rx="17" fill="currentColor" />
      <path
        d="M20 44 44 20M23 20h21v21"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

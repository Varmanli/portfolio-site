export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-700">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="w-10 h-10 text-yellow-500 animate-spin"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M25 5a20 20 0 0 1 0 40V40a15 15 0 1 0 0-30V5z"
          />
        </svg>
        <p className="text-sm">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

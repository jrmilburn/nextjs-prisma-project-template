export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-white ${className}`}
      {...props}
    />
  )
}

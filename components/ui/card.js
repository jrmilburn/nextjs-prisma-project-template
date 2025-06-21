export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md ${className}`}>
      {children}
    </div>
  )
}

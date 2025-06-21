"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart3, Users, Settings, FileText, Calendar, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { getInitials } from "../getInitials"

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: "🏠" },
  { name: "Analytics", href: "/analytics", icon: "📈" },
  { name: "Users", href: "/users", icon: "🙋‍♂️" },
  { name: "Documents", href: "/documents", icon: "🗒️" },
  { name: "Calendar", href: "/calendar", icon: "🗓️" },
  { name: "Messages", href: "/messages", icon: "📩" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
]

export default function Sidebar({ user }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const initials = useMemo(() => getInitials(user), [user]);

  return (
    <aside
      className={`relative border-r border-gray-200 bg-white transition-all duration-300 ease-in-out h-full
                  ${collapsed ? "w-16" : "w-[var(--sidebar-w)]"}`}
    >

      {/* Navigation */}
      <nav className="p-3 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 pl-2 pr-4 py-2.5 rounded-lg transition-all duration-200 group relative
                ${
                  isActive ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
                ${collapsed ? "justify-right w-full" : ""}
              `}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>

              {!collapsed && <span className="font-medium">{item.name}</span>}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer
          ${collapsed ? "justify-center" : ""}
        `}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-medium text-sm">{initials}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

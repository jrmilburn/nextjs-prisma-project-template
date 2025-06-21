"use client"

import Link from "next/link"
import { useState } from "react"
import { Bell, Settings, User, LogOut, ChevronDown } from "lucide-react"
import { signOut } from "next-auth/react"
import { useMemo } from "react"
import { getInitials } from "./getInitials"

export default function TopBar({ user }) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const initials = useMemo(() => getInitials(user), [user]);

  return (
    <header className="fixed inset-x-0 top-0 z-30 h-[var(--topbar-h)] border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-none items-center justify-between px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🚀</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Starter</span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{initials}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {/* User dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-medium text-gray-900">{user.name || "User"}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-md">🧟</span>
                      <span className="text-sm text-gray-700">Profile</span>
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-md">⚙️</span>
                      <span className="text-sm text-gray-700">Settings</span>
                    </Link>

                    <hr className="my-2 border-gray-200" />

                    <button
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                      onClick={() => signOut()}
                    >
                      <LogOut className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Unauthenticated state - Sign in and Register buttons */
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-sm"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
          }}
        />
      )}
    </header>
  )
}

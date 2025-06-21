"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"

export default function Register() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const fd = new FormData(e.target)
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      setError((await res.json()).error)
      setIsLoading(false)
      return
    }

    router.push("/login?registered=1")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/80">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
            <p className="text-gray-600">Join us and start your journey today</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" required />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  required
                  minLength={6}
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            )}

            <Button disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                Sign in
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

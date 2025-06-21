"use client"

import { useState } from "react"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"

export default function RequestReset() {
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setErr(null)

    const email = new FormData(e.target).get("email")
    const res = await fetch("/api/reset-password/request", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      setErr((await res.json()).error)
      setIsLoading(false)
      return
    }

    setSent(true)
    setIsLoading(false)
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
            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot password?</h1>
            <p className="text-gray-600">No worries, we&apos;ll send you reset instructions</p>
          </div>

          {sent ? (
            <div className="text-center space-y-6">
              {/* Success state */}
              <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We&apos;ve sent a password reset link to your email address. The link is valid for 30 minutes.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Don&apos;t forget to check your spam folder!</p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  ← Back to login
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                </div>

                {/* Error message */}
                {err && (
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
                      <p className="text-sm font-medium text-red-800">{err}</p>
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
                      Sending...
                    </div>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <a
                  href="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  ← Back to login
                </a>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

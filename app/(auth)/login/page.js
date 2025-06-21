"use client"

import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"

export default function Login() {
  const params = useSearchParams()
  const [err, setErr] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setErr(null)

    const fd = new FormData(e.target)
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    })

    if (res?.error) {
      setErr(res.error)
      setIsLoading(false)
      return
    }

    window.location.href = "/dashboard"
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
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Success message */}
          {params.get("registered") && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm font-medium text-green-800">Account created successfully – you can sign in now</p>
              </div>
            </div>
          )}

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
                <Input id="password" name="password" type="password" placeholder="Enter your password" required />
              </div>
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
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="text-center">
              <a
                href="/reset-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Sign up
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

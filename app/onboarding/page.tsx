"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { currencyOptions, getCurrencyDisplay } from "@/utils/currencies"
import { Wallet, ArrowRight } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [name, setName] = useState("")
  const [initialBalance, setInitialBalance] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")
    if (onboardingCompleted) {
      router.replace("/home")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && initialBalance && selectedCurrency) {
    localStorage.setItem("onboardingCompleted", "true")
    localStorage.setItem("userName", name)
    localStorage.setItem("initialBalance", initialBalance.toString())
    localStorage.setItem("currency", selectedCurrency)
    setIsOnboardingComplete(true)
    router.push("/home")
    }
  }

  if (isOnboardingComplete) {
    return null
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Wallet className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to <br />
            <span className="text-5xl font-extrabold">Money Manager</span>
          </h1>

          <p className="text-white/80">
            Let's get started with your personal finance journey
          </p>
        </div>

        <Card className="rounded-2xl overflow-hidden border-none shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">
              Setup Your Account
            </CardTitle>
            <CardDescription>
              Enter your details to begin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Initial Balance
                </label>
                <div className="flex space-x-2">
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="w-[120px] rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <SelectValue>
                        {getCurrencyDisplay(selectedCurrency)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {currencyOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="flex items-center space-x-2"
                        >
                          <span className="font-medium">{getCurrencyDisplay(option.value)}</span>
                          <span className="text-gray-500 dark:text-gray-400 ml-2">({option.name})</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    placeholder="Enter amount"
                    className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-500 flex-1"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 h-12"
              >
                <span className="mr-2">
                  Get Started
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

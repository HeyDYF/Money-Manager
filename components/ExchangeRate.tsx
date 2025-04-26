"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRightLeft, RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
import { currencyOptions, getCurrencyDisplay } from "../utils/currencies"
import { motion, AnimatePresence } from "framer-motion"

interface ExchangeRateData {
  fromCurrency: string
  toCurrency: string
  rate: number
  lastUpdated: string
  change24h: number
}

interface ApiResponse {
  result: string
  time_last_update_utc: string
  conversion_rates: Record<string, number>
}

export function ExchangeRate() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [amount, setAmount] = useState("1")
  const [convertedAmount, setConvertedAmount] = useState("")
  const [exchangeData, setExchangeData] = useState<ExchangeRateData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchExchangeRate = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("https://v6.exchangerate-api.com/v6/5a035ccc10e0d43977a2fc50/latest/USD")
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }

      const data: ApiResponse = await response.json()
      if (data.result !== "success") {
        throw new Error("Failed to get exchange rates")
      }

      const rates = data.conversion_rates
      const fromRate = fromCurrency === "USD" ? 1 : rates[fromCurrency]
      const toRate = toCurrency === "USD" ? 1 : rates[toCurrency]
      const rate = toRate / fromRate

      const mockData: ExchangeRateData = {
        fromCurrency,
        toCurrency,
        rate,
        lastUpdated: data.time_last_update_utc,
        change24h: (Math.random() - 0.5) * 2 // 由于API不提供24小时变化数据，暂时使用随机值
      }
      setExchangeData(mockData)
      setConvertedAmount((Number(amount) * mockData.rate).toFixed(2))
    } catch (err) {
      setError("Failed to fetch exchange rate")
      console.error("Error fetching exchange rates:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExchangeRate()
  }, [fromCurrency, toCurrency])

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    if (exchangeData) {
      setConvertedAmount((Number(value) * exchangeData.rate).toFixed(2))
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border-none shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              Currency Exchange
            </CardTitle>
            <CardDescription className="text-white/80">
              Real-time exchange rates
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={fetchExchangeRate}
            disabled={isLoading}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              From
            </label>
            <div className="flex space-x-2">
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[120px] rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <SelectValue>
                    {getCurrencyDisplay(fromCurrency)}
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
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-500 flex-1"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              To
            </label>
            <div className="flex space-x-2">
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[120px] rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <SelectValue>
                    {getCurrencyDisplay(toCurrency)}
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
                type="text"
                value={convertedAmount}
                readOnly
                className="rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-1"
              />
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full rounded-xl border-gray-200 dark:border-gray-700"
          onClick={handleSwapCurrencies}
        >
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Swap Currencies
        </Button>

        <AnimatePresence>
          {exchangeData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Exchange Rate
                </span>
                <span className="font-medium">
                  1 {fromCurrency} = {exchangeData.rate.toFixed(4)} {toCurrency}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  24h Change
                </span>
                <span className={`flex items-center font-medium ${
                  exchangeData.change24h >= 0 ? "text-green-500" : "text-red-500"
                }`}>
                  {exchangeData.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(exchangeData.change24h).toFixed(2)}%
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Last updated: {new Date(exchangeData.lastUpdated).toLocaleString()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { currencySymbols, currencyOptions } from "@/utils/currencies"
import { motion } from "framer-motion"

interface BalanceDisplayProps {
  balance: number
  currency: string
  onUpdateBalance: (newBalance: number, newCurrency: string) => void
  onAddTransaction: () => void
  recentChange?: {
    amount: number
    type: "increase" | "decrease"
  }
  
}

export default function BalanceDisplay({
  balance,
  currency,
  onUpdateBalance,
  onAddTransaction,
  recentChange

}: BalanceDisplayProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newBalance, setNewBalance] = useState(balance.toString())
  const [newCurrency, setNewCurrency] = useState(currency)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateBalance(Number(newBalance), newCurrency)
    setIsDialogOpen(false)
  }

  const currencySymbol = currencySymbols[currency] || currency

  return (
    <motion.div
      className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-lg opacity-80 mb-2">
          Main Account · {currency}
        </h2>
        <motion.div
          className="text-5xl font-bold mb-4"
          onClick={() => setIsDialogOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currencySymbol}
          {balance.toFixed(2)}
        </motion.div>
        <Button
          variant="ghost"
          className="rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          Account
        </Button>
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 hover:text-white mb-2"
            onClick={onAddTransaction}
          >
            <Plus className="h-6 w-6" />
          </Button>
          <p className="text-sm">Add</p>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[90%] rounded-3xl">
          <DialogHeader>
            <DialogTitle>Update Balance</DialogTitle>
            <DialogHeader>
              <DialogDescription>
                Modify your account balance and currency
              </DialogDescription>
            </DialogHeader>

          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              placeholder="Enter new balance"
              className="rounded-xl ios-input "
              required

            />
            <Select value={newCurrency} onValueChange={setNewCurrency}>
              <SelectTrigger className="rounded-xl ios-input">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.symbol} - {option.value} - {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full rounded-full ios-button bg-purple-500 hover:bg-purple-600">
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

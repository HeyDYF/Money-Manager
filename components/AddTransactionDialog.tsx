"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Transaction, TransactionCategory } from "@/utils/transaction"
import { ShoppingBag, Utensils, Bus, Film, MoreHorizontal } from "lucide-react"

const categories = [
  { value: "Shopping", label: "Shopping", icon: ShoppingBag },
  { value: "Restaurants", label: "Restaurants", icon: Utensils },
  { value: "Transport", label: "Transport", icon: Bus },
  { value: "Entertainment", label: "Entertainment", icon: Film },
  { value: "Other", label: "Other", icon: MoreHorizontal },
] as const

interface AddTransactionDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void
}

export default function AddTransactionDialog({ isOpen, onClose, onAddTransaction }: AddTransactionDialogProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [category, setCategory] = useState<TransactionCategory>("Shopping")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTransaction({
      name,
      amount: Number(amount),
      type,
      category,
      date: new Date(date).toISOString(),
      description,
    })
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setAmount("")
    setType("expense")
    setCategory("Shopping")
    setDate("")
    setDescription("")
  }

  return (
    <Dialog  open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] rounded-2xl" >
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new transaction to your wallet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Transaction name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Select value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Transaction type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          {type === "expense" && (
            <Select value={category} onValueChange={(value: TransactionCategory) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ value, label, icon: Icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center">
                      <Icon className="mr-2 h-4 w-4 " />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
            Add Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

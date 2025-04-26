"use client"

import { useState } from "react"
import type { Transaction } from "../hooks/useTransactions"
import { ArrowDownIcon, ArrowUpIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { currencySymbols } from "../utils/currencies"

type TransactionCategory = string

interface TransactionListProps {
  transactions: Transaction[]
  onUpdateTransaction: (updatedTransaction: Transaction) => void
  onDeleteTransaction: (id: string) => void
  categories: { value: TransactionCategory; label: string; icon: any }[]
  currency: string
}

export default function TransactionList({
  transactions,
  onUpdateTransaction,
  onDeleteTransaction,
  categories,
  currency,
}: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTransaction) {
      onUpdateTransaction(editingTransaction)
      setEditingTransaction(null)
    }
  }

  return (
    <div className="space-y-4 px-2">
      <h2 className="text-xl font-semibold px-1">Transaction History</h2>
      {transactions.length === 0 ? (
        <motion.p
          className="text-center text-muted-foreground p-4 bg-card rounded-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          No transactions yet
        </motion.p>
      ) : (
        <div className="h-[calc(100vh-300px)] overflow-y-auto  scrollbar-hide">
          <AnimatePresence>
            <motion.ul className="space-y-3">
              {transactions.map((transaction) => (
                <motion.li
                  key={transaction.id}
                  className="bg-card rounded-xl p-4 card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  layout
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-full ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUpIcon className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{transaction.name}</p>
                        {transaction.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{transaction.description}</p>
                        )}
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                          {transaction.category && (
                            <>
                              <span>•</span>
                              <span className="capitalize">{transaction.category}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {transaction.type === "income" ? "+" : "-"}
                        {currencySymbols[currency] || currency}
                        {transaction.amount.toFixed(2)}
                      </p>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg hover:bg-secondary"
                          onClick={() => handleEditClick(transaction)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg hover:bg-secondary"
                          onClick={() => onDeleteTransaction(transaction.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      )}

      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <Input
                value={editingTransaction.name}
                onChange={(e) => setEditingTransaction({ ...editingTransaction, name: e.target.value })}
                placeholder="Transaction name"
                className="rounded-xl"
              />
              <Input
                type="number"
                value={editingTransaction.amount}
                onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: Number(e.target.value) })}
                placeholder="Amount"
                className="rounded-xl"
              />
              <Select
                value={editingTransaction.type}
                onValueChange={(value: "income" | "expense") =>
                  setEditingTransaction({ ...editingTransaction, type: value })
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={editingTransaction.date.split("T")[0]}
                onChange={(e) =>
                  setEditingTransaction({ ...editingTransaction, date: new Date(e.target.value).toISOString() })
                }
                className="rounded-xl"
              />
              <Textarea
                value={editingTransaction.description || ""}
                onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
                placeholder="Description (optional)"
                className="rounded-xl"
              />
              {editingTransaction.type === "expense" && (
                <Select
                  value={editingTransaction.category}
                  onValueChange={(value: TransactionCategory) =>
                    setEditingTransaction({ ...editingTransaction, category: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(({ value, label, icon: Icon }) => (
                      <SelectItem key={value} value={value}>
                        <div className="flex items-center">
                          <Icon className="mr-2 h-4 w-4" />
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button type="submit" className="w-full rounded-xl">
                Update Transaction
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

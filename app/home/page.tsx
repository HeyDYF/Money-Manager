"use client"

import { useState } from "react"
import { useTransactions, type Transaction } from "@/hooks/useTransactions"
import BalanceDisplay from "@/components/BalanceDisplay"
import { MobileHeader } from "@/components/MobileHeader"
import { BottomNav } from "@/components/BottomNav"
import TransactionList from "@/components/TransactionList"
import AddTransactionDialog from "@/components/AddTransactionDialog"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const {
    balance,
    currency,
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setInitialBalance,
  } = useTransactions()
  // const { toast } = useToast()

  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [recentChange, setRecentChange] = useState<{ amount: number; type: "increase" | "decrease" } | undefined>()
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    addTransaction(transaction)
    setRecentChange({
      amount: transaction.amount,
      type: transaction.type === "income" ? "increase" : "decrease",
    })
  }

  const updateBalance = (newBalance: number, newCurrency: string) => {
    setInitialBalance(newBalance, newCurrency)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase())
  }

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchTerm) ||
      transaction.description?.toLowerCase().includes(searchTerm) ||
      transaction.amount.toString().includes(searchTerm),
  )

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 pb-20">
      <MobileHeader onSearch={handleSearch} />

      <BalanceDisplay
        balance={balance}
        currency={currency}
        onUpdateBalance={updateBalance}
        onAddTransaction={() => setIsAddTransactionOpen(true)}
        recentChange={recentChange}
      />

      <motion.div
        className="p-4 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {sortedTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">
                    {searchTerm ? "No matching transactions found" : "No transactions yet"}
                  </p>
                  <Button onClick={() => setIsAddTransactionOpen(true)} className="ios-button">
                    Add Transaction
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <TransactionList
                transactions={sortedTransactions}
                onUpdateTransaction={updateTransaction}
                onDeleteTransaction={deleteTransaction}
                currency={currency}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <BottomNav />

      <AddTransactionDialog
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </main>
  )
}

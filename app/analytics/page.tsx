"use client"

import { useTransactions } from "../../hooks/useTransactions"
import Link from "next/link"
import { MobileHeader } from "../../components/MobileHeader"
import { BottomNav } from "../../components/BottomNav"
import { ArrowLeft } from "lucide-react"
import TransactionAnalytics from "@/components/TransactionAnalytics"
import { useState } from "react"
import { TransactionCategory } from "@/utils/transaction"
export default function AnalyticsPage() {
  const { transactions, currency } = useTransactions()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 pb-20">
      <MobileHeader onSearch={setSearchTerm} />
      <div className="pt-24 px-6">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Expense Analytics</h1>
        </div>

        <TransactionAnalytics 
          transactions={transactions.map(t => ({
            ...t,
            category: t.category as TransactionCategory
          }))} 
          currency={currency} 
        />
      </div>
      <BottomNav />
    </main>
  )
}

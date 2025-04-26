"use client"

import { useTransactions } from "@/hooks/useTransactions"
import { MobileHeader } from "@/components/MobileHeader"
import { BottomNav } from "@/components/BottomNav"
import { ExchangeRate } from "@/components/ExchangeRate"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ExchangePage() {
  const { currency } = useTransactions()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 pb-20">
      <MobileHeader onSearch={setSearchTerm} />

      <div className="pt-24 px-4">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Exchange Rates</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ExchangeRate />
        </motion.div>
      </div>

      <BottomNav />
    </main>
  )
} 
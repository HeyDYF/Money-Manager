import { useState, useMemo } from "react"
import type { Transaction } from "../hooks/useTransactions"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pie, Bar } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

interface TransactionAnalyticsProps {
  transactions: Transaction[]
}

export default function TransactionAnalytics({ transactions }: TransactionAnalyticsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [timeRange, setTimeRange] = useState("all")

  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [transactions, searchTerm])

  const getTransactionsInRange = (days: number) => {
    const now = new Date()
    const rangeStart = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    return filteredTransactions.filter((t) => new Date(t.date) >= rangeStart)
  }

  const transactionsInRange = useMemo(() => {
    switch (timeRange) {
      case "day":
        return getTransactionsInRange(1)
      case "week":
        return getTransactionsInRange(7)
      case "month":
        return getTransactionsInRange(30)
      case "year":
        return getTransactionsInRange(365)
      default:
        return filteredTransactions
    }
  }, [filteredTransactions, timeRange, getTransactionsInRange]) // Added getTransactionsInRange to dependencies

  const totalIncome = transactionsInRange.reduce((sum, t) => (t.type === "income" ? sum + t.amount : sum), 0)
  const totalExpense = transactionsInRange.reduce((sum, t) => (t.type === "expense" ? sum + t.amount : sum), 0)

  const pieChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#10B981", "#EF4444"],
        hoverBackgroundColor: ["#059669", "#DC2626"],
      },
    ],
  }

  const barChartData = {
    labels: transactionsInRange.map((t) => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: "Income",
        data: transactionsInRange.map((t) => (t.type === "income" ? t.amount : 0)),
        backgroundColor: "#10B981",
      },
      {
        label: "Expense",
        data: transactionsInRange.map((t) => (t.type === "expense" ? t.amount : 0)),
        backgroundColor: "#EF4444",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Input
          placeholder="Search transactions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Income vs Expense</h3>
          <Pie data={pieChartData} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

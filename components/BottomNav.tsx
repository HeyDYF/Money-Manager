"use client"

import { Home, BarChart, DollarSign } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/home",
    },
    {
      icon: BarChart,
      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: DollarSign,
      label: "Exchange",
      href: "/exchange",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 ${isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
                }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

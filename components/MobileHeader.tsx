"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, User, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { Separator } from "@/components/ui/separator"

interface MobileHeaderProps {
  onSearch: (term: string) => void
}

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    const name = localStorage.getItem("userName")
    if (name) {
      setUserName(name)
    }
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center px-4 py-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 rounded-full bg-gray-100 dark:bg-gray-700 border-none"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2 rounded-full">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-xl">Welcome, {userName}!</SheetTitle>
              <SheetDescription>
                Manage your account settings and preferences here.
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Theme</h3>
                <ThemeSwitcher />
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Customize your experience with light, dark, or system theme.
                </p>
              </div>
              <Separator className="my-4" />
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

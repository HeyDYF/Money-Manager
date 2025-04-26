import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Money Manager",
  description: "A simple and elegant personal finance management app",
  icons: {
    icon: [
      {
        url: "/coin.svg",
        sizes: "any",
      },
      {
        url: "/coin.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    apple: {
      url: "/coin.svg",
      sizes: "any",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

"use client"

import type React from "react"

import { useEffect } from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Set the document direction to RTL for Hebrew
    document.documentElement.dir = "rtl"
  }, [])

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <title>אקדליסט - מאגר עבודות אקדמיות</title>
        <meta name="description" content="מאגר עבודות אקדמיות לסטודנטים וחוקרים" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

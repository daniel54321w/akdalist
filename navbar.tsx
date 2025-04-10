"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { href: "/", label: "דף הבית" },
    { href: "/categories", label: "עיון בעבודות" },
    { href: "/guides", label: "מדריכים" },
    { href: "/about", label: "אודות" },
    { href: "/sell", label: "הצטרפות ככותב" },
    { href: "/contact", label: "צור קשר" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white shadow-sm transition-all duration-300 ${
        scrolled ? "py-1 md:py-2 shadow-md" : "py-2 md:py-3"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">פתח תפריט</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="mt-6 mb-8">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <img src="/images/akdalist-logo.png" alt="אקדליסט" className="h-10 w-auto" />
                </Link>
              </div>
              <nav className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="חיפוש עבודות..."
                      className="pr-10 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex flex-col gap-2">
                  <Link
                    href="/auth"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    התחברות / הרשמה
                  </Link>
                  <Link
                    href="/faq"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    שאלות נפוצות
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center mr-2 md:mr-4 group">
            <div className="overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
              <img src="/images/akdalist-logo.png" alt="אקדליסט" className="h-8 md:h-10 w-auto" />
            </div>
            <span className="mr-2 text-lg md:text-xl font-bold group-hover:text-green-600 transition-colors">
              אקדליסט
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 space-x-reverse">
          <div className="relative ml-4">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="חיפוש עבודות..."
              className="w-[200px] pr-10 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <nav className="flex items-center space-x-6 space-x-reverse">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-green-600 transition-colors relative after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2 space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/auth">התחברות / הרשמה</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">הפרופיל שלי</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/faq">שאלות נפוצות</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/images/akdalist-logo.png" alt="אקדליסט" className="h-8 md:h-10 w-auto" />
              <h3 className="text-lg md:text-xl font-bold mr-2">אקדליסט</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              מאגר עבודות אקדמיות איכותיות במגוון תחומים לסטודנטים, חוקרים וכותבים אקדמיים
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-base md:text-lg font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> דף הבית
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> עיון בעבודות
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> מדריכים
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> אודות
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> הצטרפות ככותב
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> צור קשר
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-base md:text-lg font-bold mb-4">עזרה ותמיכה</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> שאלות נפוצות
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> חיפוש מתקדם
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> התחברות / הרשמה
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center text-sm md:text-base"
                >
                  <span className="ml-1">›</span> אזור אישי
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-base md:text-lg font-bold mb-4">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="ml-2 h-4 w-4 md:h-5 md:w-5 text-green-600" />
                <span className="text-gray-600 text-sm md:text-base">052-689-8662</span>
              </li>
              <li className="flex items-center">
                <Mail className="ml-2 h-4 w-4 md:h-5 md:w-5 text-green-600" />
                <span className="text-gray-600 text-sm md:text-base">ortech2021@gmail.com</span>
              </li>
              <li className="mt-4">
                <Link
                  href="/contact"
                  className="bg-green-600 hover:bg-green-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md transition-colors inline-block text-sm md:text-base"
                >
                  שלח הודעה
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} אקדליסט. כל הזכויות שמורות.
          </p>
          <div className="flex space-x-4 md:space-x-6 space-x-reverse">
            <Link href="/terms" className="text-gray-500 text-xs md:text-sm hover:text-green-600 transition-colors">
              תנאי שימוש
            </Link>
            <Link href="/privacy" className="text-gray-500 text-xs md:text-sm hover:text-green-600 transition-colors">
              מדיניות פרטיות
            </Link>
            <Link href="/faq" className="text-gray-500 text-xs md:text-sm hover:text-green-600 transition-colors">
              שאלות נפוצות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

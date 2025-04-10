"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Upload, Check, ArrowRight, AlertCircle, X } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { z } from "zod"

// Schema for form validation
const sellerFormSchema = z.object({
  name: z.string().min(2, { message: "שם חייב להכיל לפחות 2 תווים" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  title: z.string().min(5, { message: "כותרת העבודה חייבת להכיל לפחות 5 תווים" }),
  summary: z.string().min(20, { message: "תקציר העבודה חייב להכיל לפחות 20 תווים" }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "עליך לאשר את תנאי השימוש" }),
  }),
})

export default function SellPage() {
  const { toast } = useToast()
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState("")
  const [fileError, setFileError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    summary: "",
    terms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ]
    const maxSize = 20 * 1024 * 1024 // 20MB

    if (!validTypes.includes(file.type)) {
      setFileError("סוג הקובץ אינו נתמך. אנא העלה קובץ PDF, Word או PowerPoint")
      return false
    }

    if (file.size > maxSize) {
      setFileError("גודל הקובץ חורג מהמותר (20MB)")
      return false
    }

    setFileError("")
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        setFileName(file.name)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        setFileName(file.name)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }))

    // Clear error when user checks
    if (errors.terms) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.terms
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form data
      sellerFormSchema.parse(formData)

      // Check if file is uploaded
      if (!fileName) {
        setFileError("נא להעלות קובץ")
        throw new Error("File is required")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success
      setIsSuccess(true)
      toast({
        title: "העבודה נשלחה בהצלחה",
        description: "העבודה שלך התקבלה ותיבדק על ידי הצוות שלנו בקרוב",
        variant: "default",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        title: "",
        summary: "",
        terms: false,
      })
      setFileName("")

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)

        toast({
          title: "שגיאה בשליחת הטופס",
          description: "אנא תקן את השגיאות המסומנות",
          variant: "destructive",
        })
      } else {
        toast({
          title: "שגיאה בשליחת הטופס",
          description: "אירעה שגיאה בלתי צפויה. אנא נסה שוב מאוחר יותר",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      title: "",
      summary: "",
      terms: false,
    })
    setFileName("")
    setFileError("")
    setErrors({})
    setIsSuccess(false)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Toaster />

      <section className="py-12 px-4 relative">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/sell-banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">הצטרפות ככותב באקדליסט</h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              יש לך עבודות אקדמיות איכותיות? הצטרף אלינו ומכור את העבודות שלך באמצעות הפלטפורמה שלנו
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: 1,
                title: "העלאת העבודה",
                description: "העלה את העבודה האקדמית שלך עם תקציר ופרטים רלוונטיים",
                delay: 0.1,
              },
              {
                step: 2,
                title: "אישור ופרסום",
                description: "הצוות שלנו יבדוק את העבודה ויפרסם אותה באתר לאחר אישור",
                delay: 0.2,
              },
              {
                step: 3,
                title: "קבלת תשלום",
                description: "קבל תשלום על כל מכירה של העבודה שלך דרך הפלטפורמה",
                delay: 0.3,
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                        <span className="text-2xl font-bold text-green-600">{item.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">טופס הגשת עבודה</h2>

                {isSuccess ? (
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">העבודה נשלחה בהצלחה!</h3>
                    <p className="text-gray-600 mb-4">
                      תודה שהגשת את העבודה שלך. הצוות שלנו יבדוק אותה ויצור איתך קשר בהקדם.
                    </p>
                    <Button onClick={resetForm} className="bg-green-600 hover:bg-green-500">
                      הגשת עבודה נוספת
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">שם מלא</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="הכנס את שמך המלא"
                          className={`transition-all duration-300 ${
                            errors.name
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "focus:border-green-500 focus:ring-green-500"
                          }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">דוא״ל</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="הכנס את כתובת הדוא״ל שלך"
                          className={`transition-all duration-300 ${
                            errors.email
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "focus:border-green-500 focus:ring-green-500"
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">כותרת העבודה</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="הכנס את כותרת העבודה"
                        className={`transition-all duration-300 ${
                          errors.title
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-green-500 focus:ring-green-500"
                        }`}
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">תקציר העבודה</Label>
                      <Textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        placeholder="כתוב תקציר קצר של העבודה"
                        rows={5}
                        className={`transition-all duration-300 ${
                          errors.summary
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-green-500 focus:ring-green-500"
                        }`}
                      />
                      {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>העלאת קובץ העבודה</Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                          fileError
                            ? "border-red-500 bg-red-50"
                            : dragActive
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:bg-gray-50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={handleChange}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          {fileName ? (
                            <div className="flex flex-col items-center">
                              <div className="bg-green-100 p-3 rounded-full mb-4">
                                <Check className="h-8 w-8 text-green-600" />
                              </div>
                              <p className="text-green-600 font-medium mb-2">הקובץ הועלה בהצלחה</p>
                              <p className="text-gray-600">{fileName}</p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setFileName("")
                                }}
                                className="mt-2 text-gray-500 hover:text-red-500 flex items-center text-sm"
                              >
                                <X className="h-4 w-4 mr-1" />
                                הסר קובץ
                              </button>
                            </div>
                          ) : (
                            <>
                              {fileError ? (
                                <div className="flex flex-col items-center">
                                  <div className="bg-red-100 p-3 rounded-full mb-4">
                                    <AlertCircle className="h-8 w-8 text-red-600" />
                                  </div>
                                  <p className="text-red-600 font-medium mb-2">{fileError}</p>
                                  <p className="text-gray-400 text-sm">לחץ להעלאת קובץ או גרור לכאן</p>
                                </div>
                              ) : (
                                <>
                                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                  <p className="text-gray-600 mb-2">לחץ להעלאת קובץ או גרור לכאן</p>
                                  <p className="text-gray-400 text-sm">PDF, Word או PowerPoint (מקסימום 20MB)</p>
                                </>
                              )}
                            </>
                          )}
                        </label>
                      </div>
                      {fileError && !fileName && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
                    </div>

                    <div className="flex items-start space-x-2 space-x-reverse">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={handleCheckboxChange}
                        className={errors.terms ? "border-red-500 text-red-500" : ""}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="terms" className={`text-sm font-normal ${errors.terms ? "text-red-500" : ""}`}>
                          אני מאשר/ת כי העבודה היא שלי וברשותי הזכויות המלאות עליה, ואני מסכים/ה לתנאי השימוש של אקדליסט
                        </Label>
                        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-500 text-white py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                          שולח...
                        </>
                      ) : (
                        <>
                          שליחת העבודה
                          <ArrowRight className="mr-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">מה אומרים עלינו הכותבים?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "דניאל כהן",
                  role: "סטודנט לפסיכולוגיה",
                  image: "/images/testimonials/person1.jpg",
                  quote: "מכרתי כבר 5 עבודות דרך אקדליסט. התהליך פשוט והתשלום הוגן. ממליץ בחום!",
                },
                {
                  name: "מיכל לוי",
                  role: "בוגרת תואר שני במשפטים",
                  image: "/images/testimonials/person2.jpg",
                  quote: "אקדליסט נתנה לי הזדמנות להרוויח מהידע שצברתי במהלך התואר. שירות מעולה ותמיכה מקצועית.",
                },
                {
                  name: "אלון ברק",
                  role: "דוקטורנט לחינוך",
                  image: "/images/testimonials/person3.jpg",
                  quote: "הפלטפורמה מאפשרת לי להגיע לקהל רחב של סטודנטים ולשתף את המחקרים שלי. מומלץ!",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/images/testimonials/default.jpg"
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

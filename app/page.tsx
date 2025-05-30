"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Phone,
  Mic,
  MessageSquare,
  Calendar,
  Globe,
  UserPlus,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import NucleusLogoAnimation from "@/components/ui/nucleus-logo-animation"
import { AnimatedMenuBar } from "@/components/ui/animated-menu-bar"
import DynamicFrameLayout, { FrameConfig } from "@/components/ui/DynamicFrameLayout"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "24/7 Call Handling",
      description: "Never miss a call with our AI receptionist answering around the clock.",
      icon: <Phone className="size-5" />,
    },
    {
      title: "Natural Voice AI",
      description: "Engage callers with a human-like voice that understands and responds naturally.",
      icon: <Mic className="size-5" />,
    },
    {
      title: "Call Routing & Transfer",
      description: "Direct calls to the right person or department effortlessly.",
      icon: <ArrowRight className="size-5" />,
    },
    {
      title: "Message Taking",
      description: "Capture important messages and get notified instantly.",
      icon: <MessageSquare className="size-5" />,
    },
    {
      title: "Appointment Scheduling",
      description: "Let your AI receptionist handle appointment bookings and confirmations.",
      icon: <Calendar className="size-5" />,
    },
    {
      title: "Multi-Language Support",
      description: "Serve a global audience with AI that speaks multiple languages.",
      icon: <Globe className="size-5" />,
    },
  ]

  const featuresPane1 = features.slice(0, Math.ceil(features.length / 2))
  const featuresPane2 = features.slice(Math.ceil(features.length / 2))

  const frameContents: FrameConfig[] = [
    {
      id: 1,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto p-6 h-full flex flex-col justify-center items-center"
        >
          <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            AI Receptionist
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Get A Free AI Receptionist
          </h1>
          <p className="text-md md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Automate calls, take messages, schedule appointments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="rounded-full h-11 px-6 text-sm" asChild>
              <Link href="http://localhost:3001/signup" target="_blank">
                Activate Now
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-11 px-6 text-sm" asChild>
              <Link href="http://localhost:3001/demo-feature" target="_blank">
                Listen to Demo
              </Link>
            </Button>
          </div>
        </motion.div>
      ),
      defaultPos: { x: 0, y: 0, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",
    },
    {
      id: 2,
      content: (
        <div className="w-full h-full flex items-center justify-center bg-muted/20 p-2">
          <Image
            src="https://images.unsplash.com/photo-1517976455488-1c3f07593839?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
            width={1280}
            height={720}
            alt="AI Receptionist on Phone"
            className="w-full h-full object-contain rounded-md shadow-lg"
          />
        </div>
      ),
      defaultPos: { x: 4, y: 0, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_corner_update.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_vert_update.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_hori_update.png",
    },
    {
      id: 3,
      content: (
        <div className="p-6 h-full flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium text-muted-foreground mb-3">Trusted by innovative companies</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                src={`/placeholder-logo.svg`}
                alt={`Company logo ${i}`}
                width={80}
                height={40}
                className="h-6 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      ),
      defaultPos: { x: 8, y: 0, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Corner_update.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_hori_update.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Vert_update.png",
    },
    {
      id: 4,
      content: (
        <div className="p-4 md:p-6 h-full overflow-y-auto">
          <h3 className="text-xl font-semibold mb-3 text-center">Core Features</h3>
          <div className="grid gap-3 sm:grid-cols-1">
            {featuresPane1.map((feature, i) => (
              <Card key={i} className="bg-background/70 backdrop-blur-sm">
                <CardContent className="p-3 flex items-start gap-2">
                  <div className="size-7 rounded-md bg-primary/10 flex items-center justify-center text-primary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
      defaultPos: { x: 0, y: 4, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_corner_update.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_hori_update.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_vert_update.png",
    },
    {
      id: 5,
      content: <NucleusLogoAnimation logoType="full" />,
      defaultPos: { x: 4, y: 4, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_corner_update.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_hori_update.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_verti_update.png",
      initialMediaSize: 0.8,
    },
    {
      id: 6,
      content: (
        <div className="p-4 md:p-6 h-full overflow-y-auto">
          <h3 className="text-xl font-semibold mb-3 text-center">More Features</h3>
          <div className="grid gap-3 sm:grid-cols-1">
            {featuresPane2.map((feature, i) => (
              <Card key={i} className="bg-background/70 backdrop-blur-sm">
                <CardContent className="p-3 flex items-start gap-2">
                  <div className="size-7 rounded-md bg-primary/10 flex items-center justify-center text-primary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
      defaultPos: { x: 8, y: 4, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner-1.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/1199340587e8da1d/6_vert.png",
    },
    {
      id: 7,
      content: (
        <div className="p-6 h-full flex flex-col items-center justify-center text-center">
          <Badge className="rounded-full px-3 py-1 text-xs mb-3" variant="secondary">
            How It Works
          </Badge>
          <h3 className="text-lg md:text-xl font-bold mb-2">Simple Process</h3>
          <div className="space-y-3">
            {[ "Create Account", "Configure Workspace", "Boost Productivity" ].map((step, i) => (
              <div key={i} className="flex items-center text-left gap-2 p-2 rounded-md bg-muted/50">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                  {`0${i+1}`}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      defaultPos: { x: 0, y: 8, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_corner.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_hori.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_vert.png",
    },
    {
      id: 8,
      content: (
        <div className="p-4 md:p-6 h-full overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3 text-center">Testimonials</h3>
          <div className="space-y-3">
            {[ { quote: "Game-changer for calls!", author: "J. Smith" }, { quote: "Impressive AI voice.", author: "A. Johnson" } ].map((testimonial, i) => (
              <Card key={i} className="bg-background/70 backdrop-blur-sm">
                <CardContent className="p-3">
                  <p className="text-sm italic mb-1">\"{testimonial.quote}\"</p>
                  <p className="text-xs text-muted-foreground text-right">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
      defaultPos: { x: 4, y: 8, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/981e483f71aa764b/8_corner.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/981e483f71aa764b/8_hori.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/981e483f71aa764b/8_verticle.png",
    },
    {
      id: 9,
      content: (
        <div className="p-4 md:p-6 h-full flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-semibold mb-2">Pricing Plans</h3>
          <p className="text-2xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
          <p className="text-xs text-muted-foreground mb-3">Starter Plan</p>
          <Button size="sm" className="rounded-full px-4" asChild>
            <Link href="http://localhost:3001/signup?plan=starter" target="_blank">
              Start Trial
            </Link>
          </Button>
        </div>
      ),
      defaultPos: { x: 8, y: 8, w: 4, h: 4 },
      cornerAsset: "https://static.cdn-luma.com/files/981e483f71aa764b/9_corner.png",
      edgeHorizontalAsset: "https://static.cdn-luma.com/files/981e483f71aa764b/9_hori.png",
      edgeVerticalAsset: "https://static.cdn-luma.com/files/981e483f71aa764b/9_vert.png",
    },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <AnimatedMenuBar />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="http://localhost:3001/login" target="_blank">
                <LogIn className="mr-2 size-4" /> Login
              </Link>
            </Button>
            <Button size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="http://localhost:3001/signup" target="_blank">
                <UserPlus className="mr-2 size-4" /> Sign Up
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full ml-2">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <div className="w-full h-[calc(100vh-4rem)] flex-grow">
          <DynamicFrameLayout 
            frameConfigs={frameContents} 
            showFrameVisualsInitially={true}
            autoplayModeInitially="hover"
          />
        </div>

        <section id="faq" className="w-full py-16 md:py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Find answers to common questions about our platform.
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How does the 14-day free trial work?",
                    answer:
                      "Our 14-day free trial gives you full access to all features of your selected plan. No credit card is required to sign up, and you can cancel at any time during the trial period with no obligation.",
                  },
                  {
                    question: "Can I change plans later?",
                    answer:
                      "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be prorated for the remainder of your billing cycle. If you downgrade, the new pricing will take effect at the start of your next billing cycle.",
                  },
                  {
                    question: "What kind of support do you offer?",
                    answer:
                      "Support varies by plan. All plans include email support, with the Professional plan offering priority email support. The Enterprise plan includes 24/7 phone and email support. We also have an extensive knowledge base and community forum available to all users.",
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to Transform Your Workflow?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Join thousands of satisfied customers who have streamlined their processes and boosted productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 text-base" asChild>
                  <Link href="http://localhost:3001/signup" target="_blank">
                    Start Free Trial
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="http://localhost:3001/schedule-demo" target="_blank">
                    Schedule a Demo
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80 mt-4">
                No credit card required. 14-day free trial.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <NucleusLogoAnimation logoType="n" size={32} />
                <span>Nucleus</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revolutionizing communication with AI-powered phone services.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Nucleus. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

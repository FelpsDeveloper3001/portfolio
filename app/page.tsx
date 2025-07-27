"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  Github,
  Mail,
  MessageCircle,
  ExternalLink,
  Code,
  Globe,
  ChevronDown,
  Menu,
  X,
  Star,
  GitFork,
  Calendar,
  MapPin,
  Coffee,
  Zap,
  Heart,
  ArrowUpRight,
  Construction,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

interface Client {
  id: number
  name: string
  company: string
  role: string
  avatar: string
  testimonial: string
  project: string
  rating: number
  date: string
  category: "discord" | "fivem" | "mta" | "web"
}

const technologies = [
  { name: "JavaScript", icon: "⚡", color: "from-yellow-400 to-orange-500", category: "Backend" },
  { name: "TypeScript", icon: "🔷", color: "from-blue-400 to-blue-600", category: "Backend" },
  { name: "PHP", icon: "🐘", color: "from-purple-400 to-purple-600", category: "Backend" },
  { name: "Lua", icon: "🌙", color: "from-indigo-400 to-purple-500", category: "Scripting" },
  { name: "MySQL", icon: "🐬", color: "from-blue-500 to-cyan-500", category: "Database" },
  { name: "MongoDB", icon: "🍃", color: "from-green-400 to-emerald-500", category: "Database" },
  { name: "Discord.js", icon: "💬", color: "from-indigo-500 to-purple-600", category: "Bot Development" },
  { name: "FiveM", icon: "🎮", color: "from-red-400 to-pink-500", category: "Game Development" },
  { name: "MTA", icon: "🏎️", color: "from-orange-400 to-red-500", category: "Game Development" },
]

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/FelpsDeveloper3001",
    color: "hover:text-white",
    bg: "hover:bg-gray-800",
  },
  {
    name: "Discord",
    icon: MessageCircle,
    url: "#",
    color: "hover:text-indigo-400",
    bg: "hover:bg-indigo-500/10",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:felpsdeveloper@outlook.com",
    color: "hover:text-emerald-400",
    bg: "hover:bg-emerald-500/10",
  },
]

const stats = [
  { label: "Anos de Experiência", value: "5+", icon: Calendar },
  { label: "Projetos Concluídos", value: "15+", icon: Code },
  { label: "Tecnologias", value: "9+", icon: Zap },
  { label: "Café Consumido", value: "∞", icon: Coffee },
]

const clients: Client[] = [
  {
    id: 1,
    name: "Marques Marcão",
    company: "New Group",
    role: "CO-Founder",
    avatar: "https://r2.fivemanage.com/3jGAFhPJ9JnoZBRPS1jFu/IMG_1143.jpg",
    testimonial: "Gostaria de expressar meu reconhecimento pelo trabalho do felps, um excelente trabalho que desempenhou o desenvolvendo bot para o servidor da New Group onde foi a peça chave para organização dos servidores discord do grupo. Desempenho excepcional cumprindo os prazos de entrega e fazendo bots com a maior qualidade!",
    project: "Bot New Group",
    rating: 5,
    date: "2024",
    category: "discord",
  },
  {
    id: 2,
    name: "Tio Sam",
    company: "Mirage Roleplay",
    role: "CEO",
    avatar: "/placeholder.svg?height=60&width=60",
    testimonial: "O Felps desenvolveu scripts incríveis para nosso servidor FiveM. O sistema de economia e jobs ficou perfeito, exatamente como pedimos. Recomendo muito!",
    project: "Cidade no FiveM",
    rating: 5,
    date: "2024",
    category: "fivem",
  },
  {
    id: 3,
    name: "Branca",
    company: "Mirage Roleplay",
    role: "CEO",
    avatar: "/placeholder.svg?height=60&width=60",
    testimonial: "Trabalho de qualidade excepcional! Os scripts para nosso servidor FiveM superaram todas as expectativas. Sistema de policiais e mecânicos funcionando perfeitamente.",
    project: "Cidade no FiveM",
    rating: 5,
    date: "2024",
    category: "fivem",
  },
  {
    id: 4,
    name: "Ueli Shihōin",
    company: "Império",
    role: "CEO",
    avatar: "https://r2.fivemanage.com/3jGAFhPJ9JnoZBRPS1jFu/1753641363763.png",
    testimonial: "O trabalho do Felps superou todas as minhas expectativas. O bot que ele desenvolveu ficou excelente, funcionando perfeitamente e com uma qualidade impecável. Além disso, o preço foi super acessível. Recomendo demais!",
    project: "Bot Imperial",
    rating: 5,
    date: "2023",
    category: "discord",
  },
]

const clientCategories = [
  { name: "Todos", value: "all", icon: "👥", color: "from-gray-400 to-gray-600" },
  { name: "Discord", value: "discord", icon: "💬", color: "from-indigo-400 to-purple-600" },
  { name: "FiveM", value: "fivem", icon: "🎮", color: "from-red-400 to-pink-500" },
  { name: "MTA", value: "mta", icon: "🏎️", color: "from-orange-400 to-red-500" },
  { name: "Web", value: "web", icon: "🌐", color: "from-blue-400 to-cyan-500" },
]

export default function Portfolio() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredClients, setFilteredClients] = useState(clients)

  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)

  const heroInView = useInView(heroRef)
  const aboutInView = useInView(aboutRef)
  const projectsInView = useInView(projectsRef)

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const texts = ["Desenvolvedor de Bots Discord", "Criador de Scripts FiveM", "Programador MTA", "Full Stack Developer"]

  // Typing animation effect
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex]

        if (!isDeleting) {
          setCurrentText(current.substring(0, currentText.length + 1))

          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setCurrentText(current.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        console.log("Fetching GitHub repos...")

        const response = await fetch("/api/github", {
          cache: "no-store", // Force fresh request
        })

        console.log("Response status:", response.status)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("API Response:", data)

        if (data.error) {
          console.warn("GitHub API Error:", data.error)
          setError(data.error)
          setRepos([])
          return
        }

        if (Array.isArray(data) && data.length > 0) {
          console.log(`Successfully loaded ${data.length} repositories`)
          setRepos(data)
          setError(null)
        } else {
          console.log("No repositories found, using fallback")
          // Fallback repos when no real repos are found
          setRepos([
            {
              id: 1,
              name: "discord-bot-advanced",
              description: "Bot Discord avançado com comandos slash, sistema de economia e moderação automática",
              html_url: "https://github.com/FelpsDeveloper3001",
              language: "JavaScript",
              stargazers_count: 12,
              forks_count: 4,
              updated_at: new Date().toISOString(),
            },
            {
              id: 2,
              name: "fivem-roleplay-scripts",
              description: "Coleção completa de scripts para servidores FiveM de roleplay",
              html_url: "https://github.com/FelpsDeveloper3001",
              language: "Lua",
              stargazers_count: 8,
              forks_count: 3,
              updated_at: new Date().toISOString(),
            },
            {
              id: 3,
              name: "mta-racing-system",
              description: "Sistema completo de corridas para MTA San Andreas com ranking e recompensas",
              html_url: "https://github.com/FelpsDeveloper3001",
              language: "Lua",
              stargazers_count: 6,
              forks_count: 2,
              updated_at: new Date().toISOString(),
            },
            {
              id: 4,
              name: "web-dashboard-php",
              description: "Dashboard web em PHP para gerenciamento de servidores de jogos",
              html_url: "https://github.com/FelpsDeveloper3001",
              language: "PHP",
              stargazers_count: 5,
              forks_count: 1,
              updated_at: new Date().toISOString(),
            },
          ])
          setError(null)
        }
      } catch (err) {
        console.error("Error fetching repos:", err)
        setError(err instanceof Error ? err.message : "Erro ao carregar repositórios")
        // Set fallback repos even on error
        setRepos([
          {
            id: 1,
            name: "discord-bot-advanced",
            description: "Bot Discord avançado com comandos slash, sistema de economia e moderação automática",
            html_url: "https://github.com/FelpsDeveloper3001",
            language: "JavaScript",
            stargazers_count: 12,
            forks_count: 4,
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: "fivem-roleplay-scripts",
            description: "Coleção completa de scripts para servidores FiveM de roleplay",
            html_url: "https://github.com/FelpsDeveloper3001",
            language: "Lua",
            stargazers_count: 8,
            forks_count: 3,
            updated_at: new Date().toISOString(),
          },
          {
            id: 3,
            name: "mta-racing-system",
            description: "Sistema completo de corridas para MTA San Andreas com ranking e recompensas",
            html_url: "https://github.com/FelpsDeveloper3001",
            language: "Lua",
            stargazers_count: 6,
            forks_count: 2,
            updated_at: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      // Use EmailJS directly
      const emailjs = (window as any).emailjs

      if (!emailjs) {
        throw new Error("EmailJS não carregado")
      }

      await emailjs.send(
        "service_wfj1nxj",
        "template_4a6vtra",
        {
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          message: formData.get("message"),
          to_email: "felpsdeveloper@outlook.com",
        },
        "zhx90j2M0cKsx7yZm",
      )

      alert("Mensagem enviada com sucesso!")
      e.currentTarget.reset()
    } catch (error) {
      console.error("Error:", error)
      alert("Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.")
    }
  }

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor")
    if (!cursor) return

    let animationId: number
    let isVisible = false

    const updateCursorPosition = (e: MouseEvent) => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }

      animationId = requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`

        if (!isVisible) {
          cursor.classList.add("visible")
          isVisible = true
        }
      })
    }

    const handleMouseEnter = () => {
      cursor.classList.add("hover")
    }

    const handleMouseLeave = () => {
      cursor.classList.remove("hover", "click")
    }

    const handleMouseDown = () => {
      cursor.classList.add("click")
    }

    const handleMouseUp = () => {
      cursor.classList.remove("click")
    }

    const hideCursor = () => {
      cursor.classList.remove("visible")
      isVisible = false
    }

    // Only add on desktop devices
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (isDesktop && !prefersReducedMotion) {
      // Mouse movement
      document.addEventListener("mousemove", updateCursorPosition, { passive: true })
      document.addEventListener("mouseleave", hideCursor)

      // Mouse interactions
      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mouseup", handleMouseUp)

      // Interactive elements
      const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']")

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter)
        element.addEventListener("mouseleave", handleMouseLeave)
      })

      // Initial state
      cursor.style.opacity = "0"
    } else {
      // Hide on mobile/touch devices or when reduced motion is preferred
      cursor.style.display = "none"
    }

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseleave", hideCursor)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)

      const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']")
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })

      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  // Filter clients by category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredClients(clients)
    } else {
      const filtered = clients.filter((client) => client.category === selectedCategory)
      setFilteredClients(filtered)
    }
  }, [selectedCategory])

  // Load EmailJS
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    script.onload = () => {
      ;(window as any).emailjs.init("zhx90j2M0cKsx7yZm")
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Custom Cursor */}
      <div className="custom-cursor" id="custom-cursor" />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

        {/* Gradient Orbs */}
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, -200]),
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, 200]),
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          }}
          className="absolute top-1/2 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, -100]),
            y: useTransform(scrollYProgress, [0, 1], [0, 200]),
          }}
          className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
        />

        {/* Optimized Mouse Follower */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="mouse-follower"></div>
        </div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              Felps.dev
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["inicio", "sobre", "clientes", "projetos", "tecnologias", "contato"].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-300 hover:text-white transition-all duration-300 capitalize relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-white/10"
            >
              {["inicio", "sobre", "clientes", "projetos", "tecnologias", "contato"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 text-gray-300 hover:text-white transition-colors capitalize"
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} id="inicio" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-8"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Disponível para novos projetos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Felps
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-4xl lg:text-5xl mb-8 h-16 flex items-center justify-center font-light"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {currentText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                className="text-purple-400 ml-1"
              >
                |
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Desenvolvedor apaixonado de <span className="text-white font-medium">16 anos</span>, especializado em
              criar
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                {" "}
                bots para Discord
              </span>
              ,
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium">
                {" "}
                scripts para FiveM
              </span>{" "}
              e
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-medium">
                {" "}
                sistemas para MTA
              </span>
              .
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projetos")}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Ver Projetos
                  <ArrowUpRight
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contato")}
                className="group px-8 py-4 border-2 border-red-500/30 rounded-2xl font-semibold text-lg hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300"
              >
                <span className="flex items-center gap-2 text-red-400">
                  Em Desenvolvimento
                  <Construction size={20} className="group-hover:rotate-12 transition-transform" />
                </span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-purple-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm">Scroll para explorar</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="sobre" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Sobre Mim</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Jovem desenvolvedor com paixão por tecnologia e inovação
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl font-bold">
                      F
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Felps</h3>
                      <p className="text-gray-400 flex items-center gap-1">
                        <MapPin size={14} />
                        Brasil
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Idade</span>
                      <span className="text-white font-semibold">16 anos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Experiência</span>
                      <span className="text-white font-semibold">2+ anos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Foco</span>
                      <span className="text-white font-semibold">Bots & Scripts</span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center"
                >
                  <Code className="w-8 h-8 text-blue-400" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center"
                >
                  <Heart className="w-6 h-6 text-pink-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Minha História</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Meu nome é Igor, mas todos me conhecem como Felps. Aos 16 anos, já tenho mais de 2 anos de experiência
                  em desenvolvimento. Comecei criando pequenos scripts e hoje desenvolvo sistemas completos para
                  comunidades de jogos e servidores Discord.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Especialidades
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Bots Discord com funcionalidades avançadas",
                    "Scripts e sistemas para FiveM",
                    "Desenvolvimento para MTA San Andreas",
                    "APIs e sistemas backend",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Objetivos
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Continuar evoluindo como desenvolvedor, criar soluções inovadoras e contribuir para a comunidade de
                  desenvolvedores brasileiros.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clientes" className="py-32 px-6 bg-gradient-to-b from-gray-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Clientes Satisfeitos
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Depoimentos reais de clientes que confiaram no meu trabalho
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {clientCategories.map((category, index) => (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.value
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Clients Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={client.avatar || "/placeholder.svg"}
                          alt={client.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                          <span className="text-xs">✓</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{client.name}</h3>
                        <p className="text-purple-400 font-medium">{client.company}</p>
                        <p className="text-gray-400 text-sm">{client.role}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < client.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                        />
                      ))}
                      <span className="text-gray-400 text-sm ml-2">{client.date}</span>
                    </div>

                    {/* Testimonial */}
                    <blockquote className="text-gray-300 leading-relaxed mb-6 flex-grow">
                      "{client.testimonial}"
                    </blockquote>

                    {/* Project */}
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{client.project}</Badge>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={14} className="fill-yellow-400" />
                        <span className="text-sm font-semibold">{client.rating}.0</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center py-16"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-3xl p-12 backdrop-blur-xl max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🎮</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Nenhum cliente encontrado para {selectedCategory === "fivem" ? "FiveM" : selectedCategory}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {selectedCategory === "fivem" 
                      ? "Ainda não temos depoimentos de clientes FiveM publicados. Em breve teremos novidades!"
                      : "Ainda não temos depoimentos nesta categoria. Em breve teremos novidades!"
                    }
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory("all")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Ver Todos os Clientes
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { label: "Clientes Satisfeitos", value: "15+", icon: "😊" },
              { label: "Projetos Entregues", value: "15+", icon: "✅" },
              { label: "Taxa de Satisfação", value: "100%", icon: "⭐" },
              { label: "Suporte Pós-Venda", value: "24/7", icon: "🛠️" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Quer ser o próximo cliente satisfeito?</h3>
              <p className="text-gray-300 mb-6">Entre em contato e vamos transformar sua ideia em realidade!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contato")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Solicitar Orçamento
                <ArrowUpRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projetos" className="py-32 px-6 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Meus Projetos
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Alguns dos meus trabalhos mais recentes disponíveis no GitHub
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-12 h-12 border-2 border-purple-400 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                          <Github className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                            {repo.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            {repo.stargazers_count > 0 && (
                              <span className="flex items-center gap-1">
                                <Star size={14} />
                                {repo.stargazers_count}
                              </span>
                            )}
                            {repo.forks_count > 0 && (
                              <span className="flex items-center gap-1">
                                <GitFork size={14} />
                                {repo.forks_count}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                      {repo.description || "Sem descrição disponível"}
                    </p>

                    <div className="flex items-center justify-between">
                      {repo.language && (
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{repo.language}</Badge>
                      )}

                      <motion.a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 text-sm font-medium"
                      >
                        Ver Código
                        <ExternalLink size={16} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {repos.length === 0 && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="bg-gray-800/20 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-400">Carregando projetos...</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologias" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Tecnologias</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ferramentas e linguagens que domino para criar soluções completas
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-500 text-center h-full">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {tech.name}
                  </h3>
                  <Badge className={`bg-gradient-to-r ${tech.color} text-white border-0 text-xs`}>
                    {tech.category}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-32 px-6 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Vamos Conversar
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tem um projeto em mente? Vamos transformar sua ideia em realidade!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form - Em Desenvolvimento */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 border border-red-500/20 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Construction className="w-6 h-6 text-red-400" />
                  Sistema de Contato
                </h3>

                <div className="space-y-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Construction className="w-8 h-8 text-red-400" />
                    </div>
                    <h4 className="text-xl font-bold text-red-400 mb-2">Em Desenvolvimento</h4>
                    <p className="text-red-300 text-sm mb-4">
                      O sistema de contato está sendo implementado. Em breve você poderá enviar mensagens diretamente pelo site!
                    </p>
                    <div className="w-full bg-red-500/20 rounded-xl p-3">
                      <div className="w-full bg-red-500/30 rounded-lg h-2 mb-2"></div>
                      <div className="w-3/4 bg-red-500/30 rounded-lg h-2 mb-2"></div>
                      <div className="w-1/2 bg-red-500/30 rounded-lg h-2"></div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-white-400" />
                      Contato Alternativo
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Enquanto o sistema está em desenvolvimento, você pode me contatar através de:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span>Email: felpsdeveloper@outlook.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span>Discord: felpsdev</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span>GitHub: FelpsDeveloper3001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Conecte-se Comigo</h3>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`flex items-center gap-4 p-6 bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl backdrop-blur-xl hover:border-white/20 transition-all duration-300 ${link.bg}`}
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                        <link.icon size={24} className={link.color.replace("hover:", "")} />
                      </div>
                      <div>
                        <span className="text-lg font-semibold text-white">{link.name}</span>
                        <p className="text-gray-400 text-sm">Clique para entrar em contato</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 ml-auto" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-2xl p-6"
              >
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                  Status do Sistema
                </h4>
                <p className="text-red-400 font-medium mb-2">🔴 Sistema de contato em desenvolvimento</p>
                <p className="text-gray-400 text-sm">Use os links alternativos para entrar em contato</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © 2024 Felps. Desenvolvido com <Heart className="w-4 h-4 text-red-400 inline mx-1" />
                usando Next.js e Tailwind CSS
              </p>
            </div>
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <link.icon size={18} className="text-gray-400 hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

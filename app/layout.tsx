import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Felps - Desenvolvedor de Bots e Scripts",
  description:
    "Portfólio de Felps, desenvolvedor especializado em bots Discord, scripts FiveM e sistemas MTA. 16 anos, apaixonado por tecnologia.",
  keywords: ["desenvolvedor", "discord bot", "fivem", "mta", "javascript", "typescript", "php", "lua", "felps"],
  authors: [{ name: "Felps" }],
  creator: "Felps",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://felpsdev.vercel.app",
    title: "Felps - Desenvolvedor de Bots e Scripts",
    description: "Portfólio de Felps, desenvolvedor especializado em bots Discord, scripts FiveM e sistemas MTA.",
    siteName: "Felps Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felps - Desenvolvedor de Bots e Scripts",
    description: "Portfólio de Felps, desenvolvedor especializado em bots Discord, scripts FiveM e sistemas MTA.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

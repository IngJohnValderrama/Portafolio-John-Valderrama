import React from 'react'
import { motion } from 'framer-motion'

export default function Footer(){
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {icon: '🐙', label: 'GitHub', href: 'https://github.com/IngJohnValderrama'},
    {icon: '💼', label: 'LinkedIn', href: 'http://www.linkedin.com/in/john-valderrama-494334223'},
  ]

  const footerLinks = [
    {label: 'Inicio', href: '#hero'},
    {label: 'Proyectos', href: '#projects'},
    {label: 'CV', href: '/Hoja%20Vida%20John%20Valderrama%202026.pdf'},
    {label: 'Contacto', href: '#contact'}
  ]

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {staggerChildren: 0.1}
    }
  }

  const itemVariants = {
    hidden: {opacity: 0, y: 10},
    visible: {opacity: 1, y: 0, transition: {duration: 0.3}}
  }

  return (
    <footer className="border-t border-slate-800 mt-16 pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true}}
          className="space-y-8"
        >
          {/* Sección Principal */}
          <motion.div variants={itemVariants} className="text-center flex flex-col items-center gap-2">
            <img src="/LogoJohnValderramaFooter.png" alt="Logo" className="w-25 h-25 object-contain" />
            <h2 className="text-2xl font-bold mb-2">John Ricardo Valderrama</h2>
            <p className="text-slate-400">Ingeniero de Sistemas | Desarrollador Full Stack & DevOps</p>
          </motion.div>

          {/* Enlaces de Navegación */}
          <motion.div variants={itemVariants} className="flex justify-center flex-wrap gap-6">
            {footerLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-slate-400 hover:text-electric transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Redes Sociales */}
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{scale: 1.15, rotate: 10}}
                whileTap={{scale: 0.95}}
                className="flex items-center justify-center w-12 h-12 rounded-full glass border border-slate-800/40 hover:border-electric/40 transition-colors"
                title={social.label}
              >
                <span className="text-lg">{social.icon}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          {/* Copyright & Info */}
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <p className="text-slate-500 text-sm">
              © {currentYear} John Ricardo Valderrama. Todos los derechos reservados.
            </p>
            <p className="text-slate-600 text-xs">
              Construido con React + Vite + Tailwind | Desplegado en Azure Static Web Apps
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

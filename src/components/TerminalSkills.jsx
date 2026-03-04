import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Transition } from '@headlessui/react'

const cv = {
  name: "John Ricardo Valderrama Pastrana",
  title: "Ingeniero de Sistemas | Desarrollador Full Stack & DevOps",
  summary: "Ingeniero de Sistemas en proceso con enfoque en ingeniería de software, arquitectura de soluciones y prácticas DevOps. Especializado en sistemas escalables, automatización, contenedorización y CI/CD.",
  skills: ["Python", "React", "Next.js", "Docker", "Kubernetes", "Azure", "Terraform", "CI/CD", "Automation"],
  experience: [
    { company: "UNIMINUTO (SYMBIOTIC)", role: "Ingeniero de Sistemas Junior", period: "2024-presente", highlights: ["Arquitectura de soluciones", "Desarrollo Full Stack", "Despliegues en Azure"] },
    { company: "Proyectos personales", role: "Desarrollador Full-Stack", period: "2021-presente", highlights: ["Despliegues en Azure", "Automatización con CI/CD"] }
  ],
  education: [
    { institution: "Colegio Salesiano Juan del Rizzo", degree: "Bachillerato" },
    { institution: "Uniminuto", degree: "Ingeniería de Sistemas" }
  ]
}

const commands = {
  'help': ['Comandos disponibles:', '  cat cv          - Ver resumen del CV', '  show skills     - Listar habilidades técnicas', '  show experience - Ver experiencia profesional', '  show education  - Ver formación académica', '  whoami          - Información personal'],
  'cat cv': [cv.name, cv.title, '', cv.summary],
  'show skills': ['Habilidades técnicas:', ...cv.skills.map(s => `  • ${s}`)],
  'show experience': ['Experiencia profesional:', ...cv.experience.flatMap(e => [`\n[${e.period}] ${e.company}`, `  ${e.role}`, ...e.highlights.map(h => `    - ${h}`)])],
  'show education': ['Formación académica:', ...cv.education.map(e => `  • ${e.degree} - ${e.institution}`)],
  'whoami': [`${cv.name}`, cv.title, `📍 Colombia`, `🔗 Ingeniero de sistemas con enfoque en Desarrollo Web, analitica de datos y despliegue en cloud`],
  'ls skills': cv.skills.map(s => `- ${s}`),
  'cat about': [cv.name, cv.title]
}

export default function TerminalSkills() {
  const [lines, setLines] = useState(["$ John@devops:~$ help", "Escribe 'help' para ver los comandos disponibles"])

  function run(cmd) {
    if (!cmd.trim()) return
    setLines(prev => [...prev, `$ ${cmd}`])
    const result = commands[cmd] || [`Command not found: ${cmd}`]
    setTimeout(() => setLines(prev => [...prev, ...result]), 300)
  }

  const [input, setInput] = useState('')

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Prueba la Linea de Comandos</h2>      {/* Guía de comandos */}
      <motion.div className="grid md:grid-cols-2 gap-4" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
        <div className="glass p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-electric font-semibold text-sm mb-3">📖 Guía de comandos</h4>
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            <li><span className="text-electric">help</span> — Mostrar comandos</li>
            <li><span className="text-electric">cat cv</span> — Resumen del CV</li>
            <li><span className="text-electric">show skills</span> — Habilidades</li>
            <li><span className="text-electric">show experience</span> — Experiencia</li>
            <li><span className="text-electric">show education</span> — Educación</li>
            <li><span className="text-electric">whoami</span> — Mi perfil</li>
          </ul>
        </div>

        <div className="glass p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-emerald-400 font-semibold text-sm mb-3">💡 Información rápida</h4>
          <div className="text-xs text-slate-300 space-y-1">
            <p><span className="text-emerald-400 font-mono">Nombre:</span> {cv.name}</p>
            <p><span className="text-emerald-400 font-mono">Rol:</span> {cv.title}</p>
            <p><span className="text-emerald-400 font-mono">Skills:</span> {cv.skills.slice(0, 4).join(', ')}...</p>
          </div>
        </div>
      </motion.div>

      {/* Terminal */}
      <motion.div className="glass p-6 rounded-xl" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
        <div className="bg-gradient-to-b from-black/70 to-black/40 p-4 rounded text-green-300 font-mono text-sm max-h-64 overflow-auto space-y-1">
          {lines.map((l, i) => (
            <Transition
              as={React.Fragment}
              key={i}
              appear={true}
              show={true}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
            >
              <div>{l}</div>
            </Transition>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { run(input); setInput('') } }} className="flex-1 bg-transparent border border-slate-700 rounded px-3 py-2 text-slate-100 font-mono text-sm" placeholder="Escribe comando, ej: help" />
          <button onClick={() => { run(input); setInput('') }} className="px-4 py-2 bg-electric text-slate-900 rounded font-semibold hover:bg-cyan-400 transition">Run</button>
        </div>
      </motion.div>
    </section>
  )
}

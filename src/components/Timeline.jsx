import React from 'react'
import { motion } from 'framer-motion'

const items = [
  {date: 'Misión TIC 2021-2023', desc: 'Cursos en programación y desarrollo web con énfasis en cloud'},
  {date: 'SENA 2022-2023', desc: 'Formación en Azure, Docker, CI/CD y prácticas DevOps'},
  {date: '2023-2024', desc: 'Desarrollo de proyectos full stack con despliegues en Azure'},
  {date: 'UNIMINUTO (SYMBIOTIC) 2024-Presente', desc: 'Software Architect, Mentor Académico y líder de infraestructura'},
  {date: 'Certificaciones', desc: 'Azure Fundamentals | Ciberseguridad (Google) | Análisis de Datos'}
]

export default function Timeline(){
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Trayectoria Profesional</h2>
      <div className="border-l border-slate-800 pl-6 space-y-8">
        {items.map((it,i)=> (
          <motion.div key={i} initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}}>
            <div className="mb-1 text-electric font-semibold">{it.date}</div>
            <div className="text-slate-300">{it.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

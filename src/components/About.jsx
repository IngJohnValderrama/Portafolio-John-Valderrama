import React from 'react'
import { motion } from 'framer-motion'

export default function About(){

  return (
    <section>
      <motion.div className="glass p-6 rounded-2xl" initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
        <h2 className="text-2xl font-bold">Sobre mí</h2>
        <p className="mt-3 text-slate-300">
            Ingeniero de Sistemas en proceso con enfoque en ingeniería de software, arquitectura
de soluciones y prácticas DevOps, especializado en el diseño e implementación de
sistemas escalables, seguros y orientados a resultados. Experiencia en la construcción
de soluciones tecnológicas que integran desarrollo full stack, automatización de
procesos, contenedorización con Docker e implementación de pipelines CI/CD,
contribuyendo a mejorar la eficiencia operativa, la calidad del software y la evolución
continua de plataformas digitales.
        </p>
        <div className="mt-4 flex gap-3">
          <a href="/Hoja%20Vida%20John%20Valderrama%202026.pdf" target="_blank" rel="noreferrer" className="px-4 py-2 border border-slate-700 rounded hover:border-electric hover:bg-electric/5 transition-all">Descargar CV (PDF)</a>
        </div>
      </motion.div>
    </section>
  )
}

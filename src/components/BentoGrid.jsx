import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { bentoData } from '../data/bento'

export default function BentoGrid(){
  const [deploymentCounter, setDeploymentCounter] = useState(0)

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {staggerChildren: 0.12}
    }
  }

  const itemVariants = {
    hidden: {opacity: 0, scale: 0.92},
    visible: {opacity: 1, scale: 1, transition: {duration: 0.5, type: 'spring', bounce: 0.3}}
  }

  React.useEffect(()=>{
    if(deploymentCounter === bentoData.deployments.count) return
    const timer = setInterval(()=>setDeploymentCounter(p=> Math.min(p+1, bentoData.deployments.count)), 100)
    return ()=> clearInterval(timer)
  }, [deploymentCounter])

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-8">Experiencia & Certificaciones</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[250px]"
      >
        {/* Tarjeta Grande: UNIMINUTO */}
        <motion.div
          layoutId="uniminuto"
          variants={itemVariants}
          className="lg:col-span-2 lg:row-span-2 glass rounded-2xl p-6 border border-slate-800/60 bg-gradient-to-br from-slate-900/40 to-slate-950/20 shadow-lg hover:shadow-electric/20 transition-all cursor-default group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600/5 to-slate-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative h-full flex flex-col justify-between">
            <div>
              <div className="text-5xl mb-3">{bentoData.main.icon}</div>
              <h3 className="text-2xl font-bold">{bentoData.main.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{bentoData.main.period}</p>
            </div>
            <div>
              <div className="text-lg font-semibold text-electric mb-2">{bentoData.main.role}</div>
              <div className="flex flex-wrap gap-2">
                {bentoData.main.highlights.map((h, i)=> (
                  <span key={i} className="text-xs px-2 py-1 bg-slate-800/40 rounded border border-slate-700/40">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tarjetas de Certificaciones */}
        {bentoData.certifications.map((cert, idx)=> (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="glass rounded-2xl p-5 border border-slate-800/60 bg-gradient-to-br from-slate-900/30 to-slate-950/10 shadow-lg hover:shadow-neon/30 transition-all cursor-pointer group relative overflow-hidden"
            whileHover={{y: -4, transition: {duration: 0.2}}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon/10 to-electric/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-full flex flex-col justify-between">
              <div className="text-4xl">{cert.icon}</div>
              <div>
                <h4 className="font-semibold text-sm">{cert.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{cert.issuer}</p>
                <p className="text-xs text-slate-500 mt-0.5">{cert.date}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Tarjeta Interactiva: Contador de Despliegues */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 glass rounded-2xl p-6 border border-electric/40 bg-gradient-to-br from-electric/10 to-slate-950/40 shadow-lg hover:shadow-electric/40 transition-all cursor-pointer group relative overflow-hidden"
          whileHover={{scale: 1.02}}
          onClick={()=> setDeploymentCounter(0)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electric/5 via-transparent to-electric/0 animate-pulse opacity-50" />
          <div className="relative h-full flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{scale: 0.8, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{type: 'spring', bounce: 0.5}}
              className="text-6xl font-bold text-electric mb-2"
            >
              {deploymentCounter}
            </motion.div>
            <p className="text-lg font-semibold text-slate-100">{bentoData.deployments.title}</p>
            <p className="text-sm text-slate-400 mt-2">{bentoData.deployments.subtitle}</p>
            <button
              onClick={()=> setDeploymentCounter(0)}
              className="mt-4 text-xs px-3 py-1 bg-electric text-slate-900 rounded hover:shadow-lg hover:shadow-electric/40 font-semibold transition-all"
            >
              Reiniciar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

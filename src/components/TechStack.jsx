import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { techStackData } from '../data/techStack'

export default function TechStack(){
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {staggerChildren: 0.08}
    }
  }

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.4}}
  }

  const floatingVariants = {
    float: {
      y: [0, -8, 0],
      transition: {repeat: Infinity, duration: 3}
    }
  }

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Stack Tecnológico</h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        variants={containerVariants}
        className="space-y-8"
      >
        {techStackData.map((category, catIdx)=> (
          <div key={catIdx}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-xl font-semibold">{category.category}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.items.map((tech, idx)=> (
                <motion.button
                  key={`${catIdx}-${idx}`}
                  variants={itemVariants}
                  layout
                  onHoverStart={()=>setHovered(`${catIdx}-${idx}`)}
                  onHoverEnd={()=>setHovered(null)}
                  onClick={()=>setSelected(tech)}
                  className={`relative p-4 rounded-lg border border-slate-800/40 transition-all cursor-pointer group overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <motion.div
                    variants={floatingVariants}
                    animate={hovered === `${catIdx}-${idx}` ? 'float' : 'initial'}
                    className="relative z-10"
                  >
                    <div className="text-4xl mb-2">{tech.icon}</div>
                    <div className="text-sm font-semibold text-slate-100">{tech.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{tech.level}</div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <Dialog
            open={!!selected}
            onClose={()=>setSelected(null)}
            className="relative z-50"
          >
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={()=>setSelected(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel as={motion.div} initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0.9, opacity: 0}} className="glass rounded-2xl p-6 max-w-md w-full border border-slate-800/60 shadow-2xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{selected.icon}</span>
                    <div>
                      <Dialog.Title className="text-2xl font-bold">{selected.name}</Dialog.Title>
                      <div className="text-xs text-slate-400 mt-1">Nivel: {selected.level}</div>
                    </div>
                  </div>
                  <button onClick={()=>setSelected(null)} className="text-slate-400 hover:text-slate-200">✕</button>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{selected.desc}</p>
                <div className="mt-6 flex gap-3">
                  <button onClick={()=>setSelected(null)} className="w-full px-4 py-2 bg-electric text-slate-900 rounded font-semibold hover:shadow-lg hover:shadow-electric/40">Cerrar</button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { Dialog } from '@headlessui/react'
import { SiPython, SiReact, SiNextdotjs, SiDocker, SiMicrosoftazure, SiTerraform, SiKubernetes } from 'react-icons/si'
import { IoClose } from 'react-icons/io5'

const techIcons = {
  'Python': SiPython,
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'Docker': SiDocker,
  'Azure': SiMicrosoftazure,
  'Terraform': SiTerraform,
  'Kubernetes': SiKubernetes
}

function Badge({t}){ return <span className="text-xs px-2 py-1 bg-slate-800 rounded">{t}</span> }

function TechIcon({name}){
  const Icon = techIcons[name]
  if(!Icon) return <span className="text-xs">{name}</span>
  return <Icon className="w-5 h-5" title={name} />
}

export default function ProjectShowcase(){
  const [selected, setSelected] = useState(null)
  const project = selected ? projects.find(p => p.id === selected) : null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Proyectos destacados</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p=> (
          <motion.div key={p.id} className="relative rounded-lg overflow-hidden cursor-pointer" whileHover={{scale:1.01}} onClick={()=>setSelected(p.id)}>
            <div className="glass p-6 rounded-lg h-full flex flex-col justify-between hover:bg-slate-900/40 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-slate-300 text-sm">{p.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3 items-center">
                <div className="flex gap-2">
                  {p.tech.map(t=> <Badge key={t} t={t} />)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {project && (
          <Dialog open={!!selected} onClose={()=>setSelected(null)} className="relative z-50">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}}>
                <Dialog.Panel className="glass border border-slate-700 rounded-xl p-8 max-w-md w-full relative">
                  <button onClick={()=>setSelected(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-100">
                    <IoClose size={24} />
                  </button>
                  
                  {project.img && (
                    <img src={project.img} alt={project.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  )}
                  
                  <Dialog.Title className="text-2xl font-bold mb-2">{project.name}</Dialog.Title>
                  <p className="text-slate-300 text-sm mb-4">{project.desc}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-electric mb-3">Tecnologías</h4>
                    <div className="flex flex-wrap gap-4">
                      {project.tech.map(t=> {
                        const Icon = techIcons[t]
                        return (
                          <div key={t} className="flex flex-col items-center">
                            <div className="p-2 bg-slate-800/50 rounded-lg mb-1">
                              {Icon ? <Icon className="w-6 h-6 text-slate-300" /> : <span className="text-xs">{t}</span>}
                            </div>
                            <span className="text-xs text-slate-400">{t}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a href={project.url} target="_blank" rel="noreferrer" className="block w-full px-4 py-2 bg-electric text-slate-900 rounded-lg font-semibold text-center hover:bg-cyan-400 transition">
                      Ver despliegue
                    </a>
                    <button onClick={()=>setSelected(null)} className="w-full px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 transition">
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}

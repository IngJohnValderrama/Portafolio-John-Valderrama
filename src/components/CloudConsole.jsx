import React, { useState } from 'react'
import { projects } from '../data/projects'
import { motion } from 'framer-motion'
import Sparkline from './Sparkline'

export default function CloudConsole(){
  const [hovered, setHovered] = useState(null)
  const [copied, setCopied] = useState(false)

  const cvCommand = `curl /cv.json`;
  const cvAzureCommand = `curl https://<your-site>.azurestaticapps.net/cv.json`;

  function copyCmd(text = cvCommand){
    if(!navigator.clipboard) return
    navigator.clipboard.writeText(text).then(()=>{
      setCopied(true)
      setTimeout(()=>setCopied(false), 1600)
    })
  }

  return (
    <section className="my-8">
      <div className="flex gap-6">
        <aside className="w-56 bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm">
          <div className="text-xs text-slate-400 mb-3">Cloud Console</div>
          <nav className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded bg-zinc-900/30">Overview</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-900/40">Services</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-900/40">Deployments</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-900/40">Logs</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-900/40">Settings</button>
          </nav>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Desarrollos desplegados</h3>
            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-400">CV (JSON)</div>
              <div className="bg-zinc-900/40 border border-zinc-800 rounded px-3 py-1 text-sm flex items-center gap-2">
                <code className="font-mono text-xs">{cvCommand}</code>
                <div className="flex gap-2">
                  <button onClick={()=>copyCmd(cvCommand)} className="px-2 py-1 bg-electric text-slate-900 rounded text-xs">{copied? 'Copiado' : 'Copiar'}</button>
                  <button onClick={()=>copyCmd(cvAzureCommand)} className="px-2 py-1 border border-zinc-800 rounded text-xs">Copiar (Azure)</button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {projects.map(p=> (
              <motion.div key={p.id} layout className="p-4 rounded-lg bg-zinc-950 border border-zinc-800" onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}>
                {p.img && (
                  <img src={p.img} alt={p.name} className="w-full h-24 object-cover rounded mb-3" />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.tech.join(' • ')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${p.status==='online'? 'bg-green-400':'bg-red-500'}`} />
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-electric">visitar</a>
                  </div>
                </div>

                <div className="mt-3 text-slate-300 text-sm">{p.desc}</div>

                <div className="mt-4 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>CPU</span>
                    <div className="flex items-center gap-2">
                      <Sparkline data={[8,10,12,9,11,13,10]} color="#0ea5ff" width={50} height={16} />
                      <span className="font-mono">{p.metrics?.cpu ?? '-'}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Latency</span>
                    <div className="flex items-center gap-2">
                      <Sparkline data={[80,85,82,90,88,85,87]} color="#22c55e" width={50} height={16} />
                      <span className="font-mono text-slate-300">{p.metrics?.latency ?? '-'}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Uptime</span>
                    <span className="font-mono text-emerald-400">{p.metrics?.uptime ?? '-'}</span>
                  </div>
                </div>

                <motion.div initial={{opacity:0}} animate={{opacity: hovered===p.id ? 1 : 0}} className="mt-3 text-xs p-2 bg-zinc-900/40 border border-zinc-800 rounded">
                  {hovered===p.id ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-emerald-400 font-semibold">status: {p.status}</div>
                        <div className="text-slate-400 text-[11px]">requests: 1,234 / min</div>
                      </div>
                      <div className="text-[11px] text-slate-400">errors: 0.02%</div>
                    </div>
                  ) : null}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Hero() {
  const full = 'John Ricardo Valderrama Pastrana — Ingeniero de Sistemas | Desarrollador Full Stack & DevOps'
  const [text, setText] = useState('')

  const heroRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      setText(full.slice(0, ++i))
      if (i >= full.length) clearInterval(t)
    }, 25)
    return () => clearInterval(t)
  }, [])

  // three.js background
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'
    canvas.style.top = 0
    canvas.style.left = 0
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '-1'
    heroRef.current.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true})
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const geometry = new THREE.IcosahedronGeometry(2, 0)
    const material = new THREE.MeshBasicMaterial({color:0x0ea5ff, wireframe:true, opacity:0.15, transparent:true})
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    function onResize(){
      camera.aspect = window.innerWidth/window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    onResize()

    function animate(){
      mesh.rotation.x += 0.002
      mesh.rotation.y += 0.003
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  // parallax text following mouse
  useEffect(()=>{
    function move(e){
      const x = (e.clientX/window.innerWidth - 0.5)*30
      const y = (e.clientY/window.innerHeight - 0.5)*30
      if(textRef.current){
        textRef.current.style.transform = `translate3d(${x}px,${y}px,0)`
      }
    }
    window.addEventListener('mousemove', move)
    return ()=> window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section ref={heroRef} className="relative py-12 overflow-hidden bg-zinc-950">
      {/* particles left for subtle depth */}
      <div className="hero-bg" aria-hidden>
        <div className="particle" style={{width:8,height:8,left:'10%',top:'20%',background:'#0ea5ff'}} />
        <div className="particle" style={{width:10,height:10,left:'30%',top:'70%',background:'#22c55e', animationDelay:'-2s'}} />
        <div className="particle" style={{width:6,height:6,left:'80%',top:'30%',background:'#0ea5ff', animationDelay:'-4s'}} />
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}} className="glass p-8 rounded-2xl relative z-10 shadow-2xl border border-slate-800/40 bg-gradient-to-br from-slate-900/40 to-slate-950/20">
        <img src="/LogoJohnValderramaFooter.png" alt="Logo John Valderrama" className="w-25 h-25 mb-4 object-contain" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-electric/0 via-electric/5 to-neon/0 pointer-events-none" />
        <h1 ref={textRef} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight relative will-change-transform">{text}<span className="blink-cursor" /></h1>
        <p className="mt-4 text-slate-300 max-w-2xl relative">Concepto: The DevOps Architect Experience — eficiencia, infraestructura y modernidad. Diseño centrado en soluciones escalables y prácticas DevOps.</p>
        <div className="mt-6 flex gap-4 relative">
          <a href="https://github.com/IngJohnValderrama" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-electric text-slate-900 rounded shadow-lg hover:shadow-electric/40 hover:shadow-2xl font-semibold transition-all">
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/john-valderrama-494334223" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 border border-slate-700 rounded hover:border-electric hover:bg-electric/5 transition-all">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  )
}

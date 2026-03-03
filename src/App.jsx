import React from 'react'
import Hero from './components/Hero'
import TerminalSkills from './components/TerminalSkills'
import ProjectShowcase from './components/ProjectShowcase'
import Timeline from './components/Timeline'
import Cursor from './components/Cursor'
import About from './components/About'
import CloudConsole from './components/CloudConsole'
import TechStack from './components/TechStack'
import BentoGrid from './components/BentoGrid'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen px-6 py-8">
      <Cursor />
      <div className="max-w-5xl mx-auto space-y-12">
        <Hero />
        <About />
        <TechStack />
        <BentoGrid />
        <TerminalSkills />
        <ProjectShowcase />
        <Timeline />
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

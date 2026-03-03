import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'

// Configurar EmailJS - Reemplaza con tus credenciales
const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xxxxxxxxx'
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xxxxxxxxx'
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'xxxxxxxxxxxxxxxxxxxxxxxx'

export default function Contact(){
  const [formData, setFormData] = useState({name: '', email: '', message: ''})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    emailjs.init(EMAIL_PUBLIC_KEY)
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try{
      await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'tu-email@gmail.com', // Reemplaza con tu email
      })
      
      setSubmitted(true)
      setFormData({name: '', email: '', message: ''})
      setTimeout(()=> setSubmitted(false), 4000)
    }catch(err){
      console.error('Error al enviar:', err)
      setError('Error al enviar el mensaje. Verifica tus configuraciones de EmailJS.')
    }finally{
      setLoading(false)
    }
  }

  const contactMethods = [
    {icon: '📧', label: 'Email', value: 'johnricavapa@gmail.com', href: 'mailto:johnricavapa@gmail.com'},
    {icon: '💼', label: 'LinkedIn', value: 'John Valderrama', href: 'https://linkedin.com/in/john-valderrama-494334223'},
    {icon: '🐙', label: 'GitHub', value: 'Ingeniero John Valderrama', href: 'https://github.com/IngJohnValderrama'},
    {icon: '📱', label: 'WhatsApp', value: '+57 305 294 9632', href: 'https://wa.me/573052949632'}
  ]

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Ponte en contacto</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Información de Contacto */}
        <motion.div
          initial={{opacity: 0, x: -20}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          className="space-y-4"
        >
          <p className="text-slate-300 mb-6">
            Estoy disponible para discutir nuevos proyectos, arquitecturas escalables y oportunidades de colaboración.
          </p>
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              href={method.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{x: 8}}
              className="flex items-center gap-4 p-4 rounded-lg glass border border-slate-800/40 hover:border-electric/40 transition-all group"
            >
              <span className="text-3xl">{method.icon}</span>
              <div>
                <div className="text-sm text-slate-400">{method.label}</div>
                <div className="font-semibold text-slate-100 group-hover:text-electric transition-colors">{method.value}</div>
              </div>
              <span className="ml-auto text-electric opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Formulario de Contacto */}
        <motion.form
          initial={{opacity: 0, x: 20}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          onSubmit={handleSubmit}
          className="glass p-6 rounded-2xl border border-slate-800/40 space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-900/30 border border-slate-800 focus:border-electric focus:outline-none transition-colors"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-900/30 border border-slate-800 focus:border-electric focus:outline-none transition-colors"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-slate-900/30 border border-slate-800 focus:border-electric focus:outline-none transition-colors resize-none"
              placeholder="Tu mensaje aquí..."
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            className="w-full px-4 py-2 bg-electric text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-electric/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Enviando...' : submitted ? '✓ Enviado' : 'Enviar Mensaje'}
          </motion.button>
          {error && (
            <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400 text-sm">
              {error}
            </motion.div>
          )}
          {submitted && (
            <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="p-3 bg-emerald-900/30 border border-emerald-700 rounded-lg text-emerald-400 text-sm">
              ✓ Mensaje enviado correctamente. Te contactaré pronto.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}

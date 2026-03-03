import React, { useEffect, useState } from 'react'

export default function Cursor(){
  const [pos, setPos] = useState({x:-100, y:-100})

  useEffect(()=>{
    function move(e){ setPos({x:e.clientX, y:e.clientY}) }
    window.addEventListener('mousemove', move)
    return ()=> window.removeEventListener('mousemove', move)
  },[])

  return (
    <div style={{position:'fixed', left:0, top:0, pointerEvents:'none', zIndex:9999}}>
      <div style={{transform:`translate(${pos.x}px, ${pos.y}px)`}}>
        <div className="w-3 h-3 bg-electric rounded-full shadow-lg" />
      </div>
    </div>
  )
}

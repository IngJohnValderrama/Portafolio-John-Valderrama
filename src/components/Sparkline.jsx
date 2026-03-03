import React from 'react'

export default function Sparkline({data, width = 60, height = 24, color = '#0ea5ff'}){
  if(!data || data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((val, i)=> {
    const x = (i / (data.length - 1)) * (width - 4) + 2
    const y = height - 2 - ((val - min) / range) * (height - 4)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

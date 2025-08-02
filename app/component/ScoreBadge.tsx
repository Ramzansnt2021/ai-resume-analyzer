// ScoreBadge.tsx
import React from 'react'

interface ScoreBadgeProps {
  score: number
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = ''
  let textColor = ''
  let label = ''

  if (score > 70) {
    badgeColor = 'bg-badge-green'
    textColor = 'text-green-699'
    label = 'Strong'
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow'
    textColor = 'text-yellow-699'
    label = 'Good Start'
  } else {
    badgeColor = 'bg-badge-red'
    textColor = 'text-red-699'
    label = 'Need Work'
  }

  return (
    <div
      className={`flex justify-center items-center w-24 h-8 rounded-lg ${badgeColor}`}
    >
      <p className={`text-sm font-bold ${textColor}`}>{label}</p>
    </div>
  )
}

export default ScoreBadge

import React from 'react'

const PasswordStrengthMeter = ({ strength }: { strength: number }) => {
  const getColor = (index: number) => {
    // Determine colors based on the index
    if (index === 0) return strength <= 4 ? '#ff7f7f' : '#e0e0e0'
    if (index === 1) return strength > 4 && strength <= 8 ? '#ffd97f' : '#e0e0e0'
    if (index === 2) return strength > 8 && strength <= 12 ? '#d4ff7f' : '#e0e0e0'
    if (index === 3) return strength > 12 ? '#7fff7f' : '#e0e0e0'
    return '#e0e0e0'
  }

  return (
    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
      {/* Render four colored lines */}
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          style={{
            flex: 1,
            height: '8px',
            backgroundColor: getColor(index),
            borderRadius: '4px',
            transition: 'background-color 0.3s ease-in-out',
          }}
        />
      ))}
    </div>
  )
}

export default PasswordStrengthMeter

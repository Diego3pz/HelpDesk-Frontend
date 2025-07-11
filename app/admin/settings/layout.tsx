import React from 'react'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2>Configuración</h2>
      {children}
    </div>
  )
}

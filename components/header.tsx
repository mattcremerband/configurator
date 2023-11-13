import * as React from "react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"  aria-label="Global">
            <div className="flex items-center justify-between">
                <h2>Configurator</h2>
            </div>
            
            <ThemeToggle />
        </nav>
    </header>
  )
};
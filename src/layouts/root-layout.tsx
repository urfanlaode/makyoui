import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <Header />

      {/* Main content */}
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

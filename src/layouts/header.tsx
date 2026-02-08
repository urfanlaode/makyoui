import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-slate-900">
              MakyoUI
            </Link>

            <div className="flex gap-4">
              <Link
                to="/"
                className={cn(isActive('/') ? 'text-black' : 'text-slate-700 hover:bg-slate-100')}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

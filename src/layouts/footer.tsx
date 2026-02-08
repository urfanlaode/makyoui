import { env } from '@/lib/env'

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-white p-4 text-center text-sm text-gray-500">
      <div>&copy; 2026 MakyoUI v{env.VITE_APP_VERSION}. All rights reserved.</div>
    </footer>
  )
}

import { ROUTES } from '@/constants/route'
import { RootLayout } from '@/layouts/root-layout'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

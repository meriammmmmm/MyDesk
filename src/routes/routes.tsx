/* eslint-disable react-refresh/only-export-components */
import { Fragment, lazy } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

const GuestLayout = lazy(() => import('../layout/GuestLayout/GuestLayout'))
const MainLayout = lazy(() => import('../layout/MainLayout/MainLayout'))
const AdminLayout = lazy(() => import('../layout/AdminLayout/AdminLayout'))

import GuestGuard from './guards/GuestGuard'
import AuthGuard from './guards/AuthGuard'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  // GuestGuard Routes
  {
    exact: true,
    path: '/',
    guard: GuestGuard,
    component: () => <Navigate to="/login" />,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('@src/pages/Login')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('@src/pages/Register')),
    layout: GuestLayout,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/forget-password',
    component: lazy(() => import('@src/features/ForgetPassword/ForgetPassword')),
    layout: GuestLayout,
  },

  {
    exact: true,
    guard: GuestGuard,
    path: '/reset-password',
    component: lazy(
      () => import('@src/features/ForgetPassword/components/ResetPassword/ResetPassword'),
    ),
    layout: GuestLayout,
  },

  // AuthGuard Routes
  {
    exact: true,
    guard: AuthGuard,
    path: '/dashboard',
    component: lazy(() => import('@src/pages/Dashboard')),
    layout: MainLayout,
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/images',
    component: lazy(() => import('@src/pages/Images')),
    layout: AdminLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/user',
    component: lazy(() => import('@src/pages/User')),
    layout: AdminLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/editProfile',
    component: lazy(() => import('@src/pages/Profile')),
    layout: MainLayout,
  },

  {
    exact: true,
    path: '*',
    component: lazy(() => import('@src/pages/NotFound')),
  },
]

export default routes

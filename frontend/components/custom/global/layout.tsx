'use client'
import {SiteHeader} from '@/components/custom/global/site-header';
import {createContext, useState} from 'react';

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <SiteHeader />
      <main>{children}</main>
    </div>
  )
}

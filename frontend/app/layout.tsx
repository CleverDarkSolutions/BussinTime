'use client'
import '@/styles/globals.css'
import { Metadata } from 'next'
import {siteConfig} from '@/config/site';
import {fontSans} from '@/lib/fonts';
import {TailwindIndicator} from '@/components/custom/global/tailwind-indicator';
import {cn} from '@/lib/utils';
import {ThemeProvider} from '@/components/custom/global/theme-provider';
import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en"
      suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}

import * as React from 'react'
import Link from 'next/link'
import {siteConfig} from '@/config/site';
import { Icons } from '../unused/icons';
import UserDatabasePopup from '@/components/custom/global/user-database-popup';

export function MainNav() {
  return (
    <div className="flex h-full items-center justify-center md:gap-10">
      <Link href="/home"
        className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <Link href="/settings">
        Settings
      </Link>
      <Link href="/history">
        My past events
      </Link>
      <div>
        <UserDatabasePopup />
      </div>
      <Link href="/feedback">
        Report feedback
      </Link>
    </div>
  )
}

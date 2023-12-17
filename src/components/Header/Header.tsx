import React from 'react';
import Link from 'next/link';

// components
import { BoardDrawer } from '../Drawer';

// context

// constants and functions
import { APP_NAME } from '@/constants';

export function Header() {
  return (
    <header className="body-font text-base-content">
      <div className="mx-auto flex flex-col flex-wrap items-center px-5 py-2 md:flex-row">
        <div className="flex w-full space-x-2">
          <div className="flex items-center justify-center">
            <BoardDrawer />
          </div>

          <div className="flex items-center justify-center">
            <Link href={'/'} className="">
              <h1 className="text-xl font-light">{APP_NAME}</h1>
            </Link>
          </div>
        </div>

        {/* toggle for light and dark mode */}
        <div className="hidden  md:block">{/* <ThemeToggle /> */}</div>
      </div>
    </header>
  );
}

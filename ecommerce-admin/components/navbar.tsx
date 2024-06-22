import { UserButton } from '@clerk/nextjs';
import { StoreSwitcher } from '@/components/store-switcher';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Store } from '@prisma/client';
import prismadb from '@/lib/prismadb';

import { Sidebar } from '@/components/sidebar';

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sidebar />
        <div className="flex items-center ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

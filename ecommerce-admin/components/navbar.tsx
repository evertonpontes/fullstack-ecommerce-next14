import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

import { StoreSwitcher } from '@/components/store-switcher';
import { MainNav } from '@/components/main-nav';

import { redirect } from 'next/navigation';
import { cn } from '@/lib/utils';

export const Navbar = async ({ className }: { className?: string }) => {
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
    <div
      className={cn(
        'border-b bg-background md:bg-white/80 backdrop-blur',
        className
      )}
    >
      <div className="flex h-16 items-center px-4">
        <MainNav className="md:mr-4" />
        <div className="w-full md:w-auto flex items-center ml-4 md:ml-auto">
          <StoreSwitcher items={stores} className="mr-4" />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

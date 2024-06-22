import { redirect } from 'next/navigation';
import { StoreSwitcher } from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { Separator } from '@/components/ui/separator';
import { Routes } from '@/components/routes';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AreaChartIcon } from 'lucide-react';

export const Sidebar = async () => {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <MenuIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0">
        <div>
          <div className="h-screen bg-background">
            <div className="grid gap-4">
              <div className="pt-4 px-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <AreaChartIcon className="w-6 h-6 mr-2" /> Admin
                </h2>
              </div>
              <Separator />
              <Routes />
              <Separator />
              <div className="px-4">
                <StoreSwitcher items={stores} />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className="w-full h-screen overflow-auto">
      <Navbar className="sticky top-0 z-50" />
      {children}
    </div>
  );
};

export default DashboardLayout;

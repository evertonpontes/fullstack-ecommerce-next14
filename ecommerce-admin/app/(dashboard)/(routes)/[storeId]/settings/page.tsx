import { auth } from '@clerk/nextjs/server';
import { SettingsForm } from './components/settings-form';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div>
      <div className="py-8 px-6 space-y-8">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;

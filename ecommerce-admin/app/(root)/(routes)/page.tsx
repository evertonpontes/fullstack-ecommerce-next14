import { StoreModal } from '@/components/modals/store-modal';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { PlusIcon } from 'lucide-react';

const SetupPage = () => {
  return (
    <>
      <StoreModal />
      <div className="w-full h-full p-4 flex flex-col">
        <div className="w-full flex items-center">
          <Button
            size={'sm'}
            className="rounded-full w-10 h-10 sm:rounded sm:w-auto"
          >
            <PlusIcon className="w-4 h-4 sm:mr-2" />
            <span className="sr-only sm:not-sr-only">Create a New Store</span>
          </Button>
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupPage;

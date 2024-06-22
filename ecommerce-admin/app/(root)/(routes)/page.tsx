'use client';

import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/hooks/use-store-modal';

const SetupPage = () => {
  const storeModal = useStoreModal();

  return (
    <>
      <div className="p-4">
        <Button onClick={() => storeModal.onOpen()}>Create a new store</Button>
      </div>
    </>
  );
};

export default SetupPage;

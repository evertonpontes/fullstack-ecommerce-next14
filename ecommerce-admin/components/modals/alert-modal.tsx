'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { TriangleAlertIcon } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure you want to delete?"
      description="This action cannot be undone. This will permanently delete the selected object from our servers."
      open={isOpen}
      onClose={onClose}
      Icon={TriangleAlertIcon}
      iconClassName={'size-12 text-destructive'}
    >
      <div className="mt-8 flex justify-end space-x-4">
        <Button variant={'outline'} onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant={'destructive'} onClick={onConfirm} disabled={loading}>
          Confirm Delete
        </Button>
      </div>
    </Modal>
  );
};

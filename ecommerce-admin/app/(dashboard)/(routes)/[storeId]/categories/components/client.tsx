'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';

export const CategoryClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between">
        <Heading
          title="Categories (0)"
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          Add New Category
        </Button>
      </div>
      <Separator />
    </>
  );
};

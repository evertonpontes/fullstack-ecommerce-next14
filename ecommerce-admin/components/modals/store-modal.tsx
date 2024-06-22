'use client';

import { z } from 'zod';
import axios from 'axios';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStoreModal } from '@/hooks/use-store-modal';

import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/components/ui/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);

      window.location.assign(`/${response.data.id}`);
      toast.success('Store created successfully.');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create a New Store"
      description="Fill out the form below to create a new store."
      open={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-8 pt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter store name"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2 items-center justify-end">
            <Button
              type="button"
              variant={'outline'}
              onClick={storeModal.onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Create Store
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

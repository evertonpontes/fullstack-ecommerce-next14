'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Modal } from '@/components/ui/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    /*      TODO: Send store data to api      */
    console.log(values);
  };

  return (
    <Modal
      title="Create a New Store"
      description="Fill out the form below to create a new store."
      open={true}
      onClose={() => {}}
    >
      <div className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter store name" />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
          <div className="flex space-x-2 items-center justify-end">
            <Button type="button" variant={'outline'}>
              Cancel
            </Button>
            <Button type="submit">Create Store</Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

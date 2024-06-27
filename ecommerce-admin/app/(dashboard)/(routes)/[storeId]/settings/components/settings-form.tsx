'use client';

import { z } from 'zod';
import axios from 'axios';

import dayjs from 'dayjs';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CopyIcon, TrashIcon } from 'lucide-react';

import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';

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
import { Textarea } from '@/components/ui/textarea';
import { Store } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { TextEditor } from '@/components/ui/text-editor';

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      description: initialData.description || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();
      toast.success('Store updated.');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store deleted.');
    } catch (error) {
      toast.error('Make sure you removed all products and categories first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex justify-between">
        <Heading
          title="Store Settings"
          description="Customize your store preferences"
        />
        <Button
          variant={'destructive'}
          size={'icon'}
          onClick={() => setOpen(true)}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-8 pt-4"
          >
            <div className="grid gap-4 sm:max-w-[389px]">
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Store Description</FormLabel>
                    <FormControl>
                      <TextEditor
                        description={field.value}
                        onChange={field.onChange}
                        placeholder="Enter store description"
                        disable={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} type="submit" className="mr-auto">
              Save changes
            </Button>
          </form>
        </Form>
      </div>
      <Separator />
      <div className="flex flex-col justify-center space-y-4">
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${params.storeId}`}
          variant="public"
        />
        <span className="text-sm">
          Created on {dayjs(initialData.createdAt).format('MMMM DD, YYYY')}
        </span>
      </div>
    </>
  );
};

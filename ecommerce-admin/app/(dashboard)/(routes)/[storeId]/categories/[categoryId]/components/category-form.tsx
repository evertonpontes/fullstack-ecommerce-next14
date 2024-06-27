'use client';

import z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Category } from '@prisma/client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TextEditor } from '@/components/ui/text-editor';

interface CategoryFormProps {
  initialData: Category | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  thumbnailUrl: z.string(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit category' : 'Create category';
  const description = initialData ? 'Edit a category' : 'Add a new category';
  const toastMessage = initialData ? 'Category updated.' : 'Category created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      thumbnailUrl: '',
    },
  });

  const onSubmit = (values: CategoryFormValues) => {
    console.log(values);
  };

  const onDelete = () => {};

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant={'destructive'}
            size={'icon'}
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex">
            <Card>
              <CardContent>
                <CardHeader>
                  <CardTitle>General</CardTitle>
                </CardHeader>
                <div className="flex-col space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter name" />
                        </FormControl>
                        <FormDescription>
                          A category name is required and recommended to be
                          unique.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <TextEditor
                            description={field.value}
                            onChange={field.onChange}
                            placeholder="Type your text here..."
                          />
                        </FormControl>
                        <FormDescription>
                          A category name is required and recommended to be
                          unique.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </>
  );
};

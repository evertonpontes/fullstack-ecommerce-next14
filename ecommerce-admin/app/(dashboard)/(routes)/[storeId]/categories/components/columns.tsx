'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CellAction } from './cell-action';

export type CategoryColumn = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  thumbnail: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Category',
    cell: ({ row }) => {
      const { name, thumbnail, description } = row.original;

      return (
        <div className="flex gap-4 items-center">
          <div className="relative w-12 h-12 rounded-md overflow-hidden">
            <Image fill className="object-cover" src={thumbnail} alt="image" />
          </div>
          <div className="space-y-1">
            <strong>{name}</strong>
            <p className="text-xs text-muted-foreground max-w-56">
              {description}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

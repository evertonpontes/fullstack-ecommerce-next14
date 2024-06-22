'use client';

import { cn } from '@/lib/utils';
import {
  HouseIcon,
  PackageIcon,
  PaletteIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export const Routes = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      Icon: HouseIcon,
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      Icon: PackageIcon,
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      Icon: PaletteIcon,
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      Icon: ShoppingCartIcon,
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      Icon: ShoppingBagIcon,
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      Icon: SettingsIcon,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className="space-y-2 px-4">
      {routes.map((route) => (
        <Link
          key={route.label}
          href={route.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary',
            route.active && 'bg-muted text-primary'
          )}
        >
          <route.Icon className="w-4 h-4 mr-2" />
          {route.label}
        </Link>
      ))}
    </div>
  );
};

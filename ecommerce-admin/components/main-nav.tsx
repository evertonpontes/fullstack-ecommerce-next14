'use client';

import { cn } from '@/lib/utils';
import {
  AreaChartIcon,
  HouseIcon,
  MenuIcon,
  PackageIcon,
  PaletteIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const [innerWidth, setInnerWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const onResizeWindow = useCallback(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow);

    return () => {
      removeEventListener('resize', onResizeWindow);
    };
  }, [onResizeWindow]);

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      icon: HouseIcon,
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      icon: PackageIcon,
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      icon: PaletteIcon,
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      icon: ShoppingCartIcon,
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      icon: ShoppingBagIcon,
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      icon: SettingsIcon,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  if (!isMounted) {
    return null;
  }

  const Sidebar = () => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'ghost'} size={'icon'}>
            <MenuIcon className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="py-4 px-0">
          <nav className={cn('grid gap-4', className)}>
            <SheetHeader className="px-4">
              <SheetTitle className="flex items-center">
                <AreaChartIcon className="w-6 h-6 mr-2" />
                Admin
              </SheetTitle>
              <SheetDescription className="sr-only">
                Manage your stores.
              </SheetDescription>
            </SheetHeader>
            <Separator />
            <div className="grid gap-2 px-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center text-sm transition-colors hover:text-primary px-3 py-2',
                    route.active
                      ? 'text-primary font-medium bg-muted rounded-md'
                      : 'text-muted-foreground'
                  )}
                >
                  <route.icon className="w-4 h-4 mr-2" />
                  {route.label}
                </Link>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    );
  };

  return innerWidth >= 768 ? (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <div className="flex items-center">
        <AreaChartIcon className="w-6 h-6 mr-2" />
        <h2 className="text-base font-medium">Admin</h2>
      </div>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm transition-colors hover:text-primary',
            route.active ? 'text-primary font-medium' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  ) : (
    <Sidebar />
  );
};

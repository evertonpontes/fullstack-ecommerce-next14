import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ModalProps {
  title: String;
  description: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  Icon?: LucideIcon;
  iconClassName?: String;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  open,
  onClose,
  children,
  Icon,
  iconClassName,
}) => {
  const onChange = () => {
    if (open) onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {Icon && (
            <div className="flex items-center justify-center mb-4">
              <Icon className={cn(iconClassName)} />
            </div>
          )}
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

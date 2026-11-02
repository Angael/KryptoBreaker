import { Dialog as SheetPrimitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/lib/utils';

export const Sheet = SheetPrimitive.Root;
export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;

/** Left-anchored drawer. */
export function SheetContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content>) {
	return (
		<SheetPrimitive.Portal>
			<SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
			<SheetPrimitive.Content
				className={cn(
					'fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r bg-background pl-[env(safe-area-inset-left)] shadow-lg ease-(--ease-drawer)',
					'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=open]:slide-in-from-left data-[state=open]:duration-300',
					className,
				)}
				{...props}
			>
				{children}
			</SheetPrimitive.Content>
		</SheetPrimitive.Portal>
	);
}

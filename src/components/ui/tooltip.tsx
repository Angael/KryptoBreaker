import { Tooltip as TooltipPrimitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;

export function Tooltip({
	content,
	children,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & { content: React.ReactNode }) {
	return (
		<TooltipPrimitive.Root {...props}>
			<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Portal>
				<TooltipPrimitive.Content
					sideOffset={6}
					className={cn(
						'z-50 origin-(--radix-tooltip-content-transform-origin) rounded-md bg-foreground px-2.5 py-1.5 font-mono text-xs text-background',
						'animate-in fade-in-0 zoom-in-[0.97] duration-150 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.97] data-[state=instant-open]:animate-none',
					)}
				>
					{content}
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Portal>
		</TooltipPrimitive.Root>
	);
}

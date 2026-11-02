import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/lib/utils';

export function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
	return (
		<ToggleGroupPrimitive.Root
			data-slot="toggle-group"
			className={cn(
				'inline-flex min-h-10 w-fit max-w-full flex-wrap items-stretch rounded-md bg-muted p-1',
				className,
			)}
			{...props}
		/>
	);
}

export function ToggleGroupItem({
	className,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
	return (
		<ToggleGroupPrimitive.Item
			data-slot="toggle-group-item"
			className={cn(
				'inline-flex min-h-8 flex-1 items-center justify-center rounded-sm px-3 py-1 text-center text-sm font-medium text-balance text-muted-foreground transition-[color,background-color,box-shadow] duration-150 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
				'hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm',
				className,
			)}
			{...props}
		/>
	);
}

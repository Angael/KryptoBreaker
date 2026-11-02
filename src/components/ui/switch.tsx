import { Switch as SwitchPrimitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/lib/utils';

export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			className={cn(
				'inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent bg-input transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=checked]:bg-primary',
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb className="pointer-events-none block size-4 rounded-full bg-background shadow-sm transition-transform duration-150 ease-out data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0" />
		</SwitchPrimitive.Root>
	);
}

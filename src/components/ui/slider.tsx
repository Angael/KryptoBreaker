import { Slider as SliderPrimitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/lib/utils';

export function Slider({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
	return (
		<SliderPrimitive.Root
			className={cn('relative flex w-full touch-none items-center py-2 select-none', className)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
				<SliderPrimitive.Range className="absolute h-full bg-primary" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb
				aria-label={props['aria-label']}
				className="block size-5 rounded-full border-2 border-primary bg-background shadow-sm transition-[box-shadow] focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none"
			/>
		</SliderPrimitive.Root>
	);
}

import { CheckIcon, CopyIcon } from 'lucide-react';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import type { Computed } from '@/hooks/use-compute';
import { errorText, useT } from '@/i18n';
import { parseInteger } from '@/lib/crypto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

export function Section({
	title,
	children,
	className,
	bodyClassName,
}: {
	title: ReactNode;
	children: ReactNode;
	className?: string;
	bodyClassName?: string;
}) {
	return (
		<section className={cn('min-w-0 rounded-xl border bg-card text-card-foreground', className)}>
			<h2 className="border-b px-4 py-3 text-sm font-medium text-muted-foreground">{title}</h2>
			<div className={cn('p-4', bodyClassName)}>{children}</div>
		</section>
	);
}

export function Fields({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>{children}</div>;
}

interface FieldProps {
	label: ReactNode;
	value: string;
	onChange?: (value: string) => void;
	hint?: ReactNode;
	invalid?: boolean;
	numeric?: boolean;
	name?: string;
	className?: string;
}

/** Steps an integer string by `delta` with BigInt precision; leaves unparsable values alone. */
function stepInteger(raw: string, delta: bigint): string | null {
	const v = parseInteger(raw === '' ? '0' : raw);
	return v === null ? null : (v + delta).toString();
}

/**
 * Native number input behaviour (arrows, ↑/↓ keys, wheel while focused), but stepping with BigInt
 * so large keys don't lose precision.
 */
function useIntegerStepper(value: string, onChange?: (v: string) => void) {
	const ref = useRef<HTMLInputElement>(null);
	const latest = useRef({ value, onChange });
	useEffect(() => {
		latest.current = { value, onChange };
	});
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const onWheel = (e: WheelEvent) => {
			if (document.activeElement !== el || e.deltaY === 0) return;
			e.preventDefault();
			const next = stepInteger(latest.current.value, e.deltaY < 0 ? 1n : -1n);
			if (next !== null) latest.current.onChange?.(next);
		};
		el.addEventListener('wheel', onWheel, { passive: false });
		return () => el.removeEventListener('wheel', onWheel);
	}, []);
	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
		e.preventDefault();
		const next = stepInteger(value, e.key === 'ArrowUp' ? 1n : -1n);
		if (next !== null) onChange?.(next);
	};
	return { ref, onKeyDown };
}

export function Field({
	label,
	value,
	onChange,
	hint,
	invalid,
	numeric = true,
	name,
	className,
}: FieldProps) {
	const id = useId();
	const stepper = useIntegerStepper(value, onChange);
	const isNumberInput = numeric && !!onChange;
	return (
		<div className={cn('grid content-start gap-2', className)}>
			<Label htmlFor={id}>{label}</Label>
			<Input
				ref={isNumberInput ? stepper.ref : undefined}
				id={id}
				name={name}
				type={isNumberInput ? 'number' : 'text'}
				step={isNumberInput ? 1 : undefined}
				onKeyDown={isNumberInput ? stepper.onKeyDown : undefined}
				value={value}
				onChange={onChange ? (e) => onChange(e.target.value) : undefined}
				readOnly={!onChange}
				inputMode={numeric ? 'numeric' : 'text'}
				autoComplete="off"
				autoCapitalize="off"
				autoCorrect="off"
				spellCheck={false}
				aria-invalid={invalid || undefined}
				aria-describedby={hint ? `${id}-hint` : undefined}
				className={cn(numeric && 'font-mono tabular-nums', !onChange && 'bg-muted text-muted-foreground')}
			/>
			{hint && (
				<p id={`${id}-hint`} className="text-xs text-muted-foreground text-pretty">
					{hint}
				</p>
			)}
		</div>
	);
}

export function Segmented<T extends string>({
	value,
	onChange,
	options,
	label,
}: {
	value: T;
	onChange: (v: T) => void;
	options: { value: T; label: string }[];
	label: string;
}) {
	return (
		<ToggleGroup
			type="single"
			value={value}
			onValueChange={(v) => v && onChange(v as T)}
			aria-label={label}
			className="w-full sm:w-auto"
		>
			{options.map((o) => (
				<ToggleGroupItem key={o.value} value={o.value}>
					{o.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}

export function useEncryptDecrypt() {
	const t = useT();
	return [
		{ value: 'encrypt' as const, label: t.common.encrypt },
		{ value: 'decrypt' as const, label: t.common.decrypt },
	];
}

function CopyButton({ text }: { text: string }) {
	const t = useT();
	const [copied, setCopied] = useState(false);
	useEffect(() => {
		if (!copied) return;
		const t = setTimeout(() => setCopied(false), 1500);
		return () => clearTimeout(t);
	}, [copied]);
	return (
		<Button
			variant="ghost"
			size="icon"
			className="shrink-0 text-muted-foreground"
			aria-label={copied ? t.common.copied : t.common.copy}
			onClick={() => void navigator.clipboard?.writeText(text).then(() => setCopied(true))}
		>
			{copied ? <CheckIcon /> : <CopyIcon />}
		</Button>
	);
}

/** The answer of a page. Shows the domain error instead when inputs are invalid. */
export function Result<T>({
	computed,
	label,
	render,
	copy,
}: {
	computed: Computed<T>;
	label: ReactNode;
	render: (value: T) => ReactNode;
	copy?: (value: T) => string;
}) {
	const t = useT();
	return (
		<div
			data-testid="result"
			aria-live="polite"
			className={cn(
				'flex min-h-20 items-center gap-3 rounded-xl border px-4 py-3',
				computed.ok ? 'bg-highlight/50 border-primary/20' : 'border-destructive/40 bg-destructive/5',
			)}
		>
			{computed.ok ? (
				<>
					<div className="min-w-0 flex-1">
						<div className="text-xs font-medium text-muted-foreground">{label}</div>
						<div
							data-testid="result-value"
							className="mt-1 font-mono text-xl font-medium tabular-nums break-all sm:text-2xl"
						>
							{render(computed.value)}
						</div>
					</div>
					{copy && <CopyButton text={copy(computed.value)} />}
				</>
			) : (
				<p data-testid="result-error" className="text-sm text-destructive text-pretty">
					{errorText(t, computed.error)}
				</p>
			)}
		</div>
	);
}

/** Inline monospace math. */
export function M({ children, className }: { children: ReactNode; className?: string }) {
	return <span className={cn('font-mono tabular-nums', className)}>{children}</span>;
}

export function PowExpr({ base, exp, mod }: { base: ReactNode; exp: ReactNode; mod: ReactNode }) {
	return (
		<M>
			{base}
			<sup>{exp}</sup> mod {mod}
		</M>
	);
}

/** Large centered formula line. */
export function Formula({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<div className={cn('overflow-x-auto text-center font-mono text-base tabular-nums sm:text-lg', className)}>
			<div className="inline-block min-w-max px-1 py-1">{children}</div>
		</div>
	);
}

/** Horizontally scrollable table shell with consistent styling. */
export function DataTable({
	children,
	className,
	label,
}: {
	children: ReactNode;
	className?: string;
	label?: string;
}) {
	return (
		// Scrollable regions must be keyboard-focusable so wide tables can be scrolled without a mouse.
		// oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
		<section className={cn('overflow-x-auto rounded-lg border', className)} aria-label={label} tabIndex={0}>
			<table className="w-full border-collapse text-center font-mono text-sm tabular-nums [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-accent/70 [&_td]:border-t [&_td]:px-3 [&_td]:py-2 [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:font-medium [&_th]:text-muted-foreground [&_th[scope=row]]:text-left">
				{children}
			</table>
		</section>
	);
}

export function Note({ children }: { children: ReactNode }) {
	return <p className="text-sm text-muted-foreground text-pretty">{children}</p>;
}

export function Page({ children }: { children: ReactNode }) {
	return <div className="grid gap-4 sm:gap-6">{children}</div>;
}

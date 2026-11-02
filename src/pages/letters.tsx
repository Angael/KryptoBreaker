import { Note, Page } from '@/components/calc';
import { useT } from '@/i18n';
import { codeToLetter } from '@/lib/crypto';

const LETTERS = Array.from({ length: 26 }, (_, i) => ({ code: i, letter: codeToLetter(i) }));

export default function Letters() {
	const t = useT();
	return (
		<Page>
			<Note>{t.lettersPage.intro}</Note>
			<ol
				aria-label={t.lettersPage.listLabel}
				className="w-full max-w-48 overflow-hidden rounded-xl border bg-card font-mono tabular-nums"
			>
				{LETTERS.map(({ code, letter }) => (
					<li
						key={code}
						className="flex items-baseline justify-between border-b px-4 py-1.5 transition-colors last:border-b-0 even:bg-muted/40 hover:bg-accent"
					>
						<span className="text-lg font-medium">{letter}</span>
						<span className="text-muted-foreground">{code}</span>
					</li>
				))}
			</ol>
		</Page>
	);
}

import { Page, Section } from '@/components/calc';
import { codeToLetter } from '@/lib/crypto';

const LETTERS = Array.from({ length: 26 }, (_, i) => ({ code: i, letter: codeToLetter(i) }));

export default function Letters() {
	return (
		<Page>
			<Section title="a = 0 … z = 25">
				<ul className="grid grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-2 font-mono tabular-nums">
					{LETTERS.map(({ code, letter }) => (
						<li key={code} className="flex items-baseline justify-between rounded-md border px-3 py-2">
							<span className="text-lg font-medium">{letter}</span>
							<span className="text-muted-foreground">{code}</span>
						</li>
					))}
				</ul>
			</Section>
		</Page>
	);
}

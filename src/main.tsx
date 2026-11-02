import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Shell } from '@/components/layout/shell';
import { TooltipProvider } from '@/components/ui/tooltip';
import { allRoutes, home } from '@/routes';
import './index.css';

const Home = home.component;

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<TooltipProvider delayDuration={400} skipDelayDuration={300}>
				<Shell>
					<Routes>
						{allRoutes.map(({ path, component: Page }) => (
							<Route key={path} path={path} element={<Page />} />
						))}
						<Route path="*" element={<Home />} />
					</Routes>
				</Shell>
			</TooltipProvider>
		</BrowserRouter>
	</StrictMode>,
);

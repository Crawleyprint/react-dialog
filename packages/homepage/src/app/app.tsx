// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import '@crawleyprint/react-dialog/style.css';
import 'react-day-picker/dist/style.css';
import { Route, Routes, NavLink } from 'react-router-dom';

import Index from './pages/Index';
import DropdownPage from './pages/Dropdown';
import EmbedAnything from './pages/EmbedAnything';
import AlwaysOpen from './pages/AlwaysOpen';
import { navRoutes } from './consts';
import { getNavLinkClasses } from './utils/navigation';
import StandaloneHooks from './pages/StandaloneHooks';

export function App() {
  return (
    <div className={styles['container']}>
      <main className={styles.content}>
        <h1>HTML native dialogs in React</h1>
        <p>
          Dialogs are nice. They are a part of the HTML standard, easy to create
          and accessible. You can use keyboard to navigate them with very little
          effort and they, for the most part, work without javascript.
        </p>
        <p>
          However, most of the React dialog libraries are not using native
          dialog element, mostly because it's a fairly recent addition to the
          standard. They rely on various hacks instead, most of them involving
          portals.
        </p>
        <p>
          The trouble with portals is that they are rendered at the end of the
          DOM, which hurts accessibility very badly. In order to restore it,
          react dialogs and modals are going further down the hacky rabbit hole
          and use various focus traps which often don't work as intended.
        </p>
        <nav className={styles.navigation} role="navigation">
          {navRoutes.map(({ url, title }) => (
            <NavLink key={url} className={getNavLinkClasses(styles)} to={url}>
              {title}
            </NavLink>
          ))}
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/embed-elements" element={<EmbedAnything />} />
          <Route path="/open-by-default" element={<AlwaysOpen />} />
          <Route path="/hooks" element={<StandaloneHooks />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

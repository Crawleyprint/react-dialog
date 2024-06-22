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
import DropdownWithHooks from './pages/DropdownWithHooks';

export function App() {
  return (
    <div className={styles['container']}>
      <header>
        <h1>HTML native dialogs in React</h1>
      </header>
      <main className={styles.content}>
        <section>
          <p>
            Dialogs are nice. They are a part of the HTML standard, easy to
            create and accessible. You can use keyboard to navigate them with
            very little effort and they, for the most part, work without
            javascript.
          </p>
          <p>
            However, most of the React dialog libraries are not using native
            dialog element, mostly because it's a fairly recent addition to the
            standard. They rely on various hacks instead, most of them involving
            portals.
          </p>
          <p>
            The trouble with portals is that they are usually rendered at the
            end of the DOM, which hurts accessibility very badly. In order to
            restore it, react dialogs and modals are going further down the
            hacky rabbit hole and use various focus traps which often don't work
            as intended.
          </p>
        </section>
        <nav className={styles.navigation} role="navigation">
          <h2>Examples</h2>
          {navRoutes.map(({ url, title }, index) => (
            <>
              <NavLink
                key={url + index}
                tabIndex={0}
                className={getNavLinkClasses(styles)}
                to={url}
              >
                {title}
              </NavLink>
              {navRoutes.length !== index + 1 ? (
                <span
                  key={`separator-${url}-${index}`}
                  className={styles.separator}
                >
                  /
                </span>
              ) : null}
            </>
          ))}
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/embed-elements" element={<EmbedAnything />} />
          <Route path="/open-by-default" element={<AlwaysOpen />} />
          <Route path="/hooks" element={<StandaloneHooks />} />
          <Route path="/dropdown-with-hooks" element={<DropdownWithHooks />} />
        </Routes>
      </main>
      <footer>
        <nav className={styles.navigation}>
          <a
            href="https://github.com/Crawleyprint/react-dialog"
            target="_blank"
          >
            Github
          </a>
          <span className={styles.separator}>/</span>
          <a
            href="https://www.npmjs.com/package/@crawleyprint/react-dialog"
            target="_blank"
          >
            npm
          </a>
          <p className={styles.separator}>
            &copy; Copyrignt {new Date().getFullYear()} @crawleyprint
          </p>
        </nav>
      </footer>
    </div>
  );
}

export default App;

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

const canShare = typeof navigator.share === 'function';
export function App() {
  function share() {
    navigator?.share?.({ url: window.location.href });
  }
  function copyUrl() {
    navigator.clipboard.writeText(window.location.href);
  }
  return (
    <div className={styles['container']}>
      <header>
        <h1>HTML native dialogs in React</h1>
      </header>
      <main className={styles.content}>
        <nav className={styles.navigation} role="navigation">
          <p>
            <strong>
              TLDR; Dialogs are awesome. Here are some examples for you.{' '}
            </strong>
            If you're interested in why this library was made, read on.
          </p>
          <h2>Examples</h2>
          {navRoutes.map(({ url, title }, index) => (
            <>
              <NavLink
                key={url + index}
                tabIndex={0}
                className={`${styles['plain-link']} ${getNavLinkClasses(
                  styles
                )}`}
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
        <div className="examples">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dropdown" element={<DropdownPage />} />
            <Route path="/embed-elements" element={<EmbedAnything />} />
            <Route path="/open-by-default" element={<AlwaysOpen />} />
            <Route path="/hooks" element={<StandaloneHooks />} />
            <Route
              path="/dropdown-with-hooks"
              element={<DropdownWithHooks />}
            />
          </Routes>
        </div>
        <section>
          <h2>Reasoning</h2>
          <p className={styles['initial-letter']}>
            Dialogs are pretty great. They’re part of the{' '}
            <a
              href="https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element"
              target="_blank"
            >
              HTML standard
            </a>
            , included in{' '}
            <a
              href="https://web.dev/blog/introducing-baseline?hl=en"
              target="blank"
            >
              Baseline 2022
            </a>
            , easy to create, and super accessible. You can navigate them with
            your keyboard without much hassle, and they mostly work without
            JavaScript.
          </p>
          <p>
            But here's the thing: most React dialog libraries don't use the
            native dialog element because it's a relatively new addition to the
            standard. Instead, they use various hacks, often involving portals.
          </p>
          <p>
            The problem with portals is that they usually get rendered at the
            end of the DOM, which messes up accessibility. To fix this, React
            dialogs and modals dive deeper into hacky solutions, using focus
            traps that often don’t work as well as they should.
          </p>
          <h2>Benefits of using native dialogs in React</h2>
          <p>
            Using native dialog elements in React could simplify things a lot.
            They come with built-in features like automatic focus trapping, easy
            keyboard navigation, and a customizable backdrop out of the box.
            This means you get a background behind the dialog to focus attention
            on it without additional coding. Moreover, native dialogs don’t
            struggle with <code>overflow: hidden</code> and <code>z-index</code>{' '}
            issues because they are rendered on top of all other elements,
            ensuring they are always visible and accessible.​
          </p>
          <h2>Installation and usage</h2>
          <p>
            So, you're onboard the idea and want to try this? Great! Check it
            out on
            <a
              href="https://github.com/Crawleyprint/react-dialog"
              target="_blank"
            >
              Github
            </a>{' '}
            and{' '}
            <a
              href="https://www.npmjs.com/package/@crawleyprint/react-dialog"
              target="_blank"
            >
              npm
            </a>
            . Don't hesitate to open an issue if you try it and find it's
            missing something you'd need.
          </p>
          <h2>Credit where credit's due</h2>
          <p>
            While I was working on this library, I've used the works of others,
            mostly from these sources:
            <ol>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"
                  target="_blank"
                >
                  MDN Web Docs on dialog element
                </a>
              </li>
              <li>
                <a
                  href="https://css-tricks.com/dialog-components-roll-your-own/"
                  target="_blank"
                >
                  Rob Levin's excellent article on CSS Tricks
                </a>
              </li>
              <li>
                <a
                  href="https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element"
                  target="_blank"
                >
                  HTML Spec for the dialog element
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sjc5/use-html-dialog"
                  target="_blank"
                >
                  This hook by Samuel J. Cook
                </a>
              </li>
            </ol>
          </p>
        </section>
      </main>
      <footer>
        <section>
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
            {canShare ? (
              <>
                <span className={styles.separator}>/</span>
                <span className="plain-link" onClick={share}>
                  Share
                </span>
              </>
            ) : null}
            <span className={styles.separator}>/</span>
            <span className="plain-link" onClick={copyUrl}>
              Copy URL
            </span>
          </nav>
          <p className={styles.separator}>
            &copy; Copyright {new Date().getFullYear()} @crawleyprint
          </p>
        </section>
      </footer>
    </div>
  );
}

export default App;

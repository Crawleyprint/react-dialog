// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import '@crawleyprint/react-dialog/style.css';
import 'react-day-picker/dist/style.css';
import { Route, Routes, NavLink } from 'react-router-dom';

import Index from './pages/Index';
import DropdownPage from './pages/Dropdown';
import EmbedAnything from './pages/EmbedAnything';
import AlwaysOpen from './pages/AlwaysOpen';

const getNavLinkClasses = ({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) => {
  let classes = [styles.navLink];
  if (isActive) {
    classes.push(styles.isActive);
  }

  if (isPending) {
    classes.push(styles.isPending);
  }
  return classes.join(' ');
};

export function App() {
  const navRoutes = [
    {
      url: '/',
      title: 'Classic with backdrop',
    },
    {
      url: '/dropdown',
      title: 'Dropdown-like',
    },
    { url: '/embed-elements', title: 'Embed anything' },
    { url: '/open-by-default', title: 'Open by default' },
  ];
  return (
    <div className={styles['container']}>
      <main className={styles.content}>
        <h1>HTML native dialogs</h1>
        <p>
          Dialogs are nice. They are a part of the HTML standard, easy to create
          and accessible. You can use keyboard to navigate them with very little
          effort and they, for the most part, work without javascript.
        </p>
        <nav>
          {navRoutes.map(({ url, title }) => (
            <NavLink key={url} className={getNavLinkClasses} to={url}>
              {title}
            </NavLink>
          ))}
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/embed-elements" element={<EmbedAnything />} />
          <Route path="/open-by-default" element={<AlwaysOpen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

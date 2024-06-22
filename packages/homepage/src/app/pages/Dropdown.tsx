import { Dropdown as LibDropdown, Dialog } from '@crawleyprint/react-dialog';
import { useEffect, useMemo, useState } from 'react';

export default function DropdownPage() {
  const [isMobile, setIsMobile] = useState(false);
  // naive implementation of mobile device detection
  useEffect(() => {
    function onWindowResize() {
      setIsMobile(window.innerWidth < 1000);
    }
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);
  const Dropdown = useMemo(() => {
    return isMobile ? Dialog : LibDropdown;
  }, [isMobile]);
  return (
    <>
      {isMobile ? (
        <p>
          <i>
            Since you're viewing this on a smaller screen, all dropdowns will
            open in dialog mode to stay visible.
          </i>
        </p>
      ) : null}
      <div className="dropdown-grid">
        <Dropdown targetLabel="Open &#x2193;">
          <h1>Dropdown</h1>
          <main>
            <p>
              Dialogs can be made to function like fully stylable, accessible
              dropdown that can be navigable by keyboard and closeable by{' '}
              <kbd>Esc</kbd>
            </p>
            <ul>
              {Array.from(new Array(5).fill(1), (_, index) => {
                return (
                  <li key={index}>
                    <label>
                      <input
                        tabIndex={index === 1 ? -1 : 0}
                        type="checkbox"
                        name="checkbox"
                        value={`Check ${index + 1}`}
                        {...{ disabled: index === 0 }}
                      />
                      Checkbox {index + 1}
                    </label>
                  </li>
                );
              })}
            </ul>
          </main>
        </Dropdown>
        <Dropdown targetLabel="Open &#x2190;" placement="left">
          <h1>Dropdown</h1>
          <main>
            <p>
              Dialogs can be made to function like fully stylable, accessible
              dropdown that can be navigable by keyboard and closeable by{' '}
              <kbd>Esc</kbd>
            </p>
            <ul>
              {Array.from(new Array(5).fill(1), (_, index) => (
                <li key={index}>
                  <label>
                    <input
                      tabIndex={0}
                      type="checkbox"
                      name="checkbox"
                      value={`Check ${index}`}
                    />
                    Checkbox 1
                  </label>
                </li>
              ))}
            </ul>
          </main>
        </Dropdown>
        <Dropdown targetLabel="Open &#x2192;" placement="right">
          <h1>Dropdown</h1>
          <main>
            <p>
              Dialogs can be made to function like fully stylable, accessible
              dropdown that can be navigable by keyboard and closeable by{' '}
              <kbd>Esc</kbd>
            </p>
            <ul>
              {Array.from(new Array(5).fill(1), (_, index) => (
                <li key={index}>
                  <label>
                    <input
                      tabIndex={0}
                      type="checkbox"
                      name="checkbox"
                      value={`Check ${index}`}
                    />
                    Checkbox 1
                  </label>
                </li>
              ))}
            </ul>
          </main>
        </Dropdown>
        <Dropdown targetLabel="Open &#x2191;" placement="top">
          <h1>Dropdown</h1>
          <main>
            <p>
              Dialogs can be made to function like fully stylable, accessible
              dropdown that can be navigable by keyboard and closeable by{' '}
              <kbd>Esc</kbd>
            </p>
            <ul>
              {Array.from(new Array(5).fill(1), (_, index) => (
                <li key={index}>
                  <label>
                    <input
                      tabIndex={0}
                      type="checkbox"
                      name="checkbox"
                      value={`Check ${index}`}
                    />
                    Checkbox 1
                  </label>
                </li>
              ))}
            </ul>
          </main>
        </Dropdown>
      </div>

      <div>
        <p>
          <sup>*</sup> Dropdowns use <code>useFloating()</code> hook from{' '}
          <a href="https://floating-ui.com/docs/useFloating" target="_blank">
            @floating-ui/react-dom
          </a>{' '}
          to position themselves, and you can choose any of the middlewares they
          support.
        </p>
        <p>
          The examples above use <code>shift()</code>, <code>offset()</code>,
          <code>flip()</code> and <code>arrow()</code>.
        </p>
      </div>
    </>
  );
}

import { Dialog } from '@crawleyprint/react-dialog';

export default function DropdownPage() {
  return (
    <>
      <Dialog targetLabel="Open dropdown" flyout="down" style={{ width: 400 }}>
        <h1>Dropdown</h1>
        <main>
          <p>
            Dialogs can be made to function like fully stylable, accessible
            dropdown that can be navigable by keyboard and closeable by{' '}
            <kbd>Esc</kbd>
          </p>
          <ul>
            {Array.from(new Array(5), (_, index) => (
              <li key={Math.random()}>
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
      </Dialog>

      <div>
        <p>
          This is a proof of concept so don't expect everything to work
          flawlessly. Treat it as a start of something that can replace the
          enormous amount of hacks that are currently present in various
          libraries that are being used today.
        </p>
      </div>
    </>
  );
}

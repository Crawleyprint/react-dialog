import { Dialog } from '@crawleyprint/react-dialog';

export default function DropdownPage() {
  return (
    <>
      <Dialog targetLabel="Open dropdown" type="flyout">
        <h1>Dropdown</h1>
        <main>
          <p>
            Dialogs can be made to function like fully stylable, accessible
            dropdown that can be navigable by keyboard and closeable by{' '}
            <kbd>Esc</kbd>
          </p>
          <ul>
            <li>
              <label>
                <input
                  tabIndex={0}
                  type="checkbox"
                  name="checkbox"
                  value="Check 1"
                />
                Checkbox 1
              </label>
            </li>
            <li>
              <label>
                <input
                  tabIndex={0}
                  type="checkbox"
                  name="checkbox"
                  value="Check 2"
                />
                Checkbox 2
              </label>
            </li>
            <li>
              <label>
                <input
                  tabIndex={0}
                  type="checkbox"
                  name="checkbox"
                  value="Check 3"
                />
                Checkbox 3
              </label>
            </li>
            <li>
              <label>
                <input
                  tabIndex={0}
                  type="checkbox"
                  name="checkbox"
                  value="Check 4"
                />
                Checkbox 4
              </label>
            </li>
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

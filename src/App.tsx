import { ChangeEvent, useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./App.css";
import Dialog from "./components/Dialog";

function App() {
  const previousInputValue = useRef("");
  const [inputValue, setInputValue] = useState<string>("");
  const [hasInputChanged, setHasInputChanged] = useState<boolean>(false);
  const [selected, setSelected] = useState<Date>();
  function updateInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  return (
    <div className="container">
      <main className="content">
        <h1>HTML native dialogs</h1>
        <p>
          Dialogs are nice. They are a part of the HTML standard, easy to create
          and accessible. You can use keyboard to navigate them with very little
          effort and they, for the most part, work without javascript.
        </p>
        <div className="dialog-value">
          {hasInputChanged
            ? `You've entered: ${inputValue}`
            : "This text will change when you update the dialog."}
        </div>
        <Dialog
          onClose={() => {
            if (previousInputValue.current !== inputValue) {
              previousInputValue.current = inputValue;
            }
            setHasInputChanged(previousInputValue.current === inputValue);
          }}
          targetLabel="Click to open dialog"
        >
          <header>
            <h1>Dialog title</h1>
          </header>
          <form method="dialog">
            <main>
              <label htmlFor="text">
                Type in the text below and it will be shown when you close the
                dialog
                <input type="text" onChange={updateInput} value={inputValue} />
              </label>
            </main>
          </form>
        </Dialog>
        <Dialog targetLabel="Open dropdown" type="flyout">
          <h1>Dropdown</h1>
          <main>
            <p>
              Dialogs can be made to function like fully stylable, accessible
              dropdown that can be navigable by keyboard and closeable by{" "}
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
        <Dialog targetLabel="Open calendar" type="flyout">
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </Dialog>
        <p>Selected Date is: {selected?.toISOString()}</p>
      </main>
    </div>
  );
}

export default App;

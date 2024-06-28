'use client';
import { Dialog } from '@crawleyprint/react-dialog';
import { useRef, useState } from 'react';

export default function Index() {
  const previousInputValue = useRef('');
  const [inputValue, setInputValue] = useState<string>('');
  const [hasInputChanged, setHasInputChanged] = useState<boolean>(false);
  function updateInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <>
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
      <div className="dialog-value">
        <p>
          {hasInputChanged
            ? `You've entered: ${inputValue || 'nothing'}`
            : 'This text will change when you update the dialog.'}
        </p>
      </div>
    </>
  );
}

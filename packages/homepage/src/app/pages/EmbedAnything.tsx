import { Dialog } from '@crawleyprint/react-dialog';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

export default function EmbedAnything() {
  const [selected, setSelected] = useState<Date>();
  return (
    <>
      <Dialog targetLabel="Open calendar" flyout="down">
        <DayPicker mode="single" selected={selected} onSelect={setSelected} />
      </Dialog>
      <p>Selected Date is: {selected?.toISOString()}</p>
    </>
  );
}

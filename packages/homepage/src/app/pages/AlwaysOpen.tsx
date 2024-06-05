import { Dialog } from '@crawleyprint/react-dialog';

export default function AlwaysOpen() {
  return (
    <>
      <Dialog
        isOpen
        targetLabel="Open again"
        style={{
          width: '50ch',
        }}
      >
        <p>
          The open-by-default dialog box is a pre-set element that opens by
          default when displayed. Upon initialization, the dialog box
          automatically displays its content to the user without requiring any
          additional interactions.
        </p>
      </Dialog>
    </>
  );
}

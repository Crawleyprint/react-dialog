import { useRef } from 'react';
import type { FC, ReactNode } from 'react';

type DialogProps = {
    targetLabel: string;
    onClose?: () => void;
    children?: ReactNode;
};
const Dialog: FC<DialogProps> = ({ targetLabel, children, onClose, }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    function showDialog() {
        if (!dialogRef?.current) return;
        dialogRef.current.addEventListener('close', onDialogClose);
        dialogRef.current.showModal();
    }
    function onDialogClose() {
        onClose?.();
        dialogRef?.current?.close();
        dialogRef?.current?.removeEventListener('close', onDialogClose);
    }
    return (
        <>
            <button 
                type="button" 
                onClick={showDialog}
                className="btn dialog-open" 
                tabIndex={0}>{targetLabel}
            </button>
            <dialog ref={ dialogRef } className="dialog">
                {children}
                <button tabIndex={0} className="btn" onClick={onDialogClose}>Close dialog</button>
            </dialog>
        </>
    )
}

export default Dialog;
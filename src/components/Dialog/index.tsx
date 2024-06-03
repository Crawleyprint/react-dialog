import { useRef } from 'react';
import type { FC, ReactNode } from 'react';

type DialogProps = {
    targetLabel: string;
    onClose?: () => void;
    children?: ReactNode;
};
const Dialog: FC<DialogProps> = ({ targetLabel, children, onClose, }) => {
    const dialogRef = useRef(undefined);
    return (
        <>
            <button 
                type="button" 
                className="btn dialog-open" 
                tabIndex={0}>{targetLabel}</button>
            <dialog ref={ dialogRef } className="dialog">{children}</dialog>
        </>
    )
}

export default Dialog;
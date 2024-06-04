import styles from './react-dialog.module.css';

/* eslint-disable-next-line */
export interface ReactDialogProps {}

export function ReactDialog(props: ReactDialogProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactDialog!</h1>
    </div>
  );
}

export default ReactDialog;

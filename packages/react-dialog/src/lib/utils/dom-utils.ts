export function getFocusableElements(dialog: HTMLDialogElement | null) {
  return Array.from(
    dialog?.querySelectorAll(
      [
        'a[href]',
        'select',
        'button',
        'textarea',
        'input:not([type=hidden])',
        '[tabindex]',
      ].join(', ')
    ) ?? []
  ).filter((el) => {
    const hasTabIndexValue = el.hasAttribute('tabindex');
    const isDisabled = el.hasAttribute('disabled');
    if (hasTabIndexValue) {
      if (Number(el.getAttribute('tabindex')) < 0) {
        return false;
      }
    }
    return !isDisabled;
  });
}

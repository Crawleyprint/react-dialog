export function getNavLinkClasses(styles: Record<string, string>) {
  return ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => {
    let classes = [styles.navLink];
    if (isActive) {
      classes.push(styles.isActive);
    }

    if (isPending) {
      classes.push(styles.isPending);
    }
    return classes.join(' ');
  };
}

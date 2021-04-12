export const scrollToChild = (
  usersContainer: HTMLElement,
  childId: number
): void => {
  if (usersContainer && childId !== null) {
    const parrent = usersContainer;
    const parrentsChildren: any[] = Array.from(usersContainer.children);

    const children: HTMLElement = parrentsChildren[childId - 1];

    const root = document.querySelector(".root");
    if (root) {
      window.scrollTo({
        top: children.offsetTop - parrent.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }
};

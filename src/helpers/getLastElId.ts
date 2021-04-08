export const getLastElId = (
  userId: number,
  usersContainer: HTMLElement
): number | null => {
  const containerWidth = usersContainer.offsetWidth;

  const children: any[] = Array.from(usersContainer.children);

  /* Create Rows */
  const elementsInContainer = [];
  let row = [];

  let childrensTotalWidth = 0;

  // eslint-disable-next-line prefer-const
  for (let [index, child] of children.entries()) {
    if (child.className === "user") {
      childrensTotalWidth += child.offsetWidth;

      if (childrensTotalWidth >= containerWidth) {
        childrensTotalWidth = child.offsetWidth;
        elementsInContainer.push(row);
        row = [];
      }

      row.push(child);
    }

    if (index === children.length - 1) {
      childrensTotalWidth = 0;
      elementsInContainer.push(row);
      row = [];
    }
  }

  /* Get The last Element in the row, respectively to the Id of the selectes element */
  const lastIdRow = elementsInContainer.find(
    (elements) => userId <= Number(elements[elements.length - 1].dataset.userid)
  );

  if (!lastIdRow) {
    return null;
  }

  const theLastUserId = Number(lastIdRow[lastIdRow.length - 1].dataset.userid);
  return theLastUserId;
};

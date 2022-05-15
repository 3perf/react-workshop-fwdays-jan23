export const loadNotesFromLocalStorage = () => {
  const parsedNotes = JSON.parse(localStorage.reactWorkshopAppNotes || "{}");

  return parsedNotes;
};

export const saveNotesToLocalStorage = (notes) => {
  const stringifiedNotes = JSON.stringify(notes);

  localStorage.reactWorkshopAppNotes = stringifiedNotes;
};

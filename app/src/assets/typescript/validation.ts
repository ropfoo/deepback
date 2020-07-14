export const letterValidation = (
  title: string,
  body: string,
  userID: string
) => {
  if (!title.length || !body.length || !userID.length) {
    return false;
  }
  return true;
};

export const letterValidation = (title: string, body: string) => {
  console.log(title.length);
  if (!title.length || !body.length) {
    return false;
  }
  return true;
};

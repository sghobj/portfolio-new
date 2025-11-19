export const formatDate = (date: Date | string) => {
  if (date instanceof Date) {
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
  } else {
    {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return `${(parsedDate.getMonth() + 1).toString().padStart(2, "0")}.${parsedDate.getFullYear()}`;
      } else {
        throw new Error("Invalid date string provided");
      }
    }
  }
};

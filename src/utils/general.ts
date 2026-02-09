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

export const getStrapiMedia = (url: string | null | undefined) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${import.meta.env.VITE_STRAPI_BASE_URL}${url}`;
};

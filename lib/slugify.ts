export function slugify(
  text: string,
  options?: any
) {
  const shortText = text
    .split(" ")
    .slice(0, 5)
    .join(" ");

  return shortText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
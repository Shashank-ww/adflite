export function slugify(
text: string, p0: { lower: boolean; strict: boolean; trim: boolean; }) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
/** "1 product", "3 products". */
export function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text

  return text.substring(0, maxLength - 3) + '...'
}

export function cellphoneMask(value: string): string {
  if (!value) return ''

  // Remove non-numeric characters
  value = value.replace(/\D/g, '')

  // Limit to 11 characters
  if (value.length > 11) {
    value = value.substring(0, 11)
  }

  // Apply the mask
  return value
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
}

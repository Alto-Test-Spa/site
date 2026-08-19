export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value.trim())
}

// Accepts +56 9 1234 5678, 56912345678, 912345678, with any mix of
// spaces/dashes/parens. Chilean national numbers are 9 digits starting 2-9
// (9 = mobile, 2 = Santiago landline, other regions use other leading digits).
export function isValidChileanPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  const national =
    digits.startsWith("56") && digits.length === 11 ? digits.slice(2) : digits
  return /^[2-9]\d{8}$/.test(national)
}

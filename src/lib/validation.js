export function validateAuth(values, isRegister) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    return "Enter a valid email address.";
  if (!values.password) return "Enter your password.";
  if (isRegister) {
    if (!values.name?.trim()) return "Enter your name.";
    if (
      values.password.length < 6 ||
      !/[A-Z]/.test(values.password) ||
      !/[a-z]/.test(values.password)
    )
      return "Use at least 6 characters with uppercase and lowercase letters.";
    try {
      if (!["http:", "https:"].includes(new URL(values.image).protocol))
        throw new Error();
    } catch {
      return "Enter a valid photo URL starting with https:// or http://.";
    }
  }
  return null;
}

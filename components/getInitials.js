export function getInitials(user) {
  // 1) Full name ─ "Ada Lovelace"  → "AL"
  if (user?.name) {
    const parts = user.name.trim().split(/\s+/);
    const first  = parts[0][0] || "";
    const last   = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  // 2) Fallback to email ─ "ada@compute.io" → "A"
  if (user?.email) return user.email[0].toUpperCase();

  // 3) Nothing available
  return "?";
}
export const maskEmail = (email) => {
  if (!email) return;

  const [name, domain] = email.split('@');

  if (!name || !domain) return email;

  if (name.length === 1) {
    return `*@${domain}`;
  }

  const firstChar = name[0];
  const masked = '*'.repeat(Math.max(name.length - 1, 1));

  return `${firstChar}${masked}@${domain}`;
};

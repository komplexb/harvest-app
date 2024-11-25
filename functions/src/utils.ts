export const encodeEmail = (email: string): string => {
  return email.replace(/\./g, ',');
};

export const decodeEmail = (encodedEmail: string): string => {
  return encodedEmail.replace(/,/g, '.');
};

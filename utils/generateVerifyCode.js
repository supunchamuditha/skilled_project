export const generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const getVerificationTokenExpiration = () => {
  const currentTime = new Date();
  const expirationDate = new Date(currentTime.getTime() + 30 * 60 * 1000);
  expirationDate.setMilliseconds(0);
  return expirationDate;
};

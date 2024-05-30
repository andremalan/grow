export const formatPrice = (number: number) => {
  return `$${(number / 100).toFixed(2)}`;
};

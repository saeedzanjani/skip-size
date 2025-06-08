export function getTotalPrice(priceBeforeVat: number, vat: number) {
  return priceBeforeVat + (priceBeforeVat * vat) / 100;
}

export const formatPrice = (price: number): string => {
  return `£${price.toFixed(2)}`;
};

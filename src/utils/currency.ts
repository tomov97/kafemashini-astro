export function formatBGN(price: number | null): string {
  if (price === null) return '';
  return `${price.toFixed(2)} лв.`;
}

export function formatEUR(price: number | null): string {
  if (price === null) return '';
  return `€${price.toFixed(2)}`;
}

export function formatDualPrice(priceBGN: number | null, priceEUR: number | null): string {
  if (priceBGN === null) return 'По запитване';
  const bgn = formatBGN(priceBGN);
  const eur = priceEUR ? ` / ${formatEUR(priceEUR)}` : '';
  return `${bgn}${eur}`;
}

export function formatCurrency(amount, currency) {
  const currencySymbol = currency.includes('USD') ? '$' : ''
  return `${currencySymbol}${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${currency}`
}

export function formatDateAndAmount(date, amount, currency = 'BUSD', price = 0) {
  const dateAndAmount = `${date} | ${formatCurrency(amount, currency)}`
  if (currency !== 'RC') return dateAndAmount
  const approximateUSDAmount = formatApproximateCurrencyInDollars(price, amount)
  return `${dateAndAmount} ${approximateUSDAmount}`
}

export function formatApproximateCurrencyInDollars(price, tokens) {
  return `(~${formatCurrency(price * tokens, 'USD')})`
}

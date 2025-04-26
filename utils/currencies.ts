export const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
}

export const currencyOptions = [
  { value: "USD", symbol: "$", name: "US Dollar" },
  { value: "EUR", symbol: "€", name: "Euro" },
  { value: "GBP", symbol: "£", name: "British Pound" },
  { value: "JPY", symbol: "¥", name: "Japanese Yen" },
  { value: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { value: "AUD", symbol: "A$", name: "Australian Dollar" },
  { value: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { value: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { value: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { value: "SGD", symbol: "S$", name: "Singapore Dollar" }
]

export const getCurrencyDisplay = (currencyCode: string) => {
  const currency = currencyOptions.find(opt => opt.value === currencyCode)
  return currency ? `${currency.value} - ${currency.symbol}` : currencyCode
}

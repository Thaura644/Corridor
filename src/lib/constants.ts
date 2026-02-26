export const AFRICAN_CURRENCIES = [
  { code: 'KES', name: 'Kenyan Shilling', country: 'Kenya', flag: '🇰🇪', region: 'East Africa' },
  { code: 'UGX', name: 'Ugandan Shilling', country: 'Uganda', flag: '🇺🇬', region: 'East Africa' },
  { code: 'NGN', name: 'Nigerian Naira', country: 'Nigeria', flag: '🇳🇬', region: 'West Africa' },
  { code: 'GHS', name: 'Ghanaian Cedi', country: 'Ghana', flag: '🇬🇭', region: 'West Africa' },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', flag: '🇿🇦', region: 'Southern Africa' },
  { code: 'RWF', name: 'Rwandan Franc', country: 'Rwanda', flag: '🇷🇼', region: 'East Africa' },
  { code: 'TZS', name: 'Tanzanian Shilling', country: 'Tanzania', flag: '🇹🇿', region: 'East Africa' },
  { code: 'USD', name: 'US Dollar', country: 'International', flag: '🇺🇸', region: 'Global' },
] as const;

export type AfricanCurrencyCode = typeof AFRICAN_CURRENCIES[number]['code'];

export const REGIONAL_POOLS = [
  { id: 'EAST_AFRICA', name: 'East Africa Pool', currencies: ['KES', 'UGX', 'RWF', 'TZS'] },
  { id: 'WEST_AFRICA', name: 'West Africa Pool', currencies: ['NGN', 'GHS'] },
  { id: 'SOUTHERN_AFRICA', name: 'Southern Africa Pool', currencies: ['ZAR'] },
];

export type Market = {
  id?: string;
  currency?: string;
  days?: any;
}

export type Chart = {
  market?: string;
  count?: number;
  period?: 'minutes' | 'days' | 'weeks' | 'months' | string;
}
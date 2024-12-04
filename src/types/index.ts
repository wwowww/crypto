export type Market = {
  id?: string;
  currency?: string;
  days?: any;
}

export type Chart = {
  id?: string;
  count?: number; 
  period?: 'minutes' | 'days' | 'weeks' | 'months' | string;
}
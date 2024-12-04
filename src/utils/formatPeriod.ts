export const formatPeriod = ({period, entry}: {period: string, entry: any}) => {
  const date = new Date(entry.candle_date_time_kst);

  if (period === 'minutes') {
    return `${date.getHours()}:${date.getMinutes()}`;
  } else if (period === 'days') {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  } else if (period === 'weeks') {
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    return `${weekStart.getMonth() + 1}/${weekStart.getDate()}`;
  } else if (period === 'months') {
    return `${date.getMonth() + 1}`;
  }
  return "";
}
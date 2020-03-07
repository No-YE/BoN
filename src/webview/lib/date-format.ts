export default (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDay();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();

  return `${year}.${month + 1}.${day} ${hour}:${minute}`;
};

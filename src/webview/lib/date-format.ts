export default (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}.${month + 1}.${day} ${hour}:${minute}`;
};

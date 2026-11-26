export const getTodayDateString = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const padZero = (value: number) => {
    const stringifiedNumber = value.toString();
    return stringifiedNumber.padStart(2, "0");
  };
  return `${year}-${padZero(month)}-${padZero(day)}`;
};
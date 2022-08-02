export const getDays = (d1: Date, d2: Date) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Difference_In_Days
}
export const convertSecondsToMinutes = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);

  // 👇️ get remainder of seconds
  const seconds = Math.trunc(totalSeconds % 60);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

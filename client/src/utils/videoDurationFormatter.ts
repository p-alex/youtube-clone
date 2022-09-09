const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export const videoDurationFormatter = (time: number) => {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  }
  return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(
    seconds
  )}`;
};

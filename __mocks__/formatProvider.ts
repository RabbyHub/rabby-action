export function getTimeSpan(times: number) {
  if (isNaN(+times)) {
    times = 0;
  }
  const int = Math.floor(times);
  let d = Math.floor(int / 60 / 60 / 24);
  const h = Math.floor((int / 60 / 60) % 24);
  const m = Math.floor((int / 60) % 60);
  const s = Math.floor(int % 60);
  if (d >= 365000) {
    d = 365000;
  }
  return {
    d,
    h,
    m,
    s,
  };
}

export const formatProvider = {
  getTimeSpan,
  hasAddress: jest.fn().mockReturnValue(true),
};

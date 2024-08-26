export function getTimeSpan(times: number) {
  return {
    d: 1539,
    h: 1,
    m: 2,
    s: 3,
  };
}

export const formatProvider = {
  getTimeSpan,
  hasAddress: jest.fn().mockReturnValue(true),
};

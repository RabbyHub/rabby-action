export const isNullableBoolean = (value: unknown): value is boolean | null =>
  value === null || typeof value === 'boolean';

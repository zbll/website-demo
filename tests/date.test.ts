import { useDate } from '../app/hooks/useDate';
import { expect, describe, it } from 'vitest';
import dayjs from 'dayjs';

describe('useDate', () => {
  const { n, fmt } = useDate();
  it('n', () => {
    const dateNow = Date.now(),
      now = n();
    expect(now).toBeGreaterThanOrEqual(dateNow);
  });

  it('fmt', () => {
    const date = new Date(),
      dateStr = fmt(date);
    expect(dateStr).toBe(dayjs(date).format('YYYY-MM-DD HH:mm:ss'));
  });
});

export function useDate() {
  const n = () => Date.now();

  const fmt = (date: Date, fmt = 'YYYY-MM-dd HH:mm:ss') => _date_format(date, fmt);

  const _fmt_options: Record<string, (date: Date) => string> = {
    YYYY: (date: Date) => date.getFullYear().toString().padStart(4, '0'),
    MM: (date: Date) => (date.getMonth() + 1).toString().padStart(2, '0'),
    dd: (date: Date) => date.getDate().toString().padStart(2, '0'),
    HH: (date: Date) => date.getHours().toString().padStart(2, '0'),
    hh: (date: Date) => (date.getHours() % 12).toString().padStart(2, '0'),
    mm: (date: Date) => date.getMinutes().toString().padStart(2, '0'),
    ss: (date: Date) => date.getSeconds().toString().padStart(2, '0'),
    SSS: (date: Date) => date.getMilliseconds().toString().padStart(3, '0'),
    M: (date: Date) => date.getMonth().toString(),
    d: (date: Date) => date.getDate().toString(),
    h: (date: Date) => date.getHours().toString(),
    m: (date: Date) => date.getMinutes().toString(),
    s: (date: Date) => date.getSeconds().toString(),
    a: (date: Date) => (date.getHours() < 12 ? 'am' : 'pm'),
    A: (date: Date) => (date.getHours() < 12 ? 'AM' : 'PM'),
  };

  const _date_format = (date: Date, fmt: string) => {
    return fmt.replace(/YYYY|MM|dd|HH|mm|ss|SSS|M|d|h|m|s|a/g, (match) =>
      _fmt_options[match](date)
    );
  };

  return {
    n,
    fmt,
  };
}

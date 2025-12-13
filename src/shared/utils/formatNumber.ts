interface FormatOptions {
  suffix?: string;
  prefix?: string;
}

export function formatNumber(
  number: string | number,
  options: FormatOptions = {}
): string {
  const { suffix = "", prefix = "" } = options;

  const formatted = Number(number).toLocaleString();

  return suffix ? `${prefix}${formatted}${suffix}` : formatted;
}

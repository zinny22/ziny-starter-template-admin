/**
 * 가격을 1,000원 단위로 변환, suffix와 prefix를 추가할 수 있음
 */
export function formatPrice(price: string | number, suffix: string = "", prefix: string = ""): string {
    const formatted = Number(price).toLocaleString();
    return suffix ? `${prefix}${formatted}${suffix}` : formatted;
}

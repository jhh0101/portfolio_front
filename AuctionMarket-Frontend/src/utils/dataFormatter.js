export const getFormattedDate = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date - tzOffset).toISOString().slice(0, 16);
};
export const formatTime = (time) => (time ? `${time}:00` : "");
export const formatPrice = (price) => price.toLocaleString() + "원";

export const formatBidVerification = (price) => {
    const num = Number(price);
    if (isNaN(num) || num === 0) return '금액을 입력해 주세요.';

    const uk = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000);
    const remainder = num % 10000;

    let result = '';

    if (uk > 0) result += `${uk.toLocaleString()}억 `;
    if (man > 0) result += `${man.toLocaleString()}만 `;
    if (remainder > 0 || (uk === 0 && man === 0)) {
        result += `${remainder.toLocaleString()}원`;
    } else {
        result += '원';
    }

    return `입찰 희망가: ${result.trim()}`;
};


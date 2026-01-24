export const getFormattedDate = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date - tzOffset).toISOString().slice(0, 16);
};
export const formatTime = (time) => (time ? `${time}:00` : "");
export const formatPrice = (price) => price.toLocaleString() + "원";
import './AdminModal.css';

const AdminBidCard = ({ rank, nickname, price, bidTime, status }) => {

    // 날짜 포맷팅 (YYYY. M. D.)
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
    };

    return (
        <div className="bidder-card">
            <div className="col-rank">{rank}</div>
            <div className="col-nick">{nickname}</div>
            <div className="col-price">{price.toLocaleString()}원</div>
            <div className="col-date">{formatDate(bidTime)}</div>
            <div className="col-status">
                <span className={`status-badge ${status === 'ACTIVE' ? 'status-active' : ''}`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

export default AdminBidCard;
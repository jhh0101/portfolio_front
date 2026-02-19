import './RatingModal.css';
import { Star } from "lucide-react";

export default function RatingList({rating}) {
    return (
        <div className="bidder-card" style={{ display: "flex", width: "100%", alignItems: "center" }}>

            {/* 1. 작성자 */}
            <div className="card-col from" style={{ width: "15%", textAlign: "center" }}>
                {rating?.fromNickname}
            </div>

            {/* 2. 상품명 */}
            <div className="card-col product" style={{ width: "25%", textAlign: "center" }}>
                {rating?.title}
            </div>

            {/* 3. Comment (✨ 긴 글자 방어 로직 적용 ✨) */}
            <div
                className="card-col comment"
                style={{
                    width: "50%",
                    textAlign: "center",
                    whiteSpace: "nowrap",      // 줄바꿈 방지 (한 줄로 고정)
                    overflow: "hidden",        // 영역(50%)을 벗어나는 글자 자르기
                    textOverflow: "ellipsis",  // 잘린 글자 끝에 '...' 붙이기
                    padding: "0 10px"          // 글자가 너무 꽉 차지 않게 양옆 여백
                }}
                title={rating?.comment} // 💡 툴팁: 마우스를 올리면 원본 전체 글씨가 보임
            >
                {rating?.comment}
            </div>

            {/* 4. Score */}
            <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="star-rating-container" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <Star
                            key={num}
                            size={16}
                            fill={num <= rating?.score ? "#ffd700" : "none"}
                            color={num <= rating?.score ? "#ffd700" : "#e4e5e9"}
                            style={{
                                cursor: "default",
                                flexShrink: 0 // ✨ 아무리 화면이 좁아져도 별 크기는 찌그러지지 않게 방어
                            }}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
import { useState, useEffect } from 'react';
import { useRatingWrite } from "@/hooks/rating/useRatingWrite.js";
import { useRatingRead } from "@/hooks/rating/useRatingRead.js";
import { useRatingUpdate } from "@/hooks/rating/useRatingUpdate.js";
import { useRatingDelete } from "@/hooks/rating/useRatingDelete.js";
import { Star } from "lucide-react"; // ★ import 추가
import "./RatingWriteModal.css";

const RatingWriteModal = ({ isOpen, onClose, product }) => {
    const { mutateAsync: ratingWrite, isPending: isWriting } = useRatingWrite(product.orderId);
    const { mutateAsync: ratingUpdate, isPending: isUpdating } = useRatingUpdate(product.orderId);
    const { mutateAsync: ratingDelete, isPending: isDeleting } = useRatingDelete(product.orderId);
    const { data: ratingRead } = useRatingRead(product.orderId);

    const [form, setForm] = useState({ score: 5, comment: "" });

    useEffect(() => {
        if (ratingRead) {
            setForm(ratingRead);
        }
    }, [ratingRead]);

    // 별 클릭 시 점수 변경
    const handleStarClick = (newScore) => {
        setForm(prev => ({ ...prev, score: newScore }));
    };

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // hidden input 덕분에 form.score 값이 자동으로 들어갑니다.
        const payload = {
            score: Number(formData.get("score")),
            comment: formData.get("comment")
        }

        if (ratingRead) {
            await ratingUpdate({ ratingId: ratingRead.ratingId, payload });
        } else {
            await ratingWrite(payload);
        }
        onClose();
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if(!window.confirm("리뷰를 삭제하시겠습니까?")) return;

        await ratingDelete(ratingRead.ratingId);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content review-modal" onClick={(e) => e.stopPropagation()}>

                {/* 헤더 */}
                <div className="modal-header">
                    <h3>{ratingRead ? "리뷰 수정하기" : "리뷰 작성하기"}</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {/* 1. 제품 정보 섹션 */}
                        <div className="product-info-card">
                            <img
                                src={product.mainImageUrl || "https://via.placeholder.com/80"}
                                alt={product.title}
                                className="product-thumb"
                            />
                            <div className="product-details">
                                <span className="seller-name">판매자: {product.seller}</span>
                                <h4 className="product-title">{product.title}</h4>
                            </div>
                        </div>

                        {/* 2. 별점 섹션 (Lucide React 적용) */}
                        <div className="form-group">
                            <label className="form-label">별점 평가</label>

                            <div className="star-rating-container" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <Star
                                        key={num}
                                        size={32} // 아이콘 크기
                                        onClick={() => handleStarClick(num)}

                                        // ★ 핵심 로직: 점수보다 작거나 같으면 노란색 채우기, 아니면 투명
                                        fill={num <= form.score ? "#ffd700" : "none"}

                                        // 테두리: 채워졌을 땐 노란색(깔끔하게), 비었을 땐 회색
                                        color={num <= form.score ? "#ffd700" : "#e4e5e9"}

                                        style={{
                                            cursor: "pointer",
                                            transition: "all 0.2s ease-in-out" // 부드러운 애니메이션
                                        }}
                                        // 마우스 올렸을 때 살짝 커지는 효과 (선택사항)
                                        className="star-icon"
                                    />
                                ))}
                                <span style={{ marginLeft: '8px', fontSize: '15px', color: '#444', fontWeight: '600' }}>
                                    {form.score}점
                                </span>
                            </div>

                            {/* 데이터 전송용 숨겨진 인풋 */}
                            <input type="hidden" name="score" value={form.score} />
                        </div>

                        {/* 3. 리뷰 내용 섹션 */}
                        <div className="form-group">
                            <label className="form-label">리뷰 내용</label>
                            <textarea
                                name="comment"
                                className="form-textarea"
                                defaultValue={form.comment}
                                placeholder="거래에 대한 솔직한 후기를 남겨주세요."
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* 푸터 (버튼 영역) */}
                    <div className="modal-footer">
                        {ratingRead ? (
                            <div className="button-group">
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "삭제 중..." : "삭제"}
                                </button>
                                <button
                                    type="submit"
                                    className="confirm-btn modify"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? "수정 중..." : "수정 완료"}
                                </button>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="confirm-btn"
                                disabled={isWriting}
                            >
                                {isWriting ? "등록 중..." : "리뷰 등록"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RatingWriteModal;
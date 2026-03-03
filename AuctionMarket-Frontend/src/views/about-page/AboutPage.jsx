import React from 'react';
import './AboutPage.css'; // ✨ CSS 파일 임포트
import bid from '@/assets/about/product_bid.gif';
import user from '@/assets/about/user_list.png';

const AboutPage = () => {
    return (
        <div className="about-container">

            <section className="hero-section">
                <h1 className="hero-title">
                    가치를 발견하고, 가치를 증명하는 곳.
                </h1>
                <p className="hero-desc">
                    Auction.은 누구나 쉽게 판매자가 되어 숨겨진 가치를 세상에 선보이고, <br className="br-pc-only" />
                    누구나 입찰자가 되어 원하는 물건을 쟁취할 수 있는 실시간 경매 플랫폼입니다.
                </p>
            </section>

            <section className="features-section">
                <div className="feature-card">
                    <h3 className="feature-title">짜릿한 경매의 순간</h3>
                    <p className="feature-desc">
                        충전된 포인트로 실시간 입찰에 참여하세요. 1순위 입찰의 쾌감과 치열한 눈치 싸움이 시작됩니다. (※ 1순위 상태에서는 재입찰이 제한되어 공정성을 유지합니다.)
                    </p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">손쉬운 판매자 전환</h3>
                    <p className="feature-desc">
                        일반 사용자 누구나 마이페이지에서 판매자 신청이 가능합니다. 상품을 등록하고 관리하며, 완료된 거래에 대한 리뷰를 통해 신뢰도를 쌓아보세요.
                    </p>
                </div>
                <div className="feature-card feature-card-highlight">
                    <h3 className="feature-title highlight-text">스마트 AI 챗봇</h3>
                    <p className="feature-desc">
                        경매 룰이나 웹사이트 이용 방법이 궁금하신가요? Auction. 전용 AI 어시스턴트가 24시간 언제든 빠르고 정확하게 답변해 드립니다.
                    </p>
                </div>
            </section>

            <section className="flow-section">
                <div className="flow-row">
                    <div className="flow-text">
                        <h2 className="flow-title">투명하고 완벽한 거래 통제</h2>
                        <ul className="flow-list">
                            <li>✓ 판매자는 본인이 등록한 경매에 입찰할 수 없습니다.</li>
                            <li>✓ 입찰이 시작된 상품은 정보 수정이 불가능하여 데이터 무결성을 보장합니다.</li>
                            <li>✓ 진행 중인 경매나 등록된 상품이 있다면 회원 탈퇴가 제한됩니다.</li>
                        </ul>
                    </div>
                    <div className="flow-img-wrapper">
                        <img src={bid} alt="실시간 입찰 과정" className="flow-img" />
                    </div>
                </div>

                <div className="flow-row-reverse">
                    <div className="flow-text">
                        <h2 className="flow-title">강력한 관리자(Admin) 대시보드</h2>
                        <ul className="flow-list">
                            <li>✓ 전체 유저의 입찰, 낙찰, 등록 상품 리스트를 탭(Tab)으로 한눈에 조회합니다.</li>
                            <li>✓ 판매자 신청을 승인하거나, 거절 사유를 모달창으로 명확히 전달합니다.</li>
                            <li>✓ 악성 유저 발견 시 즉시 계정을 정지하며, 관련된 상품과 입찰 내역을 강제 회수합니다.</li>
                        </ul>
                    </div>
                    <div className="flow-img-wrapper">
                        <img src={user} alt="실시간 입찰 과정" className="flow-img" />
                    </div>
                </div>
            </section>

            <section className="dev-note-section">
                <h2 className="dev-note-title">Developer's Note</h2>
                <p className="dev-note-desc">
                    단순한 UI 그 이면에는 JWT 토큰 갱신, 철저한 예외 처리, 그리고 복잡한 경매 상태 관리를 위한 견고한 비즈니스 로직이 자리 잡고 있습니다. <br className="br-pc-only" />
                    이 웹페이지의 전체 아키텍처와 소스 코드는 하단의 <strong>GitHub 로고</strong>를 클릭하여 확인하실 수 있습니다.
                </p>
                <a href="https://github.com/jhh0101/portfolio" target="_blank" rel="noreferrer" className="github-btn">
                    Go to GitHub
                </a>
            </section>

        </div>
    );
};

export default AboutPage;
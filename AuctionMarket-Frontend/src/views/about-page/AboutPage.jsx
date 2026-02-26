import React from 'react';
import bid from '@/assets/about/product_bid.gif';
import user from '@/assets/about/user_list.png';

const AboutPage = () => {
    return (
        <div className="about-container" style={{ fontFamily: 'sans-serif', color: '#333' }}>

            {/* 1. Hero Section (메인 인트로 - 블랙 배경) */}
            <section style={{ backgroundColor: '#111', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
                    가치를 발견하고, 가치를 증명하는 곳.
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: '1.6', maxWidth: '650px', margin: '0 auto' }}>
                    Auction.은 누구나 쉽게 판매자가 되어 숨겨진 가치를 세상에 선보이고, <br />
                    누구나 입찰자가 되어 원하는 물건을 쟁취할 수 있는 실시간 경매 플랫폼입니다.
                </p>
            </section>

            {/* 2. Core Features (3개의 핵심 기능 카드 - 화이트 배경) */}
            <section style={{ padding: '80px 10%', display: 'flex', gap: '20px', justifyContent: 'space-between', backgroundColor: '#fff' }}>
                <div style={{ flex: 1, padding: '30px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#000' }}>짜릿한 경매의 순간</h3>
                    <p style={{ color: '#666', lineHeight: '1.5' }}>
                        충전된 포인트로 실시간 입찰에 참여하세요. 1순위 입찰의 쾌감과 치열한 눈치 싸움이 시작됩니다. (※ 1순위 상태에서는 재입찰이 제한되어 공정성을 유지합니다.)
                    </p>
                </div>
                <div style={{ flex: 1, padding: '30px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#000' }}>손쉬운 판매자 전환</h3>
                    <p style={{ color: '#666', lineHeight: '1.5' }}>
                        일반 사용자 누구나 마이페이지에서 판매자 신청이 가능합니다. 상품을 등록하고 관리하며, 완료된 거래에 대한 리뷰를 통해 신뢰도를 쌓아보세요.
                    </p>
                </div>
                <div style={{ flex: 1, padding: '30px', backgroundColor: '#fafafa', border: '1px solid #eee', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#e53e3e' }}>스마트 AI 챗봇</h3>
                    <p style={{ color: '#666', lineHeight: '1.5' }}>
                        경매 룰이나 웹사이트 이용 방법이 궁금하신가요? Auction. 전용 AI 어시스턴트가 24시간 언제든 빠르고 정확하게 답변해 드립니다.
                    </p>
                </div>
            </section>

            {/* 3. Detailed Flow (지그재그 레이아웃으로 상세 로직 설명) */}
            <section style={{ padding: '80px 10%', backgroundColor: '#f9f9f9' }}>
                {/* Flow 1: 공정한 거래 시스템 (텍스트 좌, 이미지 우) */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '80px', gap: '40px' }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#000' }}>투명하고 완벽한 거래 통제</h2>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#555', lineHeight: '1.8' }}>
                            <li>✓ 판매자는 본인이 등록한 경매에 입찰할 수 없습니다.</li>
                            <li>✓ 입찰이 시작된 상품은 정보 수정이 불가능하여 데이터 무결성을 보장합니다.</li>
                            <li>✓ 진행 중인 경매나 등록된 상품이 있다면 회원 탈퇴가 제한됩니다.</li>
                        </ul>
                    </div>
                    <div style={{ flex: 1 }}>
                        <img
                            src={bid}
                            alt="실시간 입찰 과정"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '350px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}
                        />
                    </div>
                </div>

                {/* Flow 2: 강력한 관리자 권한 (이미지 좌, 텍스트 우) */}
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: '40px' }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#000' }}>강력한 관리자(Admin) 대시보드</h2>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#555', lineHeight: '1.8' }}>
                            <li>✓ 전체 유저의 입찰, 낙찰, 등록 상품 리스트를 탭(Tab)으로 한눈에 조회합니다.</li>
                            <li>✓ 판매자 신청을 승인하거나, 거절 사유를 모달창으로 명확히 전달합니다.</li>
                            <li>✓ 악성 유저 발견 시 즉시 계정을 정지하며, 관련된 상품과 입찰 내역을 강제 회수합니다.</li>
                        </ul>
                    </div>
                    <div style={{ flex: 1 }}>
                        <img
                            src={user} // 💡 실제 GIF 파일이 있는 경로로 수정해 주세요! (예: public 폴더 안)
                            alt="실시간 입찰 과정"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '350px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* 4. Developer's Note (포트폴리오 어필 및 푸터 유도) */}
            <section style={{ padding: '60px 10%', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #eaeaea' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#000' }}>Developer's Note</h2>
                <p style={{ color: '#666', maxWidth: '595px', margin: '0 auto 30px', lineHeight: '1.6' }}>
                    단순한 UI 그 이면에는 JWT 토큰 갱신, 철저한 예외 처리, 그리고 복잡한 경매 상태 관리를 위한 견고한 비즈니스 로직이 자리 잡고 있습니다. <br/>
                    이 웹페이지의 전체 아키텍처와 소스 코드는 하단의 <strong>GitHub 로고</strong>를 클릭하여 확인하실 수 있습니다.
                </p>
                <a href={"https://github.com/jhh0101/portfolio"} target={"_blank"} style={{ padding: '10px 24px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem', borderRadius: '4px', textDecoration: "none" }}>
                    Go to GitHub
                </a>
            </section>

        </div>
    );
};

export default AboutPage;
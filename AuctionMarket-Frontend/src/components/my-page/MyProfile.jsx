import {useGetProfile} from '@/hooks/user/useGetProfile.js';
import {useUpdateProfile} from '@/hooks/user/useUpdateProfile.js';
import {useUpdatePassword} from "@/hooks/user/useUpdatePassword.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { jwtDecode } from 'jwt-decode';
import UserDashboard from '@/components/my-page/UserDashboard.jsx';
import toast from 'react-hot-toast';
import './MyProfile.css'

const MyProfile = () => {
    const { accessToken } = useAuth();
    const decoded = jwtDecode(accessToken);
    const { data: profile, isLoading } = useGetProfile(decoded.sub);
    const { mutateAsync: updateProfile, isPending: isProfilePending } = useUpdateProfile(decoded.sub);
    const { mutateAsync: updatePassword, isPending: isPasswordPending } = useUpdatePassword(decoded.sub);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
        if(payload.phone){
            payload.phone = payload.phone.replace(/-/g, "");
        }
        updateProfile(payload);
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        // 1. 폼 데이터 가져오기
        const form = e.currentTarget; // form 요소 저장 (비동기 안에서 e.target 접근 문제 방지)
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        // 2. [중요] 비밀번호 확인 검증 (유효성 검사)
        if (payload.newPassword !== payload.confirmPassword) {
            toast.error("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        // 3. 서버 요청 (await를 써서 요청이 끝날 때까지 기다림)
        try {
            await updatePassword(payload);

            // 4. 성공했을 때만 초기화 (선택사항, 그냥 밖에서 해도 됨)
            form.reset();
        } catch (error) {
            // 에러 처리 (필요시)
            console.error(error);
        }
    };

    if (isLoading){
        return <div style={{height: "100vh"}}>로딩 중...</div>
    }

    return (
        <>
            <UserDashboard user={profile}/>
            <div className="mypage-container">

                {/* --- 섹션 1: 기본 정보 수정 --- */}
                <h3 className="section-title">Account Details</h3>
                <form onSubmit={handleUpdateProfile}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-input"
                               defaultValue={profile?.data?.email} disabled />
                    </div>
                    <div className="form-group">
                        <label className="form-label">User Name</label>
                        <input type="text" name="username" className="form-input"
                               defaultValue={profile?.data?.username} disabled/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Nick Name</label>
                        <input type="text" name="nickname" className="form-input"
                               placeholder={profile?.data?.nickname}
                               defaultValue={profile?.data?.nickname} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone<p>(Number Only)</p></label>
                        <input type="text" name="phone" className="form-input"
                               placeholder={profile?.data?.phone.replace(/-/g, "")}
                               defaultValue={profile?.data?.phone} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-black" disabled={isProfilePending}>
                            {isProfilePending ? "Saving... " : "Save Changes"}
                        </button>
                    </div>
                </form>


                <div className="divider" />


                <h3 className="section-title">Password</h3>
                <form onSubmit={handleUpdatePassword}>
                    <div className="form-group">
                        <label className="form-label">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            className="form-input"
                            placeholder="Current password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="form-input"
                            placeholder="New password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-input"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-black" disabled={isPasswordPending}>
                            {isPasswordPending ? "Saving... " : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MyProfile;
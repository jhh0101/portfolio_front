import {useGetProfile, useUpdateProfile, useUpdatePassword} from '@/hooks/user';
import UserDashboard from './UserDashboard.jsx';
import toast from 'react-hot-toast';
import './MyProfile.css'

const MyProfile = ({decoded}) => {

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

        const form = e.currentTarget;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        if (payload.newPassword !== payload.confirmPassword) {
            toast.error("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await updatePassword(payload);

            form.reset();
        } catch (error) {
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
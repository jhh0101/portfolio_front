const UserLoginButton = ({emailInput, passwordInput}) => {
    return (
        <>
            <button type={"button"}
                 onClick={() => {
                     emailInput("admin01@gmail.com")
                     passwordInput("auction_market!@#123")
                 }} >
                관리자
            </button>
            <button type={"button"}
                    onClick={() => {
                        emailInput("seller01@gmail.com")
                        passwordInput("auction_market!@#123")
                    }} >
                판매자
            </button>
            <button type={"button"}
                    onClick={() => {
                        emailInput("user01@gmail.com")
                        passwordInput("auction_market!@#123")
                    }} >
                사용자1
            </button>
            <button type={"button"}
                    onClick={() => {
                        emailInput("user02@gmail.com")
                        passwordInput("auction_market!@#123")
                    }} >
                사용자2
            </button>
        </>
    );
};

export default UserLoginButton;
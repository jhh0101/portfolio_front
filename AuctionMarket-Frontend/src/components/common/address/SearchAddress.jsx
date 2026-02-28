import { useDaumPostcodePopup } from 'react-daum-postcode';

const SearchAddress = ({onSearch}) => {
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const openPostcode = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        onSearch(fullAddress);
    };

    const handleClick = () => {
        openPostcode({ onComplete: handleComplete });
    };

    return (
        <div
            className={"btn btn-outline-danger"}
            style={{flex: "1", maxHeight: "40px", marginTop: "10px"}}
            onClick={handleClick}
        >
            주소
        </div>
    );
}

export default SearchAddress;
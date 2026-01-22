const StartPrice = ({formData, handleChange}) => {
    return (
        <div className="input-group price-container">
            <label className="input-label">Start Price</label>
            <div className="currency-wrapper">
                <span className="unit-symbol">₩</span>
                <input
                    type="number"
                    name="startPrice"
                    value={formData.startPrice}
                    onChange={handleChange}
                    placeholder="0"
                    required
                />
            </div>
        </div>
    );
};

export default StartPrice;
const StartAndEndTime = ({minStartTime, minEndTime, handleChange}) => {
    return (
        <div className="time-group">
            <div className="input-group">
                <label className="input-label">Start Time</label>
                <input type="datetime-local" name="startTime" min={minStartTime} onChange={handleChange} required/>
            </div>
            <div className="input-group">
                <label className="input-label">End Time</label>
                <input type="datetime-local" name="endTime" min={minEndTime} onChange={handleChange} required/>
            </div>
        </div>
    );
};

export default StartAndEndTime;
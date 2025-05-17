const BaseFileInput = ({
                           id,
                           name,
                           label,
                           onChange,
                           disabled = false,
                           error = ""
                       }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type="file"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id={id}
                name={name}
                accept="image/*"
                onChange={onChange}
                disabled={disabled}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default BaseFileInput;

const BaseTextInput = ({
                           id,
                           name,
                           label,
                           value,
                           onChange,
                           disabled = false,
                           placeholder = "",
                           error = ""
                       }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default BaseTextInput;

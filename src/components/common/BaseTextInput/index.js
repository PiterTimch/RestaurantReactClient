const BaseTextInput = ({
                           field,
                           form,
                           label,
                           placeholder = "",
                           disabled = false
                       }) => {
    const {name} = field;
    const {touched, errors} = form;
    const error = touched[name] && errors[name];

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                {...field}
                id={name}
                className={`form-control ${error ? "is-invalid" : ""}`}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default BaseTextInput;

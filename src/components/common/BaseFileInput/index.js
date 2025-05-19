const BaseFileInput = ({
                           field,
                           form: { touched, errors, setFieldValue },
                           label,
                           disabled = false
                       }) => {
    const { name } = field;
    const error = touched[name] && errors[name];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFieldValue(name, file);
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type="file"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id={name}
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                disabled={disabled}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default BaseFileInput;

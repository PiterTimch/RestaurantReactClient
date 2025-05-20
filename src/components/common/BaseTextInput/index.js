import classNames from "classnames";

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
                className={classNames("form-control", {
                    "is-invalid": error && touched[name]
                })}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default BaseTextInput;

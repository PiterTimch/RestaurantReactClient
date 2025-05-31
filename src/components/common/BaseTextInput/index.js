import classNames from "classnames";

const BaseTextInput = ({field, label, value, error, touched, onChange, type="text"}) => {

    const isError = touched && error;

    return (
        <>
            <div className="mb-3">
                <label htmlFor={field} className="form-label">{label}</label>
                <input type={type}
                       className={classNames("form-control", {
                           "is-invalid": isError
                       })}
                       name={field}
                       id={field}
                       value={value}
                       onChange={onChange}
                />
                {isError && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    )
}

export default BaseTextInput;
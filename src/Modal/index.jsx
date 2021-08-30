import { useEffect, useState } from "react";
import Close from "../static/images/close.svg";
import "./style/index.scss";

const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true);
    const [nameError, setNameError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [minLengthError, setMinLengthError] = useState(false);
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case "isName": 
                    const regLetter = /^[A-Za-z]+$/g;
                    regLetter.test(value) ? setNameError(false) : setNameError(true);
                    break;
                case "isNumber": 
                    const regNumber = /^[0-9]*$/g;
                    regNumber.test(value) ? setNumberError(false) : setNumberError(true);
                    break;
                case "minLength": 
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || nameError || numberError || minLengthError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, nameError, numberError, minLengthError])

    return {
        isEmpty,
        nameError,
        numberError,
        minLengthError,
        inputValid
    }
}

const useInput = (inilialValue, validations) => {
    const [value, setValue] = useState(inilialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        setValue,
        setDirty,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export const Modal = ({active, setActive, result}) => {

    const name = useInput('', {isEmpty: true, isName: true});
    const number = useInput('', {isEmpty: true, isNumber: true, minLength: 12});

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(
            "Name: " + name.value,
            "\nNumber: " + number.value,
            "\nProduct Name: " + result.name,
            "\nCategory: " + result.category,
            "\nPrice: " + result.price + "$"
        );

        setTimeout(() => {
            setActive(false);
            name.setValue('');
            name.setDirty(false);
            number.setValue('');
            number.setDirty(false)
        }, 1000);
    }

    return (
        <div className={`modal ${active ? "active" : ""}`} onClick={() => setActive(false)}>
            <div className={active ? "modal-content active" : "popup-content"} onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={() => setActive(false)}>
                    <img src={Close} alt="close" />
                </button>
                <form className="form" onSubmit={handleSubmit}>
                    <p className="modal__category category" value={result.category}>{result.category}</p>
                    <h2 className="modal__name" value={result.name}>{result.name}</h2>
                    <span className="modal__price price" value={result.price}>{result.price}</span>

                    <div className={`form__field ${(name.isDirty && name.isEmpty) ? 'error' : ''}`}>
                        <input onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} value={name.value} name="name" type="text" className="form__field-input" placeholder="Name" />
                        {(name.isDirty && (
                            name.isEmpty ?
                                <span className="form__field-message">This field in required</span>
                            : name.nameError ? 
                                <span className="form__field-message">Only letters allowed</span>
                            : ''
                        ))}
                    </div>

                    
                    <div className={`form__field ${(number.isDirty && number.isEmpty) ? 'error' : ''}`}>
                        <input onChange={e => number.onChange(e)} onBlur={e => number.onBlur(e)} value={number.value} name="number" type="text" className="form__field-input" placeholder="Number" />
                        {(number.isDirty && (
                            number.isEmpty ?
                                <span className="form__field-message">This field in required</span>
                            : number.numberError ? 
                                <span className="form__field-message">Only numbers allowed</span>
                            : number.minLengthError ? 
                                <span className="form__field-message">Should contain 12 characters</span>
                            : ''
                        ))}
                    </div>

                    <button disabled={!name.inputValid || !number.inputValid} className="form__submit">
                        <span>Order</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
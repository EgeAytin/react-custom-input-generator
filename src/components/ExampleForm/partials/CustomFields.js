import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import DeleteIcon from '@material-ui/icons/Delete';
import CurrencyInput from 'react-currency-input-field';
import Select from "react-select";
import PhoneInput from "react-phone-input-2";

function CustomFields(props) {

    const [currencyAmount, setCurrencyAmount] = useState(0);
    const [currency, setCurrency] = useState('USD');


    async function handleCustomInputChange(id, val) {
        if (val) {
            console.log('e', val)
            props.handleCustomInputChange(id, val);
        }
    };

    async function removeCustomInput(id) {
        props.removeCustomInput(id);
    };

    function setCurrencyValue(id, cur) {
        setCurrency(cur.value);

        if (currencyAmount) {
            let currencyValue = currencyAmount.toString() + cur.value;

            props.handleCustomInputChange(id, currencyValue);
        }

    }

    function setCurrencyInputAmount(id, value) {
        setCurrencyAmount(value);

        if (currencyAmount) {
            let currencyValue = currencyAmount.toString() + currency;

            props.handleCustomInputChange(id, currencyValue);
        }

    }

    function handlePercentageChange(id, event){
        let { value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        props.handleCustomInputChange(id, value);
    }

    const customStyles = {
        control: base => ({
            ...base,
            height: 50,
            minHeight: 50,
            borderRadius: 9,
            borderColor: '#D4D5E4'
        }),
        valueContainer: base => ({
            ...base,
            fontSize: 14,
            height: 50,
            minHeight: 50,
        }),

    };


    function getInput(item) {
        switch (item.field_type) {
            case 'short-text':
                return (
                    <div className="col-sm-6 mb-4" key={item.id}>
                        <label>{item.label}</label>
                        <input
                            type="text"
                            className="form-control form-control-solid h-auto input-height"
                            defaultValue={item.value || ""}
                            onChange={e => handleCustomInputChange(item.id, e.target.value)}
                        />
                        <div onClick={() => removeCustomInput(item.id)} className="custom-icon-remove">
                            <DeleteIcon fontSize="small"/>
                        </div>
                    </div>
                );
            case 'long-text':
                return (
                    <div className="col-sm-12 mb-4" key={item.id}>
                        <label>{item.label}</label>
                        <textarea
                            rows="4"
                            type="text"
                            className="form-control form-control-solid h-auto"
                            defaultValue={item.value || ""}
                            onChange={e => handleCustomInputChange(item.id, e.target.value)}
                        />
                        <div onClick={() => removeCustomInput(item.id)} className="custom-icon-remove">
                            <DeleteIcon fontSize="small"/>
                        </div>
                    </div>
                );
            case 'number':
                return (
                    <div className="col-sm-6 mb-4" key={item.id}>
                        <label>{item.label}</label>
                        <input
                            type="number"
                            className="form-control form-control-solid h-auto input-height"
                            defaultValue={item.value || ""}
                            onChange={e => handleCustomInputChange(item.id, e.target.value)}
                        />
                        <div onClick={() => removeCustomInput(item.id)} className="custom-icon-remove">
                            <DeleteIcon fontSize="small"/>
                        </div>
                    </div>
                );
            case 'currency':
                return (
                    <div className="col-sm-6 mb-4" key={item.id}>
                        <label>{item.label}</label>
                        <div className="d-flex">
                            <CurrencyInput
                                className="form-control form-control-solid input-height w-75 mr-2"
                                name="currency"
                                placeholder="1,123.45"
                                decimalsLimit={2}
                                onValueChange={(value, name) => setCurrencyInputAmount(item.id, value)}
                            />
                            <Select
                                name="currency"
                                options={[
                                    {value: 'TL', label: '₺ (TL)'},
                                    {value: 'EUR', label: '€ (EUR)'},
                                    {value: 'USD', label: '$ (USD)'},
                                ]}
                                className="basic-single w-25"
                                classNamePrefix="select"
                                defaultValue={{value: 'USD', label: '$ (USD)'}}
                                onChange={(cur) => setCurrencyValue(item.id, cur)}
                                styles={customStyles}
                            />
                        </div>
                        <div onClick={() => removeCustomInput(item.id)} className="custom-icon-remove">
                            <DeleteIcon fontSize="small"/>
                        </div>
                    </div>
                );
            case 'percentage':
                return (
                    <div className="col-sm-6 mb-4" key={item.id}>
                        <label>{item.label}</label>
                        <div className="d-flex align-items-center">
                            <span className="lead mr-2">%</span>
                            <input
                                type="number"
                                value={Number(item.value)}
                                className="form-control form-control-solid h-auto w-100 input-height"
                                min="0"
                                max="100"
                                onChange={e => handlePercentageChange(item.id, e)}
                            />
                        </div>
                        <div onClick={() => removeCustomInput(item.id)} className="custom-icon-remove">
                            <DeleteIcon fontSize="small"/>
                        </div>
                    </div>
                );
            case 'email':
                return (
                    <div className="col-sm-6 mb-4" key={item.id}>
                        <label>{item.label}</label>
                        <input
                            type="email"
                            className="form-control form-control-solid h-auto input-height"
                            defaultValue={item.value || ""}
                            onChange={e => handleCustomInputChange(item.id, e.target.value)}
                        />
                        <div onClick={() => removeCustomInput(item.id)} className="custom-icon-remove">
                            <DeleteIcon fontSize="small"/>
                        </div>
                    </div>
                );
            case 'phone':
                return (
                    <div className="col-sm-6 mb-4" key={item.id}>
                        <label>{item.label}</label>
                        <PhoneInput
                            country={'tr'}
                            defaultValue={item.value || ""}
                            onChange={phone => handleCustomInputChange(item.id, phone)}
                        />
                        <div onClick={() => removeCustomInput(item.id)} className="custom-icon-remove">
                            <DeleteIcon fontSize="small"/>
                        </div>
                    </div>
                );
            case 'url':
                return (
                    <div className="col-sm-6 mb-4" key={item.id}>
                        <label>{item.label}</label>
                        <input
                            type="text"
                            className="form-control form-control-solid h-auto input-height"
                            defaultValue={item.value || ""}
                            onChange={e => handleCustomInputChange(item.id, e.target.value)}
                        />
                        <div onClick={() => removeCustomInput(item.id)} className="custom-icon-remove">
                            <DeleteIcon fontSize="small"/>
                        </div>
                    </div>
                );
            default:
            // code block
        }
    }


    return (
        <>
            {
                props.customFields.length !== 0 ?
                    <div className="row">
                        {props.customFields.map((item) => getInput(item))}
                    </div>
                    :
                    <></>
            }
        </>
    );
}

export default CustomFields;

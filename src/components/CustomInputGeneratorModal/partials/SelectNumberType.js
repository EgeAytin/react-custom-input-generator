import React, {useState} from "react";
import Select, {components} from "react-select";

//icons
import ShortTextIcon from '@material-ui/icons/ShortText';

function SelectNumberType(props) {

    const {Option} = components;

    const options = [
        {value: 'number', label: 'Number (without unit)'},
        {value: 'currency', label: 'Currency'},
        {value: 'percentage', label: 'Percentage'},
    ];

    function setNumberType(opt) {
        props.setNumberInputType(opt.value)
    }

    const IconOptions = props => {
        console.log('PROPS', props)

        switch (props.data.value) {
            case 'number':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            {/*<ShortTextIcon fontSize="small"/>*/}
                            <span className="ml-2 small">Number <span className="custom-input-description"> (without unit)</span></span>
                        </div>
                    </Option>
                );
            case 'currency':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                           {/* <LongTextIcon fontSize="small"/>*/}
                            <span className="ml-2 small">Currency </span>
                        </div>
                    </Option>
                );
            case 'percentage':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            {/*<Filter1Icon fontSize="small"/>*/}
                            <span className="ml-2 small">Percentage </span>
                        </div>
                    </Option>
                );
            default:
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            <ShortTextIcon fontSize="small"/>
                            <span className="ml-2 small">Short Text <span className="custom-input-description">(180h character)</span></span>
                        </div>
                    </Option>
                )
        }
    };

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


    return (
        <Select
            name="inputs"
            options={options}
            className="basic-single"
            classNamePrefix="select"
            placeholder="What type of number is this input?"
            onChange={(opt) => setNumberType(opt)}
            components={{Option: IconOptions}}
            styles={customStyles}
        />
    );
}

export default SelectNumberType

import React, {useState} from "react";
import Select, {components} from "react-select";

//icons
import ShortTextIcon from '@material-ui/icons/ShortText';
import LongTextIcon from '@material-ui/icons/Subject';
import EmailIcon from '@material-ui/icons/Email';
import Filter1Icon from '@material-ui/icons/Filter1';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';

function SelectInput(props) {

    const {Option} = components;

    const options = [
        {value: 'short-text', label: 'Short Text'},
        {value: 'long-text', label: 'Long Text'},
        {value: 'number', label: 'Numbers'},
        {value: 'email', label: 'Email'},
        {value: 'phone', label: 'Phone'},
        {value: 'url', label: 'Link'},
    ];

    function setInputType(opt) {
        props.setInputType(opt.value)
    }

    const IconOptions = props => {
        console.log('PROPS', props)

        switch (props.data.value) {
            case 'short-text':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            <ShortTextIcon fontSize="small"/>
                            <span className="ml-2 small">Short Text <span className="custom-input-description">(180h character)</span></span>
                        </div>
                    </Option>
                );
            case 'long-text':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            <LongTextIcon fontSize="small"/>
                            <span className="ml-2 small">Long Text  <span className="custom-input-description">(4000 character)</span></span>
                        </div>
                    </Option>
                );
            case 'number':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            <Filter1Icon fontSize="small"/>
                            <span className="ml-2 small">Numbers <span className="custom-input-description">(Add numbers, currency, percentage etc.)</span> </span>
                        </div>
                    </Option>
                );
            case 'email':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            <EmailIcon fontSize="small"/>
                            <span className="ml-2 small">Email</span>
                        </div>
                    </Option>
                );
            case 'phone':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            <PhoneIcon fontSize="small"/>
                            <span className="ml-2 small">Phone <span className="custom-input-description">(Add a new phone number)</span></span>
                        </div>
                    </Option>
                );
            case 'url':
                return (
                    <Option {...props}>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            <LinkIcon fontSize="small"/>
                            <span className="ml-2 small">Link <span className="custom-input-description">(Add URL’s for such as social media, website)</span></span>
                        </div>
                    </Option>
                );
            default:
                return (
                    <Option {...props}>
                        <ShortTextIcon/>
                        {props.data.label}
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
            components={{Option: IconOptions}}
            placeholder="What type of property is this input?"
            onChange={(opt) => setInputType(opt)}
            styles={customStyles}
        />
    );
}

export default SelectInput

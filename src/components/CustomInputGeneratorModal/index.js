import React, {useState, useEffect} from "react";
import {Button, Modal, Spinner} from "react-bootstrap";
import './CustomInputGenerator.scss';
import * as Yup from "yup";
import {useFormik} from "formik";

//partials
import SelectInput from './partials/SelectInput'
import SelectNumberType from './partials/SelectNumberType'

function CustomInputGeneratorModal(props) {
    const [loading, setLoading] = useState(false);
    const [inputType , setInputType] = useState('');
    const [showNumberTypeSelect , setShowNumberTypeSelect] = useState(false);

    useEffect(() => {
       if(inputType !== 'number' && inputType !== 'currency' && inputType !== 'percentage' ){
           setShowNumberTypeSelect(false)
       }
    }, [inputType]);

    const CreateInputSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, "Minimum 1 characters")
            .max(255, "Maximum 255 characters")
            .required("required"),
    });

    const formik = useFormik({
        initialValues:{
            name: "",
        },
        validationSchema: CreateInputSchema,
        onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
            props.addCustomField(values.name, inputType)
            resetForm();
            setShowNumberTypeSelect(false)
        },
    });

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }

        return "";
    };

    function setInputTypeFunc(value){
        if(value !== 'number'){
            setInputType(value)
        } else{
            setShowNumberTypeSelect(true)
        }
    }

    function setNumberInputType(type){
        setInputType(type)
    }

    const handleClose = () => {
        setShowNumberTypeSelect(false);
        props.onHide()
    } ;

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <strong>
                    Create Custom Input
                </strong>
            </Modal.Header>
            <Modal.Body>
                <form
                    onSubmit={formik.handleSubmit}
                    className="form"
                >
                    {formik.status && (
                        <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                            <div className="alert-text font-weight-bold">
                                {formik.status}
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <label>Input Name</label>
                        <input
                            placeholder="What's the name of this input ?"
                            type="text"
                            className={`form-control form-control-solid bg-white input-height secondary-input-border ${getInputClasses(
                                "name"
                            )}`}
                            name="name"
                            {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="validation-message">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label>Input Type</label>
                        <SelectInput setInputType={(value) => setInputTypeFunc(value)}/>
                    </div>
                    {
                        showNumberTypeSelect ?
                            <div className="mb-4">
                                 <label>Number Unit Type</label>
                                 <SelectNumberType setNumberInputType={(type) => setNumberInputType(type)}/>
                            </div>
                            :
                            <></>
                    }
                    <div className="d-flex justify-content-end mb-1 w-100 mt-4">
                        <Button
                            variant="secondary"
                            onClick={props.onHide}
                            className="mr-4 w-100"
                        >
                            Close
                        </Button>
                        <Button
                            id="kt_login_forgot_submit"
                            type="submit"
                            variant="primary"
                            className="d-flex justify-content-center align-items-center w-100"
                        >
                            {loading ?
                                <div className="d-flex justify-content-center px-4">
                                    <Spinner animation="border" size="sm" />
                                </div>
                                :
                                <span>Save</span>}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default CustomInputGeneratorModal

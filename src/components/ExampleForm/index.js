import React,{useState} from 'react'
import {Button} from 'react-bootstrap'
import { useFormik } from "formik";
import * as Yup from "yup";
import './ExampleForm.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import CustomFields from './partials/CustomFields'

function ExampleForm(props) {

    const [phone, setPhone] = useState(null);

    const ExampleFormSchema = Yup.object().shape({
        full_name: Yup.string()
            .min(4, "Minimum 4 characters")
            .max(50, "Maximum 50 characters")
            .required("Required Field"),
        email: Yup.string()
            .email("Wrong email format")
            .min(4, "Minimum 4 characters")
            .max(50, "Maximum 50 characters")
            .required("Required Field"),
        position: Yup.string()
            .min(4, "Minimum 4 characters")
            .max(50, "Maximum 50 characters")
            .required("Required Field"),
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

    const formik = useFormik({
        initialValues: {
            full_name: 'Jack Relly',
            email: 'jack@gmail.com',
            position: 'Frontend Dev',
        },
        validationSchema: ExampleFormSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            let payload = {
                full_name: 'Jack Relly',
                email: 'jack@gmail.com',
                position: 'Frontend Dev',
                phone: phone
            };

            console.log('values', payload);
            console.log('custom_values', props.customFields)

            /*setStatus(
                intl.formatMessage({
                    id: errorResponse.email,
                })
            );*/
        },
    });

    async function handleCustomInputChange (id, value) {
        let customFields = props.customFields;

        const newObjArr = await customFields.map(obj => {
                if (obj.id === id) {
                    return {...obj, value: value}
                }
                return obj
            }
        );

        props.changeCustomFields(newObjArr);
    };


    async function removeCustomInput (id) {
        let customFields = props.customFields;

        const newObjArr = await customFields.filter((item) => {
            return item.id !== id;
        });

        props.changeCustomFields(newObjArr);
    };


    return (
        <div>
            <h5 className="pt-4 mb-4">Example Form</h5>
            <form
                onSubmit={formik.handleSubmit}
                className="form"
            >
                {formik.status ? (
                    <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                        <div className="alert-text font-weight-bold">{formik.status}</div>
                    </div>
                ) : (
                    <></>
                )}
                <div className="row">
                    <div className="col-sm-6 mb-4">
                        <label>Full Name</label>
                        <input
                            placeholder="Name"
                            type="text"
                            className={`form-control form-control-solid input-height ${getInputClasses(
                                "full_name"
                            )}`}
                            name="full_name"
                            {...formik.getFieldProps("full_name")}
                        />
                        {formik.touched.full_name && formik.errors.full_name ? (
                            <p className="">{formik.errors.full_name}</p>
                        ) : null}
                    </div>
                    <div className="col-sm-6 mb-4">
                        <label>Email</label>
                        <input
                            placeholder="Email"
                            type="email"
                            className={`form-control form-control-solid input-height ${getInputClasses(
                                "email"
                            )}`}
                            name="email"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.email}</div>
                            </div>
                        ) : null}
                    </div>
                    <div className="col-sm-6 mb-4">
                        <label>Position</label>
                        <input
                            placeholder="Position"
                            type="text"
                            className={`form-control form-control-solid input-height ${getInputClasses(
                                "position"
                            )}`}
                            name="position"
                            {...formik.getFieldProps("position")}
                        />
                        {formik.touched.position && formik.errors.position ? (
                            <p className="">{formik.errors.position}</p>
                        ) : null}
                    </div>
                    <div className="col-sm-6 mb-4">
                        <label>Phone</label>
                        <PhoneInput
                            country={'tr'}
                            onChange={phone => setPhone(phone)}
                        />
                    </div>
                </div>
                <CustomFields
                    customFields={props.customFields}
                    handleCustomInputChange={(id, e) => handleCustomInputChange(id, e)}
                    removeCustomInput={(id) => removeCustomInput(id)}
                />
                <Button variant="primary" onClick={() => props.openCustomInputGenerateModal()}>
                    + Create Custom Input Field
                </Button>
                <div className="d-flex flex-wrap justify-content-end align-items-center mt-4">
                    <button
                        id="kt_login_signin_submit"
                        type="submit"
                        className={`btn btn-primary font-weight-bold px-9 w-25`}
                    >
                        <span>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
export default ExampleForm;

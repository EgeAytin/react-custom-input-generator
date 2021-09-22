import React from 'react'
import {Button} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomInputGeneratorModal from './components/CustomInputGeneratorModal/index'
import ExampleForm from './components/ExampleForm'

function App() {

    const fetchedCustomFields = [
        {
            id:1,
            label:'Company',
            field_name: 'company',
            field_type: 'short-text',
            value: 'Adidas'
        },
        {
            id:2,
            label:'Specialization',
            field_name: 'specialization',
            field_type: 'short-text',
            value: 'Growth Marketing'
        },
        {
            id:3,
            label: 'Description',
            field_name: 'description',
            field_type: 'long-text',
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            id: 4,
            label: 'Age',
            field_name: 'age',
            field_type: 'number',
            value: 24
        },
    ];

    const [modalShow, setModalShow] = React.useState(false);
    const [customFields, setCustomFields] = React.useState(fetchedCustomFields);

    function openCustomInputGenerateModal(){
        setModalShow(true)
    }

    function changeCustomFields(newFormValues){
        setCustomFields(newFormValues)
    }

    function addCustomField(name, type){
        let newField = {
            id: customFields.length + 1,
            label: name,
            field_name: name.replace(/\s/g, "-").toLowerCase(),
            field_type: type,
            value: null
        };

        setCustomFields([...customFields, newField])
        setModalShow(false);
    }

    function onHide(){
        setModalShow(false)
    }

    return (
      <div className="App">
          <CustomInputGeneratorModal
              show={modalShow}
              onHide={onHide}
              addCustomField={(name,type) => addCustomField(name, type)}
          />
          <div className="container">
              <ExampleForm
                  openCustomInputGenerateModal={openCustomInputGenerateModal}
                  customFields={customFields}
                  changeCustomFields={(newFormValues) => changeCustomFields(newFormValues)}
              />
          </div>
      </div>
  );
}
export default App;

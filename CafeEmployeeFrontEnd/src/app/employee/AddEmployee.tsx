import React, {  useEffect, useState }  from "react";
import { Link,useLocation } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Row, Col,Select,Form,Avatar,Upload, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { ApplicationState } from "../../shared/interfaces/commonInterfaces";
import { createEmployee,updateEmployee, getEmployeeList } from "../../redux/actions/employee";
import { getCafeList } from "../../redux/actions/cafes";



interface LocationState {
    from: string
  }
  const { TextArea } = Input;
  const { Option } = Select;
  const layout = {
      labelCol: {
        span: 8,
      },
      wrappercol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrappercol: {
        offset: 8,
        span: 16,
      },
    };
  
    interface AddEmployeeProps{
      open:boolean,
      handleOk: ()=>void,
      setVisible:any,
      type:number,
      onModalClose? : () => void,
    }
  
  
    const AddEmployee : React.FC<AddEmployeeProps> = ({setVisible,type,handleOk,onModalClose}) => {
      const [form] = Form.useForm();
      const [AddEmployee] = useForm<any>();
      const dispatch = useDispatch();
      const location = useLocation();
      const { from } = (location?.state || {}) as LocationState
  
 
      const employeeList = useSelector((state: ApplicationState) => state.employee.employeeList);
     const  employeeListData =  employeeList &&  employeeList?.employees ?  employeeList.employees : [];

     
     const onFinish = (values :any) => {
        console.log(values);
     const data ={ subject : AddEmployee.getFieldsValue().subject,
     }

        addEmployeedata(data);
        onModalClose;
        setVisible(false);
        console.log(AddEmployee.getFieldsValue());
      };
      const onReset = () => {
        form.resetFields();
      };
      const onFill = () => {
        form.setFieldsValue({
          
        });
      };
      const handleGetEmployeeList = () => {
        dispatch(getEmployeeList())
   }

   const addEmployeedata = ( reqData: any) => {
    dispatch(createEmployee(reqData) as any)
    onModalClose;
    setVisible(false);
    
}
const handleGetCafeList = () => {
    dispatch(getCafeList())
}
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      string: '${label} is not a valid number!',
    },
    string: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  return (
<Modal   
width={1000}
    open={setVisible}
    title="NEW EMPLOYEE"
    onCancel={onModalClose}
    validateMessages={validateMessages}
footer={null}

>
  <Form 
  form={AddEmployee} name="addEmployee" 
  onFinish={onFinish} layout="vertical">
  <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }} className='add-employee-main' >
  <Col xs={14} sm={14} md={14} lg={14} xl={14}>
    <h4 className="employee-head"><span> New Employee</span></h4>
    <div  className='employee-details'>
  <Form.Item name="name" label ='Name'
   rules={[{ required: true,type: 'string', min: 6, max: 10 , message: 'Please Enter Employee Name!' }]}>
    <Input  placeholder="Please type" />  
          </Form.Item>
          <Form.Item name="email" label='Email Address '
           rules={[{ required: true, type: 'email', message: 'Please Enter  your email address!' }]}>
           <Input  placeholder="Please type" />  
              </Form.Item>  
            
              <Form.Item label="Gender">
              <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>

                  <Form.Item label='Cafe' 
                   rules={[{ required: true, message: 'Please add cafe !' }]}>
                   <Select    className="select-cafes" placeholder ="Please select the Cafe" 
                  onChange={handleGetCafeList as any}
                  />
                      </Form.Item>
                      </div>
                  </Col>
        </Row>
        <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }} >
         <Col xs={14} sm={14} md={14} lg={14} xl={14}>
        <div ></div>
        </Col>
        <Col xs={10} sm={10} md={8} lg={10} xl={10}>
       
              <Form.Item>
             
    <div className="btn-footer-employee align-items-right justify-content-right">
               
  <Button type="primary" htmlType="submit" className="primary-btn-ad-employee  align-items-right justify-content-right">
    Submit
  </Button>

  </div>
 
</Form.Item>
</Col>
</Row>

</Form>

</Modal>
);
};


export default AddEmployee
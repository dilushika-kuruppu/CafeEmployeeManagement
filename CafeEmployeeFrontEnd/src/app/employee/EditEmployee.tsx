import React, {  useEffect, useState }  from "react";
import { Link,useLocation } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Row, Col,Select,Form,Avatar,Upload, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { ApplicationState } from "../../shared/interfaces/commonInterfaces";
import { getCafeList } from "../../redux/actions/cafes";
import { updateEmployee } from "../../redux/actions/employee";


const { Option } = Select;
const { TextArea } = Input;
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

  interface EditEmployeeProps{
    open:boolean,
    handleOk: ()=>void,
    setVisible:any,
    type:number,
    updateData:object,
    id:any,
    employee:any,
    currentData: any,
    onModalClose? : () => void,
  }
  
    const EditEmployee : React.FC<EditEmployeeProps> = ({open,handleOk,setVisible,type,id,currentData,onModalClose}) => {
      const [form] = Form.useForm();
      const [EditEmployee] = useForm<object>();
      const dispatch = useDispatch();
    
  
 
      const onChange =( e: any) =>{
        //  setStartDate(e)
     console.log(e);
      }
       
     const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
     const onFinish = (values :any) => {
        console.log(values);
     const data = EditEmployee.getFieldsValue();
 
     updateEmployeedata(currentData.id,data);
        onModalClose;
        setVisible(false);
        console.log(EditEmployee.getFieldsValue());
      };
      const onReset = () => {
        form.resetFields();
      };
      const onFill = () => {
        form.setFieldsValue({
          
        });
      };
      const handleCancel = () => {
        console.log('abc');
        setVisible(false);
        onReset()
    };
  
   const updateEmployeedata = (employeeId: string, reqData: any) => {
    dispatch(updateEmployee(employeeId,reqData) as any)
    
    onModalClose;
    setVisible(false);
    
}
const handleGetCafeList = () => {
    dispatch(getCafeList())
}

const initialValuesedit = (data :any) => {

    if(data){
    
   return   {
     
       name: data.employee.name   || '',
       email: data.employee.email || ''  ,
       mobileNumber: data.employee.mobileNumber ? data.employee.mobileNumber.slice(3) :'',
       gender: data.employee.gender || '',
       cafe: data.cafeName || ''
  
   }
 
    }
 
    return undefined;
 
 }
const validateMessages = {
    required: '${label} is required!',
    types: {
      string: '${label} is not a valid string!',
    },
    string: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  return (
<Modal   
width={1000}
    open={setVisible}
    title="UPDATE EMPLOYEE DETAILS "
    onCancel={onModalClose}
    validateMessages={validateMessages}
    className='update-employee'
footer={null}

>
  <Form 
  form={EditEmployee} name="editEmployee" 
  initialValues={initialValuesedit(currentData)} 
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
              <Form.Item
                        name="mobileNumber"
                        label='Mobile Number'>
                            <Input className="phoneNumber" disabled/>
                            </Form.Item>
              <Form.Item label="Gender" name="gender">
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

export default EditEmployee
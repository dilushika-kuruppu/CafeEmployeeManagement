import React, {  useEffect, useState }  from "react";
import { Link,useLocation } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Row, Col,Select,Form,Avatar,Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { ApplicationState } from "../../shared/interfaces/commonInterfaces";
import { createCafe, getcafeList } from "../../redux/actions/cafes";


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

  interface EditCafeProps{
    open:boolean,
    handleOk: ()=>void,
    setVisible:any,
    type:number,
    updateData:object,
    id:any,
    cafe:any,
    currentData: any,
    onModalClose? : () => void,
  }
  
    const EditCafe : React.FC<EditCafeProps> = ({open,handleOk,setVisible,type,id,currentData,onModalClose}) => {
      const [form] = Form.useForm();
      const [EditCafe] = useForm<object>();
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
     const data = EditCafe.getFieldsValue();
 
     updateCafedata(currentData.id,data);
        onModalClose;
        setVisible(false);
        console.log(EditCafe.getFieldsValue());
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
  
   const updateCafedata = (cafeId: string, reqData: any) => {
    dispatch(updateCafe(cafeId,reqData) as any)
    
    onModalClose;
    setVisible(false);
    
}

const initialValuesedit = (data :any) => {

    if(data){
    
   return   {
     
       name: data.cafe.name   || '',
       description: data.cafe.description || ''  ,
       logo: data.cafe.logo || '',
       location: data.cafe.location || ''
  
   }
 
    }
 
    return undefined;
 
 }
const validateMessages = {
    required: '${label} is required!',
    types: {
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
    title="UPDATE CAFE DETAILS "
    onCancel={onModalClose}
    validateMessages={validateMessages}
    className='update-cafe'
footer={null}

>
  <Form 
  form={EditCafe} name="editCafe" 
  initialValues={initialValuesedit(currentData)} 
  onFinish={onFinish} layout="vertical">
  <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }} className='add-cafe-main' >
  <Col xs={14} sm={14} md={14} lg={14} xl={14}>
    <h4 className="cafe-head"><span> New Cafe</span></h4>
    <div  className='cafe-details'>
  <Form.Item name="name" label ='Name'
   rules={[{ required: true,type: 'string', min: 6, max: 10 , message: 'Please Enter cafe Name!' }]}>
    <Input  placeholder="Please type" />  
          </Form.Item>
          <Form.Item name="description" label='Description '
           rules={[{ required: true, type: 'string', min: 0, max: 256 , message: 'Please Enter  description!' }]}>
            <TextArea rows={4}  className="Description" placeholder="Please type" />
              </Form.Item>  
            
              <Form.Item label="Logo" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Logo</div>
            </div>
          </Upload>
        </Form.Item>

                  <Form.Item label='Location' 
                  name="location" 
                   rules={[{ required: true, message: 'Please Enter cafe location!' }]}>
                      <Input className="location" placeholder="Please type"/>   
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
             
    <div className="btn-footer-cafe align-items-right justify-content-right">
               
  <Button type="primary" htmlType="submit" className="primary-btn-ad-cafe  align-items-right justify-content-right">
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

export default EditCafe
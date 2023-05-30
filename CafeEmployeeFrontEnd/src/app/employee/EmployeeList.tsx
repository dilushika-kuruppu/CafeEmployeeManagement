import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Row, Select,Avatar, Table } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { ColumnsType } from "antd/lib/table";
import { TablePagination } from "@mui/material";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import AddEmployee from "./AddEmployee";
import { Employee } from "../../shared/interfaces/employeeInterface";
import { useDispatch ,useSelector} from "react-redux";
import { ApplicationState } from "../../shared/interfaces/commonInterfaces";
import notificationAlert from "../../utils/notificationAlert";
import { getEmployeeList } from "../../redux/actions/employee";
import EditEmployee from "./EditEmployee";


interface DataType {
    id: string;
    employee:Employee;

}
interface LocationState {
    from: string
}
const EmployeeList = () => {

    const dispatch = useDispatch();
    const employeeDetail = useSelector((state: ApplicationState) => state.employee.employeeDetail);
    const employeeList = useSelector((state: ApplicationState) => state.employee.employeeList);
   const  employeeListData =  employeeList &&  employeeList?.employees ?  employeeList.employees : [];
    const  employeeListError = useSelector((state: ApplicationState) => state.employee.employeeListError);
    const employeeListTotalCount = employeeList && employeeList?.employees ? employeeList.totalRecords : 0;

    const [totalCount, settotalCount] = useState(0);
    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [updateData, setUpdateData] = useState({})
    const [fieldType, setFieldType] = useState(1);

    const handleOk = () => {
        setEditVisible(false);
        setAddVisible(false);
      };
      const handleCancel = () => {
        setEditVisible(false);
      };
      const onModalClose =() =>{
        setEditVisible(false);
        setAddVisible(false);
      };
      const showDeleteConfirm=() =>{
  
      }
    const items = useSelector((state: ApplicationState) =>
        state.employee.take
    );

  
    const skip = useSelector((state: ApplicationState) =>
        state.employee.skip
    );

 

    const currentPage = useSelector((state: ApplicationState) =>
        state.employee.currentPage
    );

    const { Option } = Select;

    useEffect(() => {
        if (employeeListError) {
            notificationAlert('error', employeeListError);
           
        }
    }, [employeeListError]);


   
    useEffect(() => {
        if (employeeListData.length > 0) {
            settotalCount(employeeListTotalCount)
        }
    }, [employeeListTotalCount, employeeListData,])

    const handleEmployeeList = () => {
        dispatch(getEmployeeList() as any)
   }

   const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
) => {
    
     
    handleEmployeeList();
};

const handleRowsPerPageChange = (event: any) => {
   
      
        handleEmployeeList();
}
    const columns: ColumnsType<DataType > =

 [
 
    {
        title: 'EMPLOYEE ID',
        dataIndex: 'id',
        key: 'id',
        responsive: ['md'],
        
        render: (text, record, index) =>
            <Row className="fw-600">
                {record.employee? record.employee.id : '-'}
            </Row>,
    },
    {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) =>
            <Row className="fw-500">
                {record.employee? record.employee.name : '-'}
            </Row>,
    },
    {
        title: 'EMAIL ADDRESS',
        dataIndex: 'email',
        key: 'email',
        render: (text, record) =>
            <Row className="fw-500">
                {record.employee.email ? record.employee.email : '-'}
            </Row>,
    },
  
    {
        title: 'MOBILE NUMBER',
        dataIndex: 'mobileNumber',
        key: 'mobileNumber',
        render: (text, record, index) =>
            <Row className="fw-500">
                {record.employee? record.employee.mobileNumber : '-'}
            </Row>,
    },
    {
        title: 'CAFE NAME',
        dataIndex: 'cafe',
        key: 'cafe',
        render: (text, record) =>
            <Row className="fw-500">
               
                {record.employee.cafe  }
            </Row>,
    },
    {
        title: 'DAYS WORKED IN THE CAFE',
        key: '',
        dataIndex: '',
        align: "right",
       
        render: (text, record) =>
            <Row className="fz-xs justify-content-right">
                {record.employee.daysWorked}
            </Row>
    },
    {
        title: '',
        key: '',
        dataIndex: '',
        align: "right",
       
        render: (text, record) =>
            <Row className="fz-xs justify-content-right">
                <div style={{ width: 90, padding: 1 , height: 21 }} className={`align-items-center justify-content-right fw-800 `}>
                
    <Button className="edit-btn"  onClick={() => setEditVisible(true) } >Edit
    </Button>
  
      
{/* add edit modal */}
<EditEmployee
open={editVisible}
handleOk={handleOk}
setVisible={editVisible}
type={fieldType}
updateData={updateData}
id={employeeListData?.id}
currentData ={employeeDetail}
onModalClose ={onModalClose}
employee={employeeDetail?.employee}
></EditEmployee> 
                <Button onClick={showDeleteConfirm} type="dashed">
      Delete
    </Button>
                </div>
            </Row>
    }
];

    return(
    <>
    
    <div id="employee-list" className="fz-md fw-600">Employees</div>

    <Button id="button-edit" key="submit"  type="primary" onClick={() => { setAddVisible(true)
           }
           } className="primary-btn-create-employee  align-items-right ml 2">
             Create New Employee
           </Button>
           <AddEmployee
                 open={addVisible}
                 handleOk={handleOk}
                 type={fieldType}
                 setVisible={addVisible}
                 onModalClose ={onModalClose}
            ></AddEmployee> 
    <Breadcrumb className="pb-5">
        <Breadcrumb.Item className="active-breadcrumb fw-600 fz-sm">Employee List
        </Breadcrumb.Item>
    </Breadcrumb>

    <Card className='employee-list card-wrapper'>
    <div  className="card-title-employee-list">Employee List</div>   
<Table className='employee-list-table' rowKey="id"  columns={columns} dataSource={handleEmployeeList()} style={{ overflowX: 'auto', width: '100%' }} 
         />
          <div className={'align-items-center justify-content-space-between '}>
          <div className="fz-sm pagination-wrapper">Showing {handleEmployeeList()?.length} of {handleEmployeeList()?.length} records</div>
        
            <TablePagination
            
                component={'div'}
                rowsPerPage={items}
                page={currentPage}
                sx={{}}
                count={handleEmployeeList().length}
                rowsPerPageOptions={handleEmployeeList().length > 10 ? [10] : [10]}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                hidden={employeeListData.length === 0}
                className={`pagin ${handleEmployeeList().length < 10 ? 'hidepagination' : 'eee'}`}>
            </TablePagination>
         
        </div>
        </Card>
</>
)
}

export default EmployeeList
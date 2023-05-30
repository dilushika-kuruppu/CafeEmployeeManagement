import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Row, Select,Avatar, Table } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { ColumnsType } from "antd/lib/table";
import { TablePagination } from "@mui/material";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import AddCafe from "./AddCafe";
import { Cafe } from "../../shared/interfaces/cafeInterfaces";
import { useDispatch ,useSelector} from "react-redux";
import { ApplicationState } from "../../shared/interfaces/commonInterfaces";
import notificationAlert from "../../utils/notificationAlert";
import EditCafe from "./EditCafe";


interface DataType {
    id: string;
    cafe:Cafe;

}
interface LocationState {
    from: string
}
const CafeList = () => {

    const dispatch = useDispatch();
    const cafeDetail = useSelector((state: ApplicationState) => state.cafe.cafeDetail);
    const cafeList = useSelector((state: ApplicationState) => state.cafe.cafeList);
   const  cafeListData =  cafeList &&  cafeList?.cafes ?  cafeList.cafes : [];
    const  cafeListError = useSelector((state: ApplicationState) => state.cafe.cafeListError);
    const cafeListTotalCount = cafeList && cafeList?.cafes ? cafeList.totalRecords : 0;

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

    const items = useSelector((state: ApplicationState) =>
        state.cafe.take
    );
    const showDeleteConfirm=() =>{
  
    }
  
    const skip = useSelector((state: ApplicationState) =>
        state.cafe.skip
    );

 

    const currentPage = useSelector((state: ApplicationState) =>
        state.cafe.currentPage
    );

    const { Option } = Select;

    useEffect(() => {
        if (cafeListError) {
            notificationAlert('error', cafeListError);
           
        }
    }, [cafeListError]);

    const handleCafeList = (location:string) => {
        dispatch(getCafeList())
   }
   
    useEffect(() => {
        if (cafeListData.length > 0) {
            settotalCount(cafeListTotalCount)
        }
    }, [cafeListTotalCount, cafeListData,])

    const columns: ColumnsType<DataType > =

 [
 
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        responsive: ['md'],
        
        render: (text, record, index) =>
            <Row className="fw-600">
                {index + 1}
            </Row>,
    },
   
    {
        title: 'LOGO',
        dataIndex: 'logo',
        key: 'logo',

        render: (text, record, index) =>
    
            <Row className="fw-500">
                  <div>
                           {record?.cafe?.logo ?
                                    <Avatar size={35} style={{top: 2}} shape='circle' src={record?.cafe?.logo} />
                                    :
                                    <Avatar size={35} style={{top: 2}} />
                                }
                       
                </div>
                
            </Row>,
    },
    
 
    {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) =>
            <Row className="fw-500">
                {record.cafe? record.cafe.name : '-'}
            </Row>,
    },
    {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) =>
            <Row className="fw-500">
                {record.cafe.description ? record.cafe.description : '-'}
            </Row>,
    },
    {
        title: 'EMPLOYEES',
        dataIndex: 'employees',
        key: 'employees',
        render: (text, record) =>
            <Row className="fw-500">
               
                {record.cafe.employees  }
            </Row>,
    },
    {
        title: 'LOCATION',
        key: 'location',
        dataIndex: 'location',
      
       
        render: (text, record) =>
        <Row className="fw-500">
               
        {record.cafe.location  }
    </Row>,
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
<EditCafe
open={editVisible}
handleOk={handleOk}
setVisible={editVisible}
type={fieldType}
updateData={updateData}
id={cafeListData?.id}
currentData ={cafeDetail}
onModalClose ={onModalClose}
cafe={cafeDetail?.cafe}
></EditCafe> 
                <Button onClick={showDeleteConfirm} type="dashed">
      Delete
    </Button>
                </div>
            </Row>
    }
];

    return(
    <>
    
    <div id="cafe-list" className="fz-md fw-600">Cafes</div>

    <Button id="button-edit" key="submit"  type="primary" onClick={() => { setAddVisible(true)
           }
           } className="primary-btn-create-event  align-items-right ml 2">
             Create New Appointment
           </Button>
           <AddCafe
                 open={addVisible}
                 handleOk={handleOk}
                 type={fieldType}
                 setVisible={addVisible}
                 onModalClose ={onModalClose}
            ></AddCafe> 
    <Breadcrumb className="pb-5">
        <Breadcrumb.Item className="active-breadcrumb fw-600 fz-sm">Cafe List
        </Breadcrumb.Item>
    </Breadcrumb>

    <Card className='cafe-list card-wrapper'>
    <div  className="card-title-cafe-list">Cafe List</div>   
<Table className='cafe-list-table' rowKey="id"  columns={columns} dataSource={handleCafeList()} style={{ overflowX: 'auto', width: '100%' }} 
 />
          <div className={'align-items-center justify-content-space-between '}>
          <div className="fz-sm pagination-wrapper">Showing {handleCafeList()?.length} of {handleCafeList()?.length} records</div>
        
            <TablePagination
            
                component={'div'}
                rowsPerPage={items}
                page={currentPage}
                sx={{}}
                count={handleCafeList().length}
                rowsPerPageOptions={handleCafeList().length > 10 ? [10] : [10]}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                hidden={cafeListData.length === 0}
                className={`pagin ${handleCafeList().length < 10 ? 'hidepagination' : 'eee'}`}>
            </TablePagination>
         
        </div>
        </Card>
</>
)
}

export default CafeList
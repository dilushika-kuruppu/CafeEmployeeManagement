export interface IAppAction {
    type: string
}

export type DispatchType = (args: IAppAction) => IAppAction

export type CommonState = {
    activeKey: string,
    isSpin: boolean
}

export type EmployeeList = {
    employees: any[],
    totalRecords: number,
}

export type EmployeeState = {
    employeeList: EmployeeList,
    employeeDetail:any,
    employeeListError: any,
    employeeDetailError:any,
    employeeUpdateError:any,
    rows: number,
    skip: number,
    take: number,
    currentPage: number
}

export type CafeState = {
    cafeList: CafeList,
    cafeListError: any,
    rows: number,
    skip: number,
    take: number,
    currentPage: number,
    cafeDetail: any,
    cafeDetailError: any,
    cafeUpdateError:any
}
export type CafeList = {
    cafes: any[],
    totalRecords: number,
}

import { WarningFilled } from '@ant-design/icons';
import "../../assets/styles.scss";
import React from 'react';

const ErrorMessage = ({message}: any) => {
    return (
        <>
            <div className="fz-xs text-error align-items-center" style={{ paddingTop: 2 }}>
                <>
                    <WarningFilled className="text-red fz-lg pr-1" />{message}
                </>
            </div>
        </>
    )
}

export default ErrorMessage;
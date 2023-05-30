import { ButtonProps } from "antd";
import React from "react";

interface IButton extends ButtonProps {
    title: string;
}

const Button = ({ title, htmlType}: IButton) => {
    return (
        <>
            <Button id="btn-submit" style={{ width: "100%" }} size="large" className="primary-btn" type="primary" htmlType={htmlType} title={""}>{title}</Button>
        </>
    )
}

export default Button;
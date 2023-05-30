import { notification } from "antd";
export type NotificationType = 'success' | 'info' | 'warning' | 'error';


const NotificationAlert = (type: NotificationType, message: string) => {

    notification[type]({
        message:( type.toUpperCase()),
        description: message,
        placement: 'topRight',
        duration: 3.0,
        style: { color: type === "error" ? "red" : "black" },
    
      
        
    });
}

export default  NotificationAlert

import styles from "./toast.module.css";
import { useState, useEffect } from "react";
import { toastEvents } from "./ToastController";
const Toast = () => {
  const [visible, setIsVisible] = useState(false);
  const [data, setData] = useState({
    user: 0,
    bell: 0,
    mail: 0,
  });
  useEffect(() => {
    const show = (info) => {
        setData(info);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000);
    };
    // 自定义事件 show是事件的名字
    // toastEvents 是mitt 的实例
    // on 监听一个事件
    toastEvents.on("show", show);
    return () => toastEvents.off("show", show);
  }, []);
  // 等待通信的到来
  // 事件机制
  if (!visible) return null;
  return (
    <div className={styles.toastWrapper}>
        <div className={styles.toastItem}>👤 {data.user}</div>
        <div className={styles.toastItem}>🔔 {data.bell}</div>
        <div className={styles.toastItem}>✉️ {data.mail}</div>
        <div className={styles.toastArrow}></div>
    </div>
  );
};

export default Toast;

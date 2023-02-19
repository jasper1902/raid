import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
type Props = {};

const NotificationComponent = (props: Props) => {
  const update = () => {
    // const date1 = new Date("2023-2-6");
    // const date2 = new Date();
    // const timeDiff = date2.getTime() - date1.getTime();
    // const diffDays = timeDiff / (1000 * 3600 * 24);
    // if (diffDays < 0) {
    //   toast.info("Message", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }
  };
  useEffect(() => update(), []);
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export default NotificationComponent;

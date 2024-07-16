import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification } from "../../redux/actions/notificationActions";
import { IoCloseSharp } from "react-icons/io5";

export const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  let styles = {};

  useEffect(() => {
    if (notification?.visible && !notification?.sticky) {
      const timer = setTimeout(() => {
        dispatch(closeNotification());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);


  if (notification?.type === "success") {
    styles = {
      background: "#01bd84",
      color: "white",
      border: "1px solid #01bd84",
    };
  }
  if (notification?.type === "error") {
    styles = {
      background: "#f24d53",
      color: "white",
      border: "1px solid #f24d53",
    };
  }
  if (notification?.type === "info") {
    styles = {
      background: "#1b72e8",
      color: "white",
      border: "1px solid #1b72e8",
    };
  }
  return (
    notification?.visible && (
      <div
        className={`absolute notification left-14 right-0 m-auto w-[40%] top-20 ${notification.type}`}
      >
        <div
          style={styles}
          className="p-2 px-5 flex items-center justify-between rounded-md"
        >
          <p className="font-semibold">{notification.message}</p>
          <button
            className="h-5 text-xl"
            onClick={() => dispatch(closeNotification())}
          >
            <IoCloseSharp />
          </button>
        </div>
      </div>
    )
  );
};
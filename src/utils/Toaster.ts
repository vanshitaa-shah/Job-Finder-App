import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TosterStyle = {
  background: "#2c2c2c",
  color: "#fff",
};

export const success = (message: string) =>
  toast.success(message, {
    style: TosterStyle,
  });

export const error = (message: string) => {
  toast.error(message, { style: TosterStyle });
};

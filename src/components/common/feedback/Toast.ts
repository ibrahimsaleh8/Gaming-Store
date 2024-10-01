import Swal from "sweetalert2";

export const ToastSweeat = (time: number) => {
  return Swal.mixin({
    toast: true,
    position: "bottom-right",
    showConfirmButton: false,
    background: "#303030",
    color: "white",
    customClass: {
      timerProgressBar: "bg-yellow-text",
    },
    timer: time,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

import toast from "react-hot-toast";
export const createNotification = (
  fn,
  loadingMessage,
  successMessage,
  errorMessage,
) => {
  return toast.promise(
    fn,
    {
      loading: loadingMessage || null,
      success: successMessage,
      error: (error) => error.message || errorMessage,
    },
    {
      style: {
        color: "#EA580C",
        background: "rgba( 0, 0, 0, 0.3 )",
        boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )`,
        backdropFilter: `blur( 6px )`,
        webkitBackdropFilter: "blur( 6px )",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
      },
    },
  );
};

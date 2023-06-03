// eslint-disable-next-line react/prop-types
const MyButton = ({ onClick, className, children, type }) => {
  return (
    <>
      {type === "main" && (
        <button
          className={` bg-customColor text-[#FFFFFF] text-[14px] font-semibold rounded py-[4px] px-[20px] ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
      {type === "submit" && (
        <button
          className={` bg-customSaveColor text-[#FFFFFF] text-[14px] font-semibold rounded py-[4px] px-[20px] ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
      {type === "delete" && (
        <button
          className={` bg-customDeleteColor text-[#FFFFFF] text-sm font-semibold rounded py-[4px] px-5 ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
      {type === "cancel" && (
        <button
          className={` text-[red] text-[14px] font-semibold border-[2px]  border-customDeleteColor py-[3px] rounded px-[20px] ${className} `}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default MyButton;

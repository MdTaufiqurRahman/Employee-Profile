import { useState } from "react";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import EditIcon from "../../assets/EditIcon.svg";
import MyButton from "../../common/components/Buttons/Button";
import CreateEmployeeProfile from "./CreatePage/CreateEmployeeProfile";

const EmployeeLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployeeIndex, setEditEmployeeIndex] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    openModal();
  };

  const headerData = [
    "SL",
    "Employee Name",
    "Employee Id",
    "Designation",
    "Email Address",
    "Phone No",
    "Action",
  ];

  //get data from local storage
  const storedData = localStorage.getItem("employeeData");
  const parsedData = JSON.parse(storedData);

  // delete Employee
  const deleteEmployee = async (index) => {
    const dataArray = JSON.parse(localStorage.getItem("employeeData")) || [];
    const updatedDataArray = dataArray.filter(
      (item, itemIndex) => itemIndex !== index
    );
    localStorage.setItem("employeeData", JSON.stringify(updatedDataArray));
    window.location.reload();
  };

  // edit Employee
  const handleEditEmployee = (index) => {
    setEditEmployeeIndex(index);
    openModal();
  };

  return (
    <>
      <div className="m-3">
        <div className="flex justify-between">
          <p className="font-semibold text-[16px]">Employee Profile</p>
          <MyButton onClick={handleClick} type="main">
            Create
          </MyButton>
        </div>

        <div className="flex flex-col mt-3">
          <div className="overflow-x-auto">
            <div className="w-full inline-block align-middle">
              <div className="overflow-hidden table_wrapper">
                <div className="table-responsive">
                  <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-[#CFD5DB]">
                      <tr>
                        {headerData?.map((item, index) => {
                          return (
                            <th
                              key={index}
                              scope="col"
                              className="px-5 py-[6px] text-[12px] text-[#333333] font-semibold text-center "
                            >
                              {item}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {parsedData?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-5 py-[15px] text-[14px] font-normal text-center">
                            {index + 1}
                          </td>
                          <td className="px-5 py-[15px] text-[14px] font-normal text-center">
                            {item?.employeeName}
                          </td>
                          <td className="px-5 py-[15px] text-[14px] font-normal text-center ">
                            {item?.employeeId}
                          </td>
                          <td className="px-5 py-[15px] text-[14px] font-normal text-center">
                            {item?.designation}
                          </td>
                          <td className="px-5 py-[15px] text-[14px] font-normal text-center">
                            {item?.employeeEmail}
                          </td>
                          <td className="px-5 py-[15px] text-[14px] font-normal text-center">
                            {item?.phone}
                          </td>
                          <td className="px-5 py-[15px] text-[14px] font-normal">
                            <div className="flex justify-center items-center">
                              <img
                                className="icon-image cursor-pointer mr-[7px] p-[5px] w-[22px] h-[22px] bg-[#F6E7EA]"
                                src={EditIcon}
                                alt=""
                                onClick={() => {
                                  handleEditEmployee(index);
                                }}
                              />
                              <img
                                className="icon-image cursor-pointer"
                                src={DeleteIcon}
                                alt=""
                                onClick={() => {
                                  deleteEmployee(index);
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateEmployeeProfile
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        employeeData={
          editEmployeeIndex !== null ? parsedData[editEmployeeIndex] : null
        }
        employeeIndex={editEmployeeIndex !== null ? editEmployeeIndex : -1}
      />
    </>
  );
};

export default EmployeeLandingPage;

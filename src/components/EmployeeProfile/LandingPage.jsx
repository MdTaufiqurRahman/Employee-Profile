import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Descriptions, Modal, Popconfirm, Table } from "antd";
import { useState } from "react";
import MyButton from "../../common/components/Buttons/Button";
import CreateEmployeeProfile from "./CreatePage/CreateEmployeeProfile";

const EmployeeLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployeeIndex, setEditEmployeeIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    openModal();
    setIsEdit(false); // Set isEdit to false for create mode
  };

  // Get employee data from local storage
  const storedData = localStorage.getItem("employeeData");
  const parsedData = JSON.parse(storedData);

  // delete employee
  const deleteEmployee = async (index) => {
    const dataArray = JSON.parse(localStorage.getItem("employeeData")) || [];
    const updatedDataArray = dataArray.filter(
      (item, itemIndex) => itemIndex !== index
    );
    localStorage.setItem("employeeData", JSON.stringify(updatedDataArray));
    window.location.reload();
  };

  // Edit employee
  const handleEditEmployee = (index) => {
    setEditEmployeeIndex(index);
    setIsEdit(true); // Set isEdit to true for edit mode
    openModal();
  };

  // Table columns
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Employee Id",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Email Address",
      dataIndex: "employeeEmail",
      key: "employeeEmail",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record, index) => (
        <div className="flex justify-center items-center">
          <EyeOutlined
            className="icon-image cursor-pointer mr-[5px] p-[4px] w-[22px] h-[22px] "
            icon={<EyeOutlined />}
            onClick={() => handleViewEmployee(index)} // Handle view employee click
          />
          <EditOutlined
            className="icon-image cursor-pointer mr-[5px] p-[4px] w-[22px] h-[22px] "
            icon={<EditOutlined />}
            onClick={() => handleEditEmployee(index)}
          />
          <Popconfirm
            title="Delete the Employee"
            description="Are you sure to delete this?"
            className="icon-image cursor-pointer mr-[5px] p-[4px] w-[22px] h-[22px]"
            onConfirm={() => deleteEmployee(index)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Add key to the data
  const data = parsedData?.map((item, index) => ({ ...item, key: index }));

  // View modal
  const handleViewEmployee = (index) => {
    setEditEmployeeIndex(index);
    setIsViewModalOpen(true); // Open the view modal
  };
  const viewModal = (
    <Modal
      title="View Employee Profile"
      visible={isViewModalOpen}
      onCancel={() => setIsViewModalOpen(false)}
      footer={null}
    >
      {editEmployeeIndex !== null && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Employee Name">
            {parsedData[editEmployeeIndex]?.employeeName}
          </Descriptions.Item>
          <Descriptions.Item label="Employee Id">
            {parsedData[editEmployeeIndex]?.employeeId}
          </Descriptions.Item>
          <Descriptions.Item label="Designation">
            {parsedData[editEmployeeIndex]?.designation}
          </Descriptions.Item>
          <Descriptions.Item label="Email Address">
            {parsedData[editEmployeeIndex]?.employeeEmail}
          </Descriptions.Item>
          <Descriptions.Item label="Phone No">
            {parsedData[editEmployeeIndex]?.phone}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );

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
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      {/* view modal  */}
      {viewModal}
      {/* create and edit modal */}
      <CreateEmployeeProfile
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        employeeData={
          isEdit && editEmployeeIndex !== null
            ? parsedData[editEmployeeIndex]
            : null
        }
        employeeIndex={
          isEdit && editEmployeeIndex !== null ? editEmployeeIndex : -1
        }
        isEdit={isEdit}
      />
    </>
  );
};

export default EmployeeLandingPage;

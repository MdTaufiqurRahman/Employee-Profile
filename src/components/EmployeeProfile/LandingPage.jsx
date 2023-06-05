import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Descriptions, Modal, Table } from "antd";
import { useState } from "react";
import MyButton from "../../common/components/Buttons/Button";
import CreateEmployeeProfile from "./CreatePage/CreateEmployeeProfile";

const EmployeeLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployeeIndex, setEditEmployeeIndex] = useState(null);
  // New state for the view modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    openModal();
  };

  const storedData = localStorage.getItem("employeeData");
  const parsedData = JSON.parse(storedData);

  const deleteEmployee = async (index) => {
    const dataArray = JSON.parse(localStorage.getItem("employeeData")) || [];
    const updatedDataArray = dataArray.filter(
      (item, itemIndex) => itemIndex !== index
    );
    localStorage.setItem("employeeData", JSON.stringify(updatedDataArray));
    window.location.reload();
  };

  const handleEditEmployee = (index) => {
    setEditEmployeeIndex(index);
    openModal();
  };

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
            className="icon-image cursor-pointer mr-[5px] p-[4px] w-[22px] h-[22px] bg-[#F6E7EA]"
            icon={<EyeOutlined />}
            onClick={() => handleViewEmployee(index)} // Handle view employee click
          />
          <EditOutlined
            className="icon-image cursor-pointer mr-[5px] p-[4px] w-[22px] h-[22px] bg-[#F6E7EA]"
            icon={<EditOutlined />}
            onClick={() => handleEditEmployee(index)}
          />
          <DeleteOutlined
            className="icon-image cursor-pointer mr-[5px] p-[4px] w-[22px] h-[22px] bg-[#F6E7EA]"
            icon={<DeleteOutlined />}
            onClick={() => deleteEmployee(index)}
          />
        </div>
      ),
    },
  ];

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
          editEmployeeIndex !== null ? parsedData[editEmployeeIndex] : null
        }
        employeeIndex={editEmployeeIndex !== null ? editEmployeeIndex : -1}
      />
    </>
  );
};

export default EmployeeLandingPage;

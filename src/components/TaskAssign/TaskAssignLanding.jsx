import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Descriptions, Modal, Table } from "antd";
import { useState } from "react";
import MyButton from "../../common/components/Buttons/Button";
import TaskCreate from "./CreatePage/TaskCreate";

const TaskAssignLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editEmployeeIndex, setEditEmployeeIndex] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    openModal();
  };

  const storedData = localStorage.getItem("taskAssignmentData");
  const parsedData = JSON.parse(storedData);

  const deleteTaskData = async (index) => {
    const dataArray =
      JSON.parse(localStorage.getItem("taskAssignmentData")) || [];
    const updatedDataArray = dataArray.filter(
      (item, itemIndex) => itemIndex !== index
    );
    localStorage.setItem(
      "taskAssignmentData",
      JSON.stringify(updatedDataArray)
    );
    window.location.reload();
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
      title: "Task Name",
      dataIndex: "task",
      key: "task",
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
            onClick={() => handleEditEmployeeTask(index)}
          />
          <DeleteOutlined
            className="icon-image cursor-pointer mr-[5px] p-[4px] w-[22px] h-[22px] bg-[#F6E7EA]"
            icon={<DeleteOutlined />}
            onClick={() => deleteTaskData(index)}
          />
        </div>
      ),
    },
  ];

  const data = parsedData?.map((item, index) => ({ ...item, key: index }));

  // Edit modal
  const handleEditEmployeeTask = (index) => {
    setEditEmployeeIndex(index);
    openModal();
  };

  // View modal
  const handleViewEmployee = (index) => {
    setEditEmployeeIndex(index);
    setIsViewModalOpen(true); // Open the view modal
  };
  const viewModal = (
    <Modal
      title="View Employee Task"
      visible={isViewModalOpen}
      onCancel={() => setIsViewModalOpen(false)}
      footer={null}
    >
      {editEmployeeIndex !== null && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Employee Name">
            {parsedData[editEmployeeIndex]?.employeeName}
          </Descriptions.Item>
          <Descriptions.Item label="Task Name">
            {parsedData[editEmployeeIndex]?.task}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );

  return (
    <>
      <>
        <div className="m-3">
          <div className="flex justify-between">
            <p className="font-semibold text-[16px]">Task Assign</p>
            <MyButton onClick={handleClick} type="main">
              Create
            </MyButton>
          </div>
          <div className="flex flex-col mt-3">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
        {viewModal}
        <TaskCreate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </>
    </>
  );
};

export default TaskAssignLanding;

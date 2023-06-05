import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Descriptions, Modal, Popconfirm, Table } from "antd";
import { useState } from "react";
import MyButton from "../../common/components/Buttons/Button";
import TaskCreate from "./CreatePage/TaskCreate";

const TaskAssignLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editEmployeeTaskIndex, setEditEmployeeTaskIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    openModal();
    setIsEdit(false); // Set isEdit to false for create mode
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
          <Popconfirm
            placement="topLeft"
            title="Delete the task"
            description="Are you sure to delete this?"
            className="icon-image cursor-pointer mr-[5px] p-[4px] w-[22px] h-[22px] bg-[#F6E7EA]"
            onConfirm={() => deleteTaskData(index)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const data = parsedData?.map((item, index) => ({ ...item, key: index }));

  // Edit modal
  const handleEditEmployeeTask = (index) => {
    setEditEmployeeTaskIndex(index);
    setIsEdit(true); // Set isEdit to true for edit mode
    openModal();
  };

  // View modal
  const handleViewEmployee = (index) => {
    setEditEmployeeTaskIndex(index);
    setIsViewModalOpen(true); // Open the view modal
  };
  const viewModal = (
    <Modal
      title="View Employee Task"
      visible={isViewModalOpen}
      onCancel={() => setIsViewModalOpen(false)}
      footer={null}
    >
      {editEmployeeTaskIndex !== null && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Employee Name">
            {parsedData[editEmployeeTaskIndex]?.employeeName}
          </Descriptions.Item>
          <Descriptions.Item label="Task Name">
            {parsedData[editEmployeeTaskIndex]?.task}
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
        <TaskCreate
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          taskAssignmentData={
            isEdit && editEmployeeTaskIndex !== null
              ? parsedData[editEmployeeTaskIndex]
              : null
          }
          employeeTaskIndex={
            isEdit && editEmployeeTaskIndex !== null
              ? editEmployeeTaskIndex
              : -1
          }
          isEdit={isEdit}
        />
      </>
    </>
  );
};

export default TaskAssignLanding;

/* eslint-disable react/prop-types */
import { Col, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import MyButton from "../../../common/components/Buttons/Button";
import MyModal from "../../../common/components/modal/MyModal";

const { Option } = Select;

const TaskCreate = ({
  isModalOpen,
  setIsModalOpen,
  taskAssignmentData,
  employeeTaskIndex,
  isEdit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (isEdit && taskAssignmentData) {
      form.setFieldsValue({
        employee: taskAssignmentData?.employeeName,
        task: taskAssignmentData?.task,
      });
    }
  }, [taskAssignmentData, form, isEdit]);

  // submit handler
  const handleFormSubmit = (values) => {
    const taskAssignmentData = {
      employeeName: values?.employee,
      task: values?.task,
    };
    const storedData = localStorage.getItem("taskAssignmentData");
    const existingTaskAssignments = JSON.parse(storedData) || [];

    if (isEdit && employeeTaskIndex !== -1) {
      existingTaskAssignments[employeeTaskIndex] = taskAssignmentData;
    } else {
      existingTaskAssignments.push(taskAssignmentData);
    }
    localStorage.setItem(
      "taskAssignmentData",
      JSON.stringify(existingTaskAssignments)
    );
    form.resetFields();
    setIsModalOpen(false);
  };
  // get employeeData from local storage for DDL
  const storedData = localStorage.getItem("employeeData");
  const parsedData = JSON.parse(storedData) || [];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Form form={form} onFinish={handleFormSubmit}>
      <MyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEdit ? "Edit Task For Employee" : "Create Task for Employee "}
      >
        <Row className="px-[25px]" gutter={[12, 2]}>
          <Col span={24}>
            <Form.Item
              name="employee"
              rules={[{ required: true, message: "Please select an employee" }]}
            >
              <Select placeholder="Select an employee">
                {parsedData.map((employee) => (
                  <Option
                    key={employee?.employeeId}
                    value={employee?.employeeName}
                  >
                    {employee?.employeeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="task"
              rules={[{ required: true, message: "Please enter a task" }]}
            >
              <Input placeholder="Enter a task" />
            </Form.Item>
          </Col>
        </Row>

        <div className="footer-part flex w-full justify-end my-[30px] pr-[30px]">
          <MyButton
            onClick={closeModal}
            type={"cancel"}
            className={"mr-[10px]"}
          >
            Cancel
          </MyButton>
          <MyButton type={"submit"}>{isEdit ? "Update" : "Save"}</MyButton>
        </div>
      </MyModal>
    </Form>
  );
};

export default TaskCreate;

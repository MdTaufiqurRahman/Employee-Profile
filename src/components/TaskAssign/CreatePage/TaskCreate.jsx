import { Col, Form, Input, Row, Select } from "antd";
import MyButton from "../../../common/components/Buttons/Button";
import MyModal from "../../../common/components/modal/MyModal";

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const TaskCreate = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    const taskAssignmentData = {
      employeeName: values?.employee,
      task: values?.task,
    };
    // Retrieve existing task assignments from localStorage
    const storedData = localStorage.getItem("taskAssignmentData");
    const existingTaskAssignments = JSON.parse(storedData) || [];
    // Add the new task assignment data to the existing array
    const updatedTaskAssignments = [
      ...existingTaskAssignments,
      taskAssignmentData,
    ];
    // Save the updated array to localStorage
    localStorage.setItem(
      "taskAssignmentData",
      JSON.stringify(updatedTaskAssignments)
    );

    form.resetFields();
    setIsModalOpen(false);
  };

  // Get the stored data from localStorage
  const storedData = localStorage.getItem("employeeData");
  const parsedData = JSON.parse(storedData) || [];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Form form={form} onFinish={handleFormSubmit}>
        <MyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={"Create Task for Employee "}
        >
          <Row className="px-[25px]" gutter={[12, 2]}>
            <Col span={24}>
              <Form.Item
                name="employee"
                rules={[
                  { required: true, message: "Please select an employee" },
                ]}
              >
                <Select placeholder="Select an employee">
                  {parsedData.map((employee) => (
                    <Option
                      key={employee.employeeId}
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
            <MyButton type={"submit"}> Save</MyButton>
          </div>
        </MyModal>
      </Form>
    </>
  );
};

export default TaskCreate;

import { Col, Form, Input, Row } from "antd";
import { useState } from "react";
import MyButton from "../../../common/components/Buttons/Button";
import MyModal from "../../../common/components/modal/MyModal";

// eslint-disable-next-line react/prop-types
const CreateEmployeeProfile = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Retrieve existing data from local storage or initialize as an empty array
      const dataArray = JSON.parse(localStorage.getItem("employeeData")) || [];

      // Add the new values to the array
      const updatedDataArray = [...dataArray, values];

      // Save the updated array in local storage
      localStorage.setItem("employeeData", JSON.stringify(updatedDataArray));

      setIsSubmitting(false);
      form.resetFields();
      setIsModalOpen(false);
    }, 500);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <MyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={"Create Employee Profile"}
        >
          <Row className="px-[25px]" gutter={[12, 2]}>
            <Col span={12}>
              <Form.Item
                label="Employee Name"
                name="employeeName"
                rules={[
                  { required: true, message: "Please enter employee name" },
                  {
                    max: 50,
                    message: "Employee name should not exceed 50 characters",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employee Id"
                name="employeeId"
                type="number"
                rules={[
                  { required: true, message: "Please enter employee ID" },

                  {
                    pattern: /^[0-9]*$/,
                    message: "Employee ID should be a number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Designation"
                name="designation"
                rules={[
                  { required: true, message: "Please enter designation" },
                  {
                    max: 50,
                    message: "Designation should not exceed 50 characters",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employee Email"
                name="employeeEmail"
                rules={[
                  { required: true, message: "Please enter employee email" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone No"
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                  {
                    pattern: /^01[3-9]\d{8}$/,
                    message: "Invalid phone number format",
                  },
                ]}
              >
                <Input />
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
            <MyButton type={"submit"} loading={isSubmitting}>
              Save
            </MyButton>
          </div>
        </MyModal>
      </Form>
    </>
  );
};

export default CreateEmployeeProfile;

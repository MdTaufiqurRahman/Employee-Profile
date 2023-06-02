import { DashboardOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-row min-h-[calc(100vh-80px)]">
        <Menu
          className="min-w-[200px]"
          onClick={(key) => {
            navigate(key?.key);
          }}
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              label: "Employee Profile",
              key: "/employeeProfile",
              icon: <TeamOutlined />,
            },
            {
              label: "Task Assign",
              key: "/taskAssign",
              icon: <DashboardOutlined />,
            },
          ]}
        ></Menu>
        <Content />
      </div>
      <Footer />
    </>
  );
};

function Content() {
  return (
    <>
      <Routes>
        <Route
          path="/employeeProfile"
          element={
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Architecto, delectus voluptatibus harum unde porro nobis atque
              aliquid aliquam nesciunt corrupti ab veniam consequatur corporis
              facere nisi quia magni fuga. Maxime!
            </div>
          }
        />
        <Route path="/taskAssign" element={<div>Task Assign</div>} />
      </Routes>
    </>
  );
}
export default Main;

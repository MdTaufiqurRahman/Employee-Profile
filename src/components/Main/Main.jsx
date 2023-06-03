import { PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeLandingPage from "../EmployeeProfile/LandingPage";

const { Content, Footer, Sider } = Layout;

function getItem(label, path, icon, children) {
  return {
    path,
    key: path,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Employee Profile", "/profile", <TeamOutlined />),
  getItem("Task Assign", "/task", <PieChartOutlined />),
];

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Router>
      <Layout className="min-h-screen">
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[window.location.pathname]}
            mode="inline"
          >
            {items.map((item) => (
              <Menu.Item key={item?.key} icon={item?.icon}>
                <Link to={item?.path}>{item?.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <div className="p-1 min-h-[550px] bg-[colorBgContainer]">
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/task" element={<Task />} />
              </Routes>
            </div>
          </Content>
          <Footer className="text-center">
            Codemen Solution BD ©2023 Created by Anik
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Main;

const Profile = () => (
  <>
    <EmployeeLandingPage />
  </>
);
const Task = () => <div>Task Page</div>;

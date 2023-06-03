import { useState } from "react";
import MyButton from "../../common/components/Buttons/Button";
import TaskCreate from "./CreatePage/TaskCreate";

const TaskAssignLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    openModal();
  };

  const headerData = [
    "SL",
    "Employee Name",
    "Task Name",
    "ID Card No.",
    "Action",
  ];
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
                      <tbody className="divide-y divide-gray-200"></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TaskCreate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </>
    </>
  );
};

export default TaskAssignLanding;

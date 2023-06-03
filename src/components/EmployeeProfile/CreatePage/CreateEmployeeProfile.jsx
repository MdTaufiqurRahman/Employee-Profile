import MyButton from "../../../common/components/Buttons/Button";
import MyModal from "../../../common/components/modal/MyModal";

// eslint-disable-next-line react/prop-types
const CreateEmployeeProfile = ({ isModalOpen, setIsModalOpen }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <MyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Create Employee Profile"}
      >
        <div className="footer-part flex w-full justify-end my-[30px] pr-[30px]">
          <MyButton
            onClick={closeModal}
            type={"cancel"}
            className={"mr-[10px]"}
          >
            Cancel
          </MyButton>
          <MyButton type={"submit"}>Save</MyButton>
        </div>
      </MyModal>
    </>
  );
};

export default CreateEmployeeProfile;

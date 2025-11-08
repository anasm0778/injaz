import AdminHome from "./AdminHome";
import AdminPageLogic from "./index";

const page = () => {
  return (
    <>
      <AdminPageLogic>
        <AdminHome />
      </AdminPageLogic>
    </>
  );
};

export default page;

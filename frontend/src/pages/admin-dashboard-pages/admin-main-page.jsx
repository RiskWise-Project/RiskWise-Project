import AdminNavigations from "../../components/dashboard-components/navigation-components/admin-navigations";
import { Outlet } from "react-router-dom";

function AdminMainPage() {
  return (
    <div className="dashboard-container flex flex-col md:flex-row h-screen w-full bg-[var(--color-white)]">
      <div className="navigation-container md:sticky fixed bottom-0 w-full h-16 md:h-screen md:w-fit z-56">
        <AdminNavigations />
      </div>

      <div className="content-container flex-1 p-4 md:h-full h-screen overflow-scroll bg-[var(--color-white)]">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminMainPage;

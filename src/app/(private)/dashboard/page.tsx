import Dashboard from "@/Components/Dashboard";
import Header from "@/Components/Headers";
import HeaderHomePage from "@/Components/Headers/HeaderHomePage";

const DashboardPage = async () => {
  return (
    <>
      <HeaderHomePage />
      <Dashboard />
    </>
  );
};

export default DashboardPage;

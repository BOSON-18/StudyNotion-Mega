import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/dashboard/SideBar";


const Dashboard = () => {
  
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return <div className="mt-10">Loading...</div>;
  }
  return (
    <div className="realtive flex min-h-[[calc(100ch-3.5rem)] w-full">
      <SideBar />
      <div className="h-[calc(100vh-3.5rem)] w-11/12 overflow-auto overflow-x-hidden">
        <div className="mx-auto w-11/12  py-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

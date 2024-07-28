import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import PublicLayout from "./publicView/PublicLayout";
import LinksContainer from "./publicView/LinksContainer";
import Home from "./publicView/Pages/Home";
import { RoutesJson } from "./RoutesJson";
import SignIn from "./publicView/Pages/SignIn";
import UploadFiles from "./Admin/FileManagement/UploadFiles";
import { Toaster } from "sonner";
import ExcelPreview from "./Admin/ExcelPreview";
import DashboardHome from "./Admin/DashboardHome";
import NotFoundPage from "./publicView/Pages/NotFoundPage";
import FileManagement from "./Admin/FileManagement/FileManagement";
import AddNotice from "./Admin/NoticeBoard/AddNotice";
import ManageNotice from "./Admin/NoticeBoard/ManageNotice";
import AddMedia from "./Admin/Media/AddMedia";
import Enquiries from "./Admin/Enquiry/Enquiries";
import ViewEnquiry from "./Admin/Enquiry/ViewEnquiry";
import Complaints from "./Admin/Complaint/complaints";
import ViewComplaint from "./Admin/Complaint/ViewComplaint";
import ManageMedia from "./Admin/Media/ManageMedia";
import AddBanner from "./Admin/Banner/AddBanner";
import ManageBanner from "./Admin/Banner/ManageBanner";
import ManageRecentUpdate from "./Admin/RecentUpdates/ManageRecentUpdate";
import AddRecentUpdate from "./Admin/RecentUpdates/AddRecentUpdate";
import AddMarque from "./Admin/Marque/AddMarque";
import ManageMarque from "./Admin/Marque/ManageMarque";
import Dashboard from "./Admin/Dashboard/Dashboard";
import React from "react";

function App() {
  //   useEffect(() => {
  //     console.log("Checking!!");
  //   }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<PublicLayout />}>
              {/* for sidebar */}
              {RoutesJson?.map((item) => {
                if (item.hasSubItem) {
                  return (
                    <Route
                      key={item.path}
                      path={item.path}
                      element={<LinksContainer itemData={item} />}
                    />
                  );
                } else {
                  return (
                    <Route
                      key={item.path}
                      path={item.path}
                      element={React.createElement(
                        item.component,
                        item.componentProps
                      )}
                    />
                  );
                }
              })}
            </Route>
            <Route path="/admin" element={<DashboardHome />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="upload-files" element={<UploadFiles />} />
              <Route path="manage-files" element={<FileManagement />} />
              <Route path="add-notice" element={<AddNotice />} />
              <Route path="manage-notice" element={<ManageNotice />} />
              <Route path="add-media" element={<AddMedia />} />
              <Route path="manage-media" element={<ManageMedia />} />
              <Route path="add-banner" element={<AddBanner />} />
              <Route path="manage-banner" element={<ManageBanner />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="enquiry/:enquireId" element={<ViewEnquiry />} />
              <Route path="complaints" element={<Complaints />} />
              <Route
                path="complaint/:complaintId"
                element={<ViewComplaint />}
              />
              <Route path="add-recent-updates" element={<AddRecentUpdate />} />
              <Route
                path="manage-recent-updates"
                element={<ManageRecentUpdate />}
              />
              <Route path="add-marque" element={<AddMarque />} />
              <Route path="manage-marque" element={<ManageMarque />} />
              {/* <Route path="/add-heading" element={<AddHeadings />} /> */}
            </Route>
            <Route path="/excel-preview" element={<ExcelPreview />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;

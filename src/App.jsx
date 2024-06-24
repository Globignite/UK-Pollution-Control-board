import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import PublicLayout from "./publicView/PublicLayout";  
import LinksContainer from "./publicView/LinksContainer";
import Home from "./publicView/Pages/Home";
import { RoutesJson } from "./RoutesJson";
import SignIn from "./publicView/Pages/SignIn";
import UploadFiles from "./publicView/Pages/Dashboard/UploadFiles";
import AddHeadings from "./Admin/AddHeadings";
import { Toaster } from 'sonner';
import ExcelPreview from "./publicView/Pages/Dashboard/ExcelPreview";
import DashboardHome from "./publicView/Pages/Dashboard/DashboardHome";

function App() {


	useEffect(() => {
		console.log("Checking!!")
	}, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<Home/>}
						/>
						<Route path="/" element={<PublicLayout />}> 
				{/* for sidebar */}
							{RoutesJson.map((item) => {
								if (item.hasSubItem) {
									return (
										<Route
											key={item.path}
											path={item.path}
											element={<LinksContainer  itemData={item}  />}
										/>
									)
								} else {
									return (
										<Route
											key={item.path}
											path={item.path}
											element={React.createElement(item.component, item.componentProps)}
										/>
									)
								}
							})}
						</Route>
						<Route
							path="/excel-preview"
							element={<ExcelPreview/>} 
						/>
						<Route
							path="/signIn"
							element={<SignIn/>} 
						/>
						<Route
							path="/dashboard/upload-files"
							element={<DashboardHome/>} 
						/>
						<Route
							path="/dashboard/add-heading"
							element={<AddHeadings/>} 
						/>
						<Route
							path="/dashboard/add-notifications"
							element={<AddHeadings/>} 
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
			<Toaster 
				position="top-center"
				richColors  
			/>
		</>
	);
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import PublicLayout from "./publicView/PublicLayout";  
import LinksContainer from "./publicView/LinksContainer";
import Home from "./publicView/Pages/Home";
import { RoutesJson } from "./RoutesJson";

function App() {
	return (
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
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;

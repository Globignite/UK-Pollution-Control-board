import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import PublicLayout from "./publicView/PublicLayout";
import WelcomeText from "./publicView/Components/WelcomeText";
import { LeftSidebarRoutes, pagesRouts } from "./RoutesJson";
import LeftMenuContent from "./publicView/LeftMenuContent";
import SubMenuContainer from "./publicView/SubMenuContainer";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PublicLayout />}>
            {/* for pages  */}
						{pagesRouts.map((item) => {
							return (
								<Route
									key={item.path}
									path={item.path}
									element={<item.component />}
								/>
							);
            })}
            {/* for sidebar */}
						{LeftSidebarRoutes.map((item) => {
							if (item.hasSubItem) {
								return (
									<Route
										key={item.path}
										path={item.path}
										element={<SubMenuContainer />}
									/>
								)
							} else {
								return (
									<Route
										key={item.path}
										path={item.path}
										element={<LeftMenuContent />}
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

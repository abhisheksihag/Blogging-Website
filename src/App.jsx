import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./lib/context";
import { router } from "./lib/routes";
function App() {
	return (
		<ChakraProvider>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</ChakraProvider>
	);
}

export default App;

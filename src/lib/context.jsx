import React, { createContext, useState } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }) {
	const [userDetails, setUserDetails] = useState({
		draft: [],
		bookmark: [],
		history: [],
		lists:[]
	});

	console.log("iam trggerd");

	return (
		<UserContext.Provider value={userDetails}>
			<UserDispatchContext.Provider value={setUserDetails}>
				{children}
			</UserDispatchContext.Provider>
		</UserContext.Provider>
	);
}

export { UserContext, UserDispatchContext, UserProvider };

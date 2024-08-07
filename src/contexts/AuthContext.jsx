import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const SAMPLE_USER = {
  name: "Bob",
  email: "bob@example.com",
  password: "qwerty",
};

function reducer(state, action) {
  switch (action.type) {
    case "login": {
      return { ...state, user: action.payload, isAuthenticated: true };
    }
    case "logout": {
      return { ...state, ...initialState };
    }
    default:
      throw new Error("invalid action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //compare to fake user
  function handleLogin(email, password) {
    if (email === SAMPLE_USER.email && password === SAMPLE_USER.password)
      dispatch({ type: "login", payload: SAMPLE_USER });
  }

  function handleLogout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) throw new Error("Used AuthContext outside of provider");
  return context;
}

export { AuthProvider, useAuth };

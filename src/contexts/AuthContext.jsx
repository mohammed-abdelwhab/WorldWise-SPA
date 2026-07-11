import { createContext, useContext, useReducer } from "react";
// This is a Fake Authentication context for a fake user (no Api endpoint check)

const initialState = {
  user: null,
  isAuthinticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer({ state, action }) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthinticated: true };
    case "logout":
      return { ...state, user: null, isAuthinticated: false };
    default:
      throw new Error("Unknown Action");
  }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isAuthinticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  function login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthinticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider!");
  return context;
}

export { AuthProvider, useAuth };

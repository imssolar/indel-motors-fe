import "./App.css";
import { FormClient } from "./Pages/Client/FormClient";

import { SignInside } from "./Pages/Login/SignInside";
import { FormUser } from "./Pages/User/FormUser";
import { AuthState } from "./context/Auth/AuthState";

function App() {
  return (
    <AuthState>
      {/* <SignInside /> */}
      {/* <FormUser/> */}
      <FormClient/>
    </AuthState>
  );
}

export default App;

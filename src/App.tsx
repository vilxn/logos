import AuthScreen from "./pages/AuthScreen.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChooseRoleScreen from "./pages/ChooseRoleScreen.tsx";
import ParentLayout from "./pages/parent/ParentLayout.tsx";
import Home from "./pages/parent/Home.tsx";
import Dashboad from "./pages/parent/Dashboad.tsx"



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/choose-role" element={<ChooseRoleScreen />} />
          <Route path="/dashboard" element={<Dashboad />}/>
          <Route path="/parent" element={<ParentLayout />}>
            <Route index element={<Home />} />
            {/*<Route path="progress" element={<ChildProgress />} />*/}
            {/*<Route path="appointments" element={<Appointments />} />*/}
            {/*<Route path="profile" element={<Profile />} />*/}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
export default App;
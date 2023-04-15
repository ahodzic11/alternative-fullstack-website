import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Statut from "./pages/Statut";
import RealAboutUs from "./pages/RealAboutUs";
import OthersAboutUs from "./pages/OthersAboutUs";
import Admin from "./pages/AdminPage";
import AdminPanel from "./pages/AdminPanel";
import AddWorkshopPage from "./pages/AddWorkshopPage";
import AddActivityPage from "./pages/AddActivityPage";
import AddProjectPage from "./pages/AddProjectPage";
import AddNewsPage from "./pages/AddNewsPage";
import Workshops from "./pages/Workshops";
import ChooseImage from "./pages/ChooseImage";
import ReadWorkshops from "./pages/ReadWorkshops";
import EditWorkshops from "./pages/EditWorkshops";
import WorkshopList from "./pages/WorkshopList";
import WorkshopDetailed from "./components/WorkshopDetailed";
import AllWorkshops from "./pages/AllWorkshops";
import WorkshopInformation from "./components/WorkshopInformation";
import Treneri from "./components/Treneri";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nastim" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/statut" element={<Statut />} />
          <Route path="/onama" element={<RealAboutUs />} />
          <Route path="/drugionama" element={<OthersAboutUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/dodajradionicu" element={<AddWorkshopPage />} />
          <Route path="/dodajaktivnost" element={<AddActivityPage />} />
          <Route path="/dodajprojekat" element={<AddProjectPage />} />
          <Route path="/dodajvijest" element={<AddNewsPage />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/chooseimage/:name" element={<ChooseImage />} />
          <Route path="/readworkshops" element={<ReadWorkshops />} />
          <Route path="/editworkshop/:name" element={<EditWorkshops />} />
          <Route path="/workshops/:area" element={<WorkshopList />} />
          <Route path="/workshops/details/:name" element={<WorkshopDetailed />} />
          <Route path="/workshops/workshopdetails/:name" element={<WorkshopInformation />} />
          <Route path="/allworkshops" element={<AllWorkshops />} />
          <Route path="/treneri" element={<Treneri />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

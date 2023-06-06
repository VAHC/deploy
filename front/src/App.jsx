//Librerias
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

//Componentes
import { Home } from "./components/home/Home";
import { Nav } from "./components/nav/Nav";
import { Catalogo } from './components/catalogo/Catalogo';
import { Suscripcion } from './components/suscripcion/Suscripcion';
import { Footer } from "./components/footer/Footer";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { ProtectRoutes } from "./components/protectRoutes/ProtecRoutes";
import Dashboard from "./components/adminDashboard/Dashboard"
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { Ingreso } from "./components/login/Ingreso";
import { FAQs } from "./components/footer/FAQs";
import MyReviews from "./components/UserDashboard/myReviews/MyReviewsContainer";
import FormEditReviews from "./components/UserDashboard/myReviews/FormEditReviews";
import CartContainer from "./components/shoppingCart/CartContainer";
import { ChangePass } from "./components/login/ChangePass";

function App() {

  const user = useSelector((state) => state.user);

  return (
    //Descomentar para utilizar rutas protegidas
    // <>
    //   <Nav />
    //   <Routes>
    //     {/* Rutas públicas */}
    //     <Route exact path="/" element={<Home />} />
    //     <Route exact path="/nosotros" element={<AboutUs />} />
    //     <Route exact path="/suscripcion" element={<Suscripcion />} />
    //     <Route exact path="/catalogo" element={<Catalogo />} />
    //     <Route exact path="/ingresar" element={<Login />} />
    //     <Route exact path="/registro" element={<Registro />} />
    //     <Route exact path="/preguntas-frecuentes" element={<FAQs />} />
    //     {/* Rutas de user */}
    //     <Route element={<ProtectRoutes isAllowed={!!user && user.profile !== "admin"} />}>
    //       <Route exact path="/perfil" element={<UserDashboard />} />
    //       <Route exact path="/misReseñas" element={<MyReviews />} />
    //       <Route exact path="/editarReseña" element={<FormEditReviews />} />
    //     </Route>
    //     {/* Rutas de admin */}
    //     <Route exact path="/admindashboard" element={<ProtectRoutes isAllowed={!!user && user.profile === "admin"}>
    //       <Dashboard />
    //     </ProtectRoutes>} />
    //   </Routes>
    //   <Footer />
    // </>

    <>
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/nosotros" element={<AboutUs/>}/>
        <Route exact path="/suscripcion" element={<Suscripcion/>}/>
        <Route exact path="/catalogo" element={<Catalogo/>}/>
        <Route exact path="/ingresar" element={<Ingreso/>}/>
        <Route exact path="/preguntas-frecuentes" element={<FAQs/>}/>
        <Route exact path="/perfil" element={<UserDashboard/>}/>
        <Route exact path="/misReseñas" element={<MyReviews/>}/>
        <Route exact path="/editarReseña" element={<FormEditReviews/>}/>
        <Route exact path="/admindashboard" element={<Dashboard/>}/>
        <Route exact path="/carrito" element={<CartContainer/>}/>
        <Route exact path="/restablecer-contraseña" element={<ChangePass/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App


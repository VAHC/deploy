//Librerias
import { Route, Routes, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";

//Action para logueo
import { login } from "./redux/action";

//Componentes
import { Home } from "./components/home/Home";
import { Nav } from "./components/nav/Nav";
import { Catalogo } from './components/catalogo/catalogo';
import { Suscripcion } from './components/suscripcion/Suscripcion';
import { Footer } from "./components/footer/Footer";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { ProtectRoutes } from "./components/protectRoutes/ProtecRoutes";
import Dashboard from "./components/adminDashboard/Dashboard"
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { Login } from "./components/login/Login";
import { Registro } from "./components/login/Registro";
import { FAQs } from "./components/footer/FAQs";
import MyReviews from "./components/UserDashboard/myReviews/MyReviewsContainer";
import FormEditReviews from "./components/UserDashboard/myReviews/FormEditReviews"

function App() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:3001/books/auth/authSocial/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         console.log(response)
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         console.log(resObject.user)
  //         dispatch(login(resObject.user))
  //         navigate("/")
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);

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
        <Route exact path="/ingresar" element={<Login/>}/>
        <Route exact path="/registro" element={<Registro/>}/>
        <Route exact path="/preguntas-frecuentes" element={<FAQs/>}/>
        <Route exact path="/perfil" element={<UserDashboard/>}/>
        <Route exact path="/misReseñas" element={<MyReviews/>}/>
        <Route exact path="/editarReseña" element={<FormEditReviews/>}/>
        <Route exact path="/admindashboard" element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App


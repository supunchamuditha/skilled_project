
import './App.css'
import Navbar1 from './Components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import JobDetail from './Components/JobDetail';
import JobApplication from './Components/JobApplication';
import Register from './Components/Register';
import RegisterRec from './Components/RegisterRec';
import VerifyAccount from './Components/VerifyAccount';
import Login from './Components/Login';
import PostJob from './Components/PostJob';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './Components/JobList';
import UserProfile from './Components/UserProfile';
import NavbarLogged from './Components/NavbarLogged';
import Footer from './Components/Footer';
import Home from './Pages/HomePage';
import RecruiterLogin from './Components/RecruiterLogin';


function App() {
  return (
    <Router>
      <Navbar1 />
      <NavbarLogged />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/jobAdPage" element={<JobDetail />} />
        <Route path="/applyPage" element={<JobApplication />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerRec" element={<RegisterRec />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/loginRec" element={<RecruiterLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyAccount />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


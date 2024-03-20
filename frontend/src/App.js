import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./components/Signup";
import Dashboard from "./components/AdminDashboard";
import ChooseLogin from "./components/Logins/ChooseLogin";
import PatientHome from "./components/PatientHome";
import AdminDashboard from "./components/AdminDashboard";
import PatientLogin from "./components/Logins/PatientLogin";
import DoctorLogin from "./components/Logins/DoctorLogin";
import AdminLogin from "./components/Logins/AdminLogin";
import DoctorDashboard from "./components/DoctorDashboard";
import MakeAppointment from "./components/MakeAppointment";
import ViewChannel from "./components/ViewChannel";

import AddChannel from "./components/AddChannel";
import SearchChannels from "./components/SearchChannels";
import PatientAppointments from "./components/PatientAppointments";
import LaboratoryDashboard from "./components/LaboratoryDashboard";
import AddPatientReport from "./components/AddPatientReport";
import EditPatientProfile from "./components/EditPatientProfile";
import PatientProfile from "./components/PatientProfile";
import EditChannel from "./components/EditChannel";
import StaffDashboard from "./components/StaffDashboard";
import AddDoctor from "./components/AddDoctor";
import EditAppointment from "./components/EditAppointment";
import EditStaff from "./components/EditStaff";
import DoctorProfile from "./components/DoctorProfile";
import StaffProfile from "./components/StaffProfile";
import EditReport from "./components/EditReport";
import MyRecords from "./components/MyRecords";
import EditRecord from "./components/EditRecord";
import EditPatientDetails from "./components/EditPatientDetails";
import AddPatientDetails from "./components/AddPatientDetails";
import InventoryDashboard from "./components/InventoryDashboard";
//edit
import Orderdashboard from "./components/Orderdashboard";
//import SendOrder
//import PharmacyDashboard from "./components/PharmacyDashboard";
//import AddNewPharmacyItems from "./components/AddNewPharmacyItems";
import PharmacyDashboard from "./components/PharmacyDashboard";
import PharAddDashboard from "./components/PharAddDashboard";
import PharStockDashboard from "./components/PharStockDashboard";
import PharItemDashboard from "./components/PharItemDashboard";
import PharPrescriptionDashboard from "./components/PharPrescriptionDashboard";
import AddPharmacyItems from "./components/AddPharmacyItems";
import PharmacyStock from "./components/PharmacyStock";
import PharItemDetails from "./components/PharItemDetails";
import PharItemUpdate from "./components/PharItemUpdate";
//import CartPage from "./components/CartPage";
import PharPrescription from "./components/PharPrescription";
//import AddNewPharmacyItems from "./components/AddNewPharmacyItems";
import PharHomePage from "./components/PharHomePage";
import PharUpdateDashboard from "./components/PharUpdateDashboard";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/patientLogin" element={<PatientLogin />} />
          <Route path="/doctorLogin" element={<DoctorLogin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* Patient */}
          <Route path="/patientHome" element={<PatientHome />} />
          <Route path="/records" element={<MyRecords />} />
          <Route path="/editRecord/:id" element={<EditRecord />} />
          <Route path="/editPatientProfile" element={<EditPatientProfile />} />
          <Route path="/patientProfile" element={<PatientProfile />} />
          <Route path="/myAppointments" element={<PatientAppointments />} />
          <Route path="/editApt/:aid/:cid" element={<EditAppointment />} />
          <Route path="/makeApt/:cid" element={<MakeAppointment />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ChooseLogin />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />
          <Route path="/doctorProfile" element={<DoctorProfile />} />
          

          <Route path="/viewChannel/:cid" element={<ViewChannel />} />
          <Route path="/addChannel" element={<AddChannel />} />
          <Route path="/editChannel/:cid" element={<EditChannel />} />
          <Route path="/searchChannels/:date?/:doctor?" element={<SearchChannels />} />

          <Route path="/laboratory" element={<LaboratoryDashboard />} />
          <Route path="/addReport/:tid/:pid" element={<AddPatientReport />} />
          <Route path="/editReport/:tid/:pid" element={<EditReport />} />
          
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/doctor" element={<AddDoctor />} />
          <Route path="/editStaff/:sid" element={<EditStaff />} />
          <Route path="/staffProfile" element={<StaffProfile />} />
          <Route path="/addPatientDetails/id" element={<AddPatientDetails />} />
          <Route path="/editPatientDetails/:id" component={EditPatientDetails} />
          <Route path="/inventory" element={<InventoryDashboard/>}/>
{/* edit          */}
          
      
          {/* <Route path="/order" element={<Orderdashboard/>}/> */}

          {/* <Route path="/pharmacy" element={<PharmacyDashboard/>}/>
          <Route path="/addItems" element={<AddNewPharmacyItems/>}/> */}
          <Route path="/order" element={<Orderdashboard/>}/>
          <Route path="/pharmacy" element={<PharmacyDashboard/>}/>
          <Route path="/pharmacyAdd" element={<PharAddDashboard/>}/>
          <Route path="/pharmacyStock" element={<PharStockDashboard/>}/>
          <Route path="/prescription" element={<PharPrescriptionDashboard/>}/>
          <Route path="/item/:referenceNo" element={<PharItemDashboard/>}/>
          <Route path="/update/:referenceNo" element={<PharUpdateDashboard/>}/> 

          <Route path="/addItems" element={<AddPharmacyItems/>}/>
          <Route path="/addItem" element={<AddPharmacyItems/>}/>
          <Route path="/stock" element={<PharmacyStock/>}/>
          <Route path="/item/:referenceNo"  element={<PharItemDetails/>} />
          <Route path="/update/:referenceNo" element={<PharItemUpdate/>} />
          <Route path="/search/:searchQuery" element={<PharmacyStock/>}/>
         
          <Route path='/patientPrescriptions/:Id' element={<PharPrescription/>}/>
          <Route path='/phome' element={<PharHomePage/>}/>



        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import Layout from './components/Layout';
import PsychologistDashboard from './components/psychologist/Dashboard';
import PatientProfile from './components/psychologist/PatientProfile';
import PsychologistAgenda from './components/psychologist/Agenda';
import CreatePatientProfile from './components/psychologist/CreatePatientProfile';
import RealTimeMonitoring from './components/psychologist/RealTimeMonitoring';
import PatientHomeScreen from './components/patient/HomeScreen';
import PatientMoodTracker from './components/patient/MoodTracker';
import MicroEvaluation from './components/patient/MicroEvaluation';
import Achievements from './components/patient/Achievements';
import Notifications from './components/shared/Notifications';

export type UserType = 'psychologist' | 'patient';

function App() {
  const [userType, setUserType] = useState<UserType>('psychologist');

  return (
    <Router>
      <Layout userType={userType} setUserType={setUserType}>
        <Routes>
          {/* Psychologist Routes */}
          <Route path="/psychologist/dashboard" element={<PsychologistDashboard />} />
          <Route path="/psychologist/patient/:id" element={<PatientProfile />} />
          <Route path="/psychologist/agenda" element={<PsychologistAgenda />} />
          <Route path="/psychologist/create-patient" element={<CreatePatientProfile />} />
          <Route path="/psychologist/monitoring" element={<RealTimeMonitoring />} />
          
          {/* Patient Routes */}
          <Route path="/patient/home" element={<PatientHomeScreen />} />
          <Route path="/patient/mood-tracker" element={<PatientMoodTracker />} />
          <Route path="/patient/evaluation" element={<MicroEvaluation />} />
          <Route path="/patient/achievements" element={<Achievements />} />
          
          {/* Shared Routes */}
          <Route path="/notifications" element={<Notifications userType={userType} />} />
          
          {/* Default Redirects */}
          <Route 
            path="/" 
            element={
              <Navigate to={userType === 'psychologist' ? '/psychologist/dashboard' : '/patient/home'} />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
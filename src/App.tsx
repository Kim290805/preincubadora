import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';

// Auth
import UnifiedLogin from './components/auth/UnifiedLogin';

// Psychologist
import PsychologistDashboard from './components/psychologist/Dashboard';
import PatientProfile from './components/psychologist/PatientProfile';
import PsychologistAgenda from './components/psychologist/Agenda';
import CreatePatientProfile from './components/psychologist/CreatePatientProfile';
import RealTimeMonitoring from './components/psychologist/RealTimeMonitoring';
import PsychologistOnboarding from './components/psychologist/PsychologistOnboarding';
import PsychologistSettings from './components/psychologist/PsychologistSettings';
import Layout from './components/Layout';

// Patient Onboarding
import PatientTutorial from './components/patient/tutorial/PatientTutorial';
import SetupProfile from './components/patient/tutorial/SetupProfile';
import BaselineAssessment from './components/patient/tutorial/BaselineAssessment';
import AssessmentQuestions from './components/patient/tutorial/AssessmentQuestions';
import OptionalNote from './components/patient/tutorial/OptionalNote';

// Patient Main
import PatientHomeNew from './components/patient/PatientHomeNew';
import PatientTasks from './components/patient/PatientTasks';
import TaskDetail from './components/patient/TaskDetail';
import PatientCalendar from './components/patient/PatientCalendar';
import EmotionalState from './components/patient/EmotionalState';
import IntelligentAnalysis from './components/patient/IntelligentAnalysis';
import DailyCheckIn from './components/patient/DailyCheckIn';
import EmotionalJournal from './components/patient/EmotionalJournal';
import FormalEvaluation from './components/patient/FormalEvaluation';
import EvaluationComplete from './components/patient/EvaluationComplete';
import PatientMoodTracker from './components/patient/MoodTracker';
import Achievements from './components/patient/Achievements';
import PatientProfileView from './components/patient/PatientProfileView';
import PatientSettings from './components/patient/PatientSettings';

// Shared
import Notifications from './components/shared/Notifications';

export type UserType = 'psychologist' | 'patient';

function App() {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedPsychOnboarding, setHasCompletedPsychOnboarding] = useState(false);

  const handleLogin = (type: UserType, isFirstTime: boolean) => {
    setUserType(type);
    setIsAuthenticated(true);
    if (type === 'psychologist') {
      setHasCompletedPsychOnboarding(!isFirstTime);
    }
  };

  const handleLogout = () => {
    // Clear any session data
    localStorage.removeItem('currentUsername');
    setIsAuthenticated(false);
    setUserType(null);
    setHasCompletedPsychOnboarding(false);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <UnifiedLogin onLoginSuccess={handleLogin} />
      ) : userType === 'psychologist' ? (
        <>
          {!hasCompletedPsychOnboarding ? (
            <PsychologistOnboarding onComplete={() => setHasCompletedPsychOnboarding(true)} />
          ) : (
            <Layout userType={userType} setUserType={setUserType}>
              <Routes>
                <Route path="/psychologist/dashboard" element={<PsychologistDashboard />} />
                <Route path="/psychologist/patient/:id" element={<PatientProfile />} />
                <Route path="/psychologist/agenda" element={<PsychologistAgenda />} />
                <Route path="/psychologist/create-patient" element={<CreatePatientProfile />} />
                <Route path="/psychologist/monitoring" element={<RealTimeMonitoring />} />
                <Route path="/psychologist/settings" element={<PsychologistSettings onLogout={handleLogout} />} />
                <Route path="/notifications" element={<Notifications userType={userType} />} />
                <Route path="/" element={<Navigate to="/psychologist/dashboard" />} />
                <Route path="*" element={<Navigate to="/psychologist/dashboard" />} />
              </Routes>
            </Layout>
          )}
        </>
      ) : (
        <Routes>
          {/* Onboarding Flow */}
          <Route path="/patient/tutorial" element={<PatientTutorial />} />
          <Route path="/patient/setup-profile" element={<SetupProfile />} />
          <Route path="/patient/baseline-assessment" element={<BaselineAssessment />} />
          <Route path="/patient/assessment/:type" element={<AssessmentQuestions />} />
          <Route path="/patient/optional-note" element={<OptionalNote />} />
          
          {/* Main App */}
          <Route path="/patient/home-new" element={<PatientHomeNew />} />
          <Route path="/patient/tasks" element={<PatientTasks />} />
          <Route path="/patient/task-detail/:id" element={<TaskDetail />} />
          <Route path="/patient/calendar" element={<PatientCalendar />} />
          <Route path="/patient/emotional-state" element={<EmotionalState />} />
          <Route path="/patient/intelligent-analysis" element={<IntelligentAnalysis />} />
          <Route path="/patient/check-in" element={<DailyCheckIn />} />
          <Route path="/patient/journal" element={<EmotionalJournal />} />
          <Route path="/patient/formal-evaluation" element={<FormalEvaluation />} />
          <Route path="/patient/evaluation-complete" element={<EvaluationComplete />} />
          <Route path="/patient/mood-tracker" element={<PatientMoodTracker />} />
          <Route path="/patient/achievements" element={<Achievements />} />
          <Route path="/patient/profile" element={<PatientProfileView />} />
          <Route path="/patient/settings" element={<PatientSettings onLogout={handleLogout} />} />
          
          {/* Default */}
          <Route path="/" element={<Navigate to="/patient/tutorial" />} />
          <Route path="*" element={<Navigate to="/patient/home-new" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
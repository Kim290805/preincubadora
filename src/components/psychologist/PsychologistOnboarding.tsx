import { useState } from 'react';
import ProfessionalRegistration from './ProfessionalRegistration';
import PsychologistTutorial from './PsychologistTutorial';
import EmptyDashboard from './EmptyDashboard';
import CreatePatientForm from './CreatePatientForm';
import CredentialsConfirmation from './CredentialsConfirmation';

interface PsychologistOnboardingProps {
  onComplete: () => void;
}

type OnboardingStep = 
  | 'registration' 
  | 'tutorial' 
  | 'empty-dashboard' 
  | 'create-patient' 
  | 'credentials';

export default function PsychologistOnboarding({ onComplete }: PsychologistOnboardingProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('registration');
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);

  const handleRegistrationComplete = () => {
    setCurrentStep('tutorial');
  };

  const handleTutorialComplete = () => {
    setCurrentStep('empty-dashboard');
  };

  const handleAddPatient = () => {
    setCurrentStep('create-patient');
  };

  const handlePatientCreated = (newCredentials: { username: string; password: string }) => {
    setCredentials(newCredentials);
    setCurrentStep('credentials');
  };

  const handleCredentialsComplete = () => {
    onComplete();
  };

  const handleBackToDashboard = () => {
    setCurrentStep('empty-dashboard');
  };

  switch (currentStep) {
    case 'registration':
      return <ProfessionalRegistration onComplete={handleRegistrationComplete} />;
    
    case 'tutorial':
      return <PsychologistTutorial onComplete={handleTutorialComplete} />;
    
    case 'empty-dashboard':
      return <EmptyDashboard onAddPatient={handleAddPatient} />;
    
    case 'create-patient':
      return <CreatePatientForm onComplete={handlePatientCreated} onBack={handleBackToDashboard} />;
    
    case 'credentials':
      return credentials ? (
        <CredentialsConfirmation 
          credentials={credentials} 
          onComplete={handleCredentialsComplete} 
        />
      ) : null;
    
    default:
      return null;
  }
}

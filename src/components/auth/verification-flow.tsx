import { useState } from 'react'
import { OTPVerificationStep } from './steps/otp-verification-step'
import { PasswordSetupStep } from './steps/password-setup-step'
import { SuccessStep } from './steps/success-step'

type VerificationStep = 'otp' | 'password' | 'success';

interface VerificationFlowProps {
  email?: string;
  initialStep?: VerificationStep;
}

export function VerificationFlow({ email = '', initialStep }: VerificationFlowProps) {
  const [currentStep, setCurrentStep] = useState<VerificationStep>(initialStep || 'otp');
  const [verifiedEmail, setVerifiedEmail] = useState(email);

  const handleOTPSuccess = (verifiedEmailFromOTP: string) => {
    setVerifiedEmail(verifiedEmailFromOTP);
    setCurrentStep('password');
  };

  const handlePasswordSuccess = () => {
    setCurrentStep('success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/20">
      {currentStep === 'otp' && (
        <OTPVerificationStep email={verifiedEmail} onSuccess={handleOTPSuccess} />
      )}
      {currentStep === 'password' && (
        <PasswordSetupStep email={verifiedEmail} onSuccess={handlePasswordSuccess} />
      )}
      {currentStep === 'success' && <SuccessStep email={verifiedEmail} />}
    </div>
  );
}

import { Suspense } from 'react';
import VerifyEmailPage from '../../components/auth/VerifyEmailPage';

export default function Page() {
  return (
    <Suspense>
      <VerifyEmailPage />
    </Suspense>
  );
}
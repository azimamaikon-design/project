import type { ReactNode } from 'react';
import { EmailVerificationRequired } from './EmailVerificationRequired';
import { useLanguage } from '../lib/language';
import { useVerifiedUser } from '../lib/useVerifiedUser';

export function VerifiedRoute({ children }: { children:ReactNode }) {
  const { language } = useLanguage();
  const user = useVerifiedUser();
  if (user.loading) return <main className="route-loading">Echo…</main>;
  if (user.signedIn && !user.verified) return <EmailVerificationRequired language={language} email={user.email} />;
  return children;
}

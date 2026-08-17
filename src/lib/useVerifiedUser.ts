import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from './supabase';

export function useVerifiedUser() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    const applyUser = (user: Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user']) => {
      setSignedIn(Boolean(user));
      setVerified(Boolean(user?.email_confirmed_at));
      setEmail(user?.email);
      setLoading(false);
    };
    void supabase.auth.getUser().then(({ data }) => applyUser(data.user));
    const { data } = supabase.auth.onAuthStateChange(() => {
      void supabase.auth.getUser().then(({ data:userData }) => applyUser(userData.user));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return { loading, signedIn, verified, email };
}

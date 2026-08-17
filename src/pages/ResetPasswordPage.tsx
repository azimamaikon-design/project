import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { SiteHeader } from '../components/SiteHeader';
import { useLanguage } from '../lib/language';
import { supabase } from '../lib/supabase';

export function ResetPasswordPage() {
  const { language, toggleLanguage } = useLanguage();
  const [, navigate] = useLocation();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const isRu = language === 'RU';

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (event:FormEvent) => {
    event.preventDefault(); setMessage('');
    if (password !== confirmation) {
      setMessage(isRu ? 'Пароли не совпадают.' : 'Құпиясөздер сәйкес емес.'); return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    setMessage(isRu ? 'Пароль изменён. Теперь можно продолжить обучение.' : 'Құпиясөз өзгертілді. Енді оқуды жалғастыра аласың.');
    window.setTimeout(() => navigate('/course'), 1200);
  };

  return <div className="page-shell"><SiteHeader language={language} onLanguageChange={toggleLanguage} /><main className="reset-page"><section className="auth-card"><span className="eyebrow">ECHO’S SCHOOL</span><h1>{isRu ? 'Новый пароль' : 'Жаңа құпиясөз'}</h1>{ready ? <form className="auth-form" onSubmit={submit}><label>{isRu ? 'Новый пароль' : 'Жаңа құпиясөз'}<input autoComplete="new-password" minLength={8} onChange={(event) => setPassword(event.target.value)} required type="password" value={password} /></label><label>{isRu ? 'Повтори пароль' : 'Құпиясөзді қайтала'}<input autoComplete="new-password" minLength={8} onChange={(event) => setConfirmation(event.target.value)} required type="password" value={confirmation} /></label><button className="primary-button auth-submit" disabled={busy} type="submit">{busy ? '…' : (isRu ? 'Сохранить пароль' : 'Құпиясөзді сақтау')} →</button></form> : <div className="reset-invalid"><p>{isRu ? 'Ссылка недействительна или устарела. Запроси новое письмо.' : 'Сілтеме жарамсыз немесе ескірген. Жаңа хат сұрат.'}</p><Link className="text-button" href="/auth">{isRu ? 'Вернуться ко входу' : 'Кіру бетіне оралу'}</Link></div>}{message && <p className="auth-message" role="status">{message}</p>}</section></main></div>;
}

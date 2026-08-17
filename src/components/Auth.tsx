import { useState, type FormEvent } from 'react';
import { useLocation } from 'wouter';
import type { Language } from '../lib/language';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { SupabaseSetupMessage } from './SupabaseSetupMessage';

type Props = { language:Language };

export function Auth({ language }: Props) {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const isRu = language === 'RU';

  if (!isSupabaseConfigured) return <SupabaseSetupMessage />;

  const submit = async (event:FormEvent) => {
    event.preventDefault(); setMessage('');
    if (mode === 'signup' && password !== confirmation) {
      setMessage(isRu ? 'Пароли не совпадают.' : 'Құпиясөздер сәйкес емес.'); return;
    }
    setBusy(true);
    const result = mode === 'signup'
      ? await supabase.auth.signUp({ email, password, options:{
          emailRedirectTo:`${window.location.origin}/course`,
          data:{ full_name:name.trim(), interface_language:language },
        } })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);

    if (result.error) {
      setMessage(result.error.message); return;
    }
    if (mode === 'signup' && !result.data.session) {
      setMessage(isRu ? 'Аккаунт создан! Открой письмо и подтверди почту.' : 'Аккаунт ашылды! Хатты ашып, поштаңды раста.');
      return;
    }
    navigate('/course');
  };

  const resetPassword = async () => {
    setMessage('');
    if (!email.trim()) {
      setMessage(isRu ? 'Сначала введи email в поле выше.' : 'Алдымен жоғарыдағы өріске email енгіз.');
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo:`${window.location.origin}/reset-password`,
    });
    setBusy(false);
    setMessage(error
      ? error.message
      : isRu ? 'Письмо отправлено. Проверь входящие и папку «Спам».' : 'Хат жіберілді. Кіріс хаттар мен «Спам» бумасын тексер.');
  };

  const continueWithGoogle = async () => {
    setMessage(''); setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{ redirectTo:`${window.location.origin}/course` },
    });
    if (error) {
      setBusy(false);
      setMessage(isRu ? 'Не удалось открыть вход через Google. Проверь настройку Google Provider.' : 'Google арқылы кіру ашылмады. Google Provider баптауын тексер.');
    }
  };

  return (
    <section className="auth-card">
      <div className="auth-tabs">
        <button className={mode === 'signup' ? 'auth-tab auth-tab--active' : 'auth-tab'} onClick={() => { setMode('signup'); setMessage(''); }} type="button">{isRu ? 'Регистрация' : 'Тіркелу'}</button>
        <button className={mode === 'signin' ? 'auth-tab auth-tab--active' : 'auth-tab'} onClick={() => { setMode('signin'); setMessage(''); }} type="button">{isRu ? 'Вход' : 'Кіру'}</button>
      </div>
      <button className="google-auth-button" disabled={busy} onClick={() => void continueWithGoogle()} type="button"><span>G</span>{isRu ? 'Продолжить через Google' : 'Google арқылы жалғастыру'}</button>
      <div className="auth-divider"><span>{isRu ? 'или через email' : 'немесе email арқылы'}</span></div>
      <form className="auth-form" onSubmit={submit}>
        {mode === 'signup' && <label>{isRu ? 'Имя' : 'Атың'}<input autoComplete="name" minLength={2} onChange={(event) => setName(event.target.value)} placeholder={isRu ? 'Как тебя зовут?' : 'Атың кім?'} required value={name} /></label>}
        <label>Email<input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="student@example.com" required type="email" value={email} /></label>
        <label>{isRu ? 'Пароль' : 'Құпиясөз'}<input autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={8} onChange={(event) => setPassword(event.target.value)} placeholder={isRu ? 'Минимум 8 символов' : 'Кемінде 8 таңба'} required type="password" value={password} /></label>
        {mode === 'signin' && <button className="forgot-button" disabled={busy} onClick={resetPassword} type="button">{isRu ? 'Забыли пароль?' : 'Құпиясөзді ұмыттың ба?'}</button>}
        {mode === 'signup' && <label>{isRu ? 'Повтори пароль' : 'Құпиясөзді қайтала'}<input autoComplete="new-password" minLength={8} onChange={(event) => setConfirmation(event.target.value)} required type="password" value={confirmation} /></label>}
        <button className="primary-button auth-submit" disabled={busy} type="submit">{busy ? '…' : mode === 'signup' ? (isRu ? 'Создать аккаунт' : 'Аккаунт ашу') : (isRu ? 'Войти' : 'Кіру')} →</button>
      </form>
      {message && <p className="auth-message" role="status">{message}</p>}
      <p className="auth-note">{isRu ? 'Регистрируясь, ты сможешь сохранять прогресс и результаты.' : 'Тіркелгеннен кейін прогресс пен нәтижелерді сақтай аласың.'}</p>
    </section>
  );
}

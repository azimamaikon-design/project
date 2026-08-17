import { useState } from 'react';
import { Link } from 'wouter';
import type { Language } from '../lib/language';
import { supabase } from '../lib/supabase';

type Props = { language:Language; email?:string };

export function EmailVerificationRequired({ language, email }: Props) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const isRu = language === 'RU';

  const resend = async () => {
    if (!email) return;
    setBusy(true); setMessage('');
    const { error } = await supabase.auth.resend({
      type:'signup', email,
      options:{ emailRedirectTo:`${window.location.origin}/course` },
    });
    setBusy(false);
    setMessage(error ? error.message : (isRu ? 'Новое письмо отправлено.' : 'Жаңа хат жіберілді.'));
  };

  return <main className="verification-page"><section className="verification-card"><span className="verification-icon">✉</span><span className="eyebrow">{isRu ? 'ПОДТВЕРЖДЕНИЕ ПОЧТЫ' : 'ПОШТАНЫ РАСТАУ'}</span><h1>{isRu ? 'Проверь свою почту' : 'Поштаңды тексер'}</h1><p>{isRu ? `Мы отправили безопасную ссылку на ${email ?? 'твой email'}. Нажми её, чтобы подтвердить аккаунт.` : `${email ?? 'Email'} мекенжайына қауіпсіз сілтеме жібердік. Аккаунтты растау үшін оны бас.`}</p><div className="security-note"><strong>{isRu ? 'Важно:' : 'Маңызды:'}</strong> {isRu ? 'Echo’s School никогда не просит пароль от твоей электронной почты.' : 'Echo’s School электрондық поштаңның құпиясөзін ешқашан сұрамайды.'}</div><button className="primary-button" disabled={busy || !email} onClick={resend} type="button">{busy ? '…' : (isRu ? 'Отправить письмо ещё раз' : 'Хатты қайта жіберу')}</button><Link className="text-button" href="/auth">{isRu ? 'Вернуться ко входу' : 'Кіру бетіне оралу'}</Link>{message && <p className="auth-message">{message}</p>}</section></main>;
}

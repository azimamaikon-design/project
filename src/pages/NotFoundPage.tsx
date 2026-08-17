import { Link } from 'wouter';

export function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="eyebrow">ОШИБКА 404</span>
      <h1>Echo не нашёл эту страницу</h1>
      <Link className="primary-button" href="/">Вернуться на главную</Link>
    </main>
  );
}

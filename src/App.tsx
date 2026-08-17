import { Route, Switch } from 'wouter';
import { AuthPage } from './pages/AuthPage';
import { CoursePage } from './pages/CoursePage';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { LevelPage } from './pages/LevelPage';
import { LevelTestPage } from './pages/LevelTestPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ResultsPage } from './pages/ResultsPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { VerifiedRoute } from './components/VerifiedRoute';
import { AssistantPage } from './pages/AssistantPage';
import { EchoWidget } from './components/EchoWidget';
import { MobileNavigation } from './components/MobileNavigation';

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
        <Route path="/results" component={ResultsPage} />
        <Route path="/assistant"><VerifiedRoute><AssistantPage /></VerifiedRoute></Route>
        <Route path="/course"><VerifiedRoute><CoursePage /></VerifiedRoute></Route>
        <Route path="/course/:level/lesson/:number"><VerifiedRoute><LessonPage /></VerifiedRoute></Route>
        <Route path="/course/:level/test"><VerifiedRoute><LevelTestPage /></VerifiedRoute></Route>
        <Route path="/course/:level"><VerifiedRoute><LevelPage /></VerifiedRoute></Route>
        <Route component={NotFoundPage} />
      </Switch>
      <EchoWidget />
      <MobileNavigation />
    </>
  );
}

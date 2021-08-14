import { Container } from 'react-bootstrap';
import { SignUp } from './components/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { PrivateRoute } from './components/PrivateRoute'
import { ForgotPassword } from './components/ForgotPassword';

function App() {
  return (

    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "600px" }}>

        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
              <Route path="/signup" component={SignUp}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/forgot-password" component={ForgotPassword}></Route>
            </Switch>
          </AuthProvider>
        </Router>

      </div>
    </Container>
  );
}

export default App;

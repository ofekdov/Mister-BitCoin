import { Route, HashRouter as Router, Routes, Switch } from 'react-router-dom';
import './assets/scss/global.scss'
import {HomePage} from './views/HomePage'
import {ContactPage} from './views/ContactPage'
import {AppHeader} from './cmps/AppHeader'
import AppFooter from './cmps/AppFooter'
import { ContactDetails}  from './views/ContactDetails';
import {ContactEdit} from './views/ContactEdit';
import StatisticPage from './views/StatisticPage';
import {SignupPage} from './views/SignupPage';

function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <main className="container">
          <Routes>
            <Route path="/contact/edit/:id?" element={<ContactEdit/>} />
            <Route path="/contact/:id" element={<ContactDetails/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/statistic" element={<StatisticPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  )
}

export default App

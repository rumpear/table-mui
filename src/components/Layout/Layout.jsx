import { Outlet } from 'react-router-dom';
import { Section } from '../ui/';
import { Navigation } from '../';

const Layout = () => (
  <Section>
    <Navigation />
    <Outlet />
  </Section>
);

export default Layout;

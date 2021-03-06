import Dashboard from "./../components/Dashboard/Dashboard";

import { auth } from "./../utils/auth";

const DashboardPage = props => {
  return <Dashboard {...props} />;
};

DashboardPage.getInitialProps = async ctx => {
  const token = await auth(ctx);
  return { token };
};

export default DashboardPage;

import { authContext } from "contexts/AuthContext";
import React, { Fragment, FunctionComponent, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { paths } from "router/paths";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nunito Sans";
  color: #dd2020;
  svg {
    font-size: 3rem;
    margin: 1rem 0rem 1rem 1rem;
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1rem;
  p {
    color: #203e55;
    margin-bottom: 0;
    font-weight: bold;
  }
`;

const PrimaryButton = styled(({ navigate, ...props }) => <ButtonBase {...props} />)`
  background-color: #dd2020 !important;
  color: white !important;
  padding: 0.25rem !important;
  border-radius: 1rem !important;
  transition: 100ms all linear !important;
  margin-top: 0.5rem !important;
  &:hover {
    filter: brightness(140%);
    color: white !important;
  }
`;

const SecondaryButton = styled(({ navigate, ...props }) => <ButtonBase {...props} />)`
  color: #dd2020 !important;
  padding: 0.25rem !important;
  border-radius: 1rem !important;
  transition: 100ms all linear !important;
  background: rgba(221, 32, 32, 0.08) !important;
  margin-top: 0.5rem !important;
  &:hover {
    background: rgba(221, 32, 32, 0.15) !important;
    color: #dd2020 !important;
  }
`;

const UserControl: FunctionComponent = () => {
  const { isAuthenticated, logout } = useContext(authContext);

  const LoginLogout = useMemo(
    () =>
      isAuthenticated ? (
        <Fragment>
          <PrimaryButton>Profile</PrimaryButton>
          <SecondaryButton onClick={logout}>Logout</SecondaryButton>
        </Fragment>
      ) : (
        <Fragment>
          <Link to={paths.LOGIN} component={PrimaryButton}>
            Login
          </Link>
          <Link to={paths.REGISTER} component={SecondaryButton}>
            Register
          </Link>
        </Fragment>
      ),
    [isAuthenticated, logout]
  );

  return (
    <Header>
      <AccountCircleIcon />
      <Control>
        <p>Welcome, trainer</p>
        {LoginLogout}
      </Control>
    </Header>
  );
};

export default UserControl;

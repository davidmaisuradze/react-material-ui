import React from "react";
import PropTypes from "prop-types";
import { Auth } from "./components/Auth";
import { connect } from "react-redux";
import { logoutHandler } from "../../Auth/Signin/actions";

const LayoutContainer = props => {
  return props.isAuth ? (
      <>
        {props.children}
      </>
  ) : (
    <Auth>{props.children}</Auth>
  );
};

LayoutContainer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string
  }),
  logoutHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.auth.signin.isAuth,
  user: state.auth.signin.user
});

export const Layout = connect(
  mapStateToProps,
  { logoutHandler }
)(LayoutContainer);

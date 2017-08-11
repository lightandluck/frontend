/* globals window */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { debounce } from 'lodash';
import { hideMenu, resetMessage, resetErrorMessage, showModal, hideModal } from '../actions/app';
import { layoutResize } from '../actions/layout';
import { loadSessionUser } from '../actions/session';

import { selectSessionUser } from '../selectors/session';

import Navbar from '../components/Navbar';
// import CommandBar from '../containers/CommandBar';
import MainMenu from '../components/MainMenu';
import BetaSignup from './BetaSignup';

const BETA_SIGNUP_MODAL = 'BETA_SIGNUP_MODAL';

class App extends Component {
  constructor(props) {
    super(props);

    [
      "handleChange",
      "handleDismissClick",
      "handleDismissMessage",
      "handleHideMenu",
      "handleMenuToggle",
      "handleGimmieInvite",
      "handleHideModal",
      "modal",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    // this.props.loadSessionUser()

    this._oldResize = window.onresize;
    // debounce device resizing to not be a jerk on resize
    window.onresize = debounce(() => {
      this.props.layoutResize(window.innerWidth, window.innerHeight);
    }, 250);

    // initial call to make things not crazy
    this.props.layoutResize(window.innerWidth, window.innerHeight);
  }

  componentWillUnmount() {
    window.onresize = this._oldResize;
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`);
  }
  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleDismissMessage(e) {
    this.props.resetMessage();
    e.preventDefault();
  }

  handleMenuToggle(e) {
    e.stopPropagation();
    this.props.toggleMenu();
  }
  handleHideMenu() {
    if (this.props.showMenu) {
      this.props.hideMenu();
    }
  }

  handleGimmieInvite() {
    this.props.hideMenu();
    this.props.showModal(BETA_SIGNUP_MODAL, this);
  }
  handleHideModal() {
    this.props.hideModal();
  }


  /* app implements the modal pattern as well as using it */
  modal(name, data = {}) {
    switch (name) {
      case BETA_SIGNUP_MODAL:
        return (<BetaSignup onSaved={this.handleHideModal} onCancelled={this.handleHideModal} data={data} />);
      default:
        return undefined;

    }
  }

  /**
   * presenting modals is easy! fun even! yay! import showModal from actions/app, and call it with ("name", [element that will present modal], [data object])
   * it's expected that the element that presents the modal will have a method "modal", that will return either a react element or undefined
   * Whatever it gives back will be presented
   */
  renderModal() {
    if (this.props.modal) {
      return (
        <div id="modal-wrap">
          <div className="modal dialog" tabIndex="-1" role="dialog">
            {this.props.modal.element ? this.props.modal.element.modal(this.props.modal.name, this.props.modal.data) : undefined}
          </div>
        </div>
      );
    }
    return undefined;
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <div className="alert container red">
        <div className="row">
          <div className="col-md-12">
            <p className="message">{errorMessage}</p>
            <a className="dismiss" onClick={this.handleDismissClick}>Dismiss</a>
          </div>
        </div>
      </div>
    );
  }

  renderMessage() {
    const { message } = this.props;
    if (!message) {
      return null;
    }

    return (
      <div className="alert alert-success" role="alert">
        <b>{message}</b>
        {' '}
        (<a onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </div>
    );
  }

  render() {
    const { children, user, showMenu, layout } = this.props;
    return (
      <div id="app" className="stage" onClick={this.handleHideMenu}>
        <Navbar
          user={user}
          style={Object.assign({
            position: "absolute",
          }, layout.navbar)}
          onToggleMenu={this.handleMenuToggle}
          onGimmieInvite={this.handleGimmieInvite}
        />
        {/* <CommandBar /> */}
        <MainMenu user={user} show={showMenu} onGimmieInvite={this.handleGimmieInvite} />
        {this.renderMessage()}
        <div
          className="main"
          style={Object.assign({
            position: "absolute",
            overflow: "auto",
          }, layout.main)}
        >
          {this.renderErrorMessage()}
          {children}
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  // inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node,
  user: PropTypes.object,

  resetErrorMessage: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  // loadSessionUser: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    message: state.message,
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1),
    user: selectSessionUser(state),
    showMenu: state.app.showMenu,
    layout: state.layout,

    modal: state.app.modal,
  };
}

export default connect(mapStateToProps, {
  resetMessage,
  resetErrorMessage,
  loadSessionUser,
  layoutResize,
  hideMenu,
  showModal,
  hideModal,
})(App);

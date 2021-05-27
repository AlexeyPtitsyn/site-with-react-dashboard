/**
 * @file Page editor component.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */
import React from 'react';
import Axios from 'axios';

import { NavLink } from 'react-router-dom';

import './PageEditorComponent.scss';

import PageListItem from './PageListItem.jsx';
import PagePropertiesEditor from './PagePropertiesEditor.jsx';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../store/actions.js';

import LoginComponent from './LoginComponent.jsx';

class PageEditorComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPageListLoading: false,
      isEditorLoading: false,
      pageId: null,
      pagesList: []
    }

    this.updatePageId = this.updatePageId.bind(this);
    this.getPagesList = this.getPagesList.bind(this);

    this.onDeletePage = this.onDeletePage.bind(this);
    this.onUpdatePage = this.onUpdatePage.bind(this);

    this.onLogin = this.onLogin.bind(this);

    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * Attempt to logout.
   */
  handleLogout() {
    Axios.post('backend/logout.php')
      .then((res) => {
        if(res.data.error) {
          console.error('Backend error:', res.data.message);

          this.props.logout();
          return;
        }

        this.props.logout();
      })
      .catch(error => {
        console.error('Backend connection error:', error.message);
      });
  }

  /**
   * Change page id state if it is specified by props.
   */
  updatePageId() {
    if(
        typeof this.props.match !== 'undefined' &&
        this.props.match.params &&
        this.props.match.params.id
      ) {
      const pageId = parseInt(this.props.match.params.id);
      if(!isNaN(pageId)) {
        if(this.state.pageId !== pageId) {
          this.setState({
            pageId: pageId
          });
        }
      }
      return;
    }

    if(this.state.pageId !== null) {
      this.setState({
        pageId: null
      });
    }
  }

  /**
   * Load page list and set `pagesList` state.
   */
  getPagesList() {
    this.setState({
      isPageListLoading: true
    }, () => {

      Axios.post('backend/pageslist.php')
        .then((res) => {
          if(res.data.error) {
            console.error('Backend error:', res.data.message);

            if(res.data.loginError) {
              this.props.logout();
            }

            return;
          }

          this.setState({
            pagesList: res.data.pages
          });
        })
        .catch(error => {
          console.error('Backend connection error:', error.message);
        })
        .finally(() => {
          this.setState({
            isPageListLoading: false
          });
        });
    });
  }

  /**
   * Update pages list after page deletion.
   * @param {*} id Deleted page ID.
   */
  onDeletePage(id) {
    this.props.history.push('/page');

    this.getPagesList();
  }

  /**
   * Change location hash after updating page. Useful when new page is created
   * (it aquires ID).
   * @param {*} id Updated page ID.
   */
  onUpdatePage(id) {
    if(id !== this.state.pageId) {
      this.props.history.push('/page/' + id);
    }

    this.getPagesList();
  }

  componentDidMount() {
    this.updatePageId();
    
    this.getPagesList();
  }

  componentDidUpdate() {
    document.title = 'Page editor';
    this.updatePageId();
  }

  /**
   * Update pages list and reset page editor after login.
   */
  onLogin() {
    this.getPagesList();

    // Reset page editor:
    const pageId = this.state.pageId;
    this.setState({
      pageId: null
    }, () => {
      this.setState({
        pageId: pageId
      });
    });
  }

  render() {
    const pages = this.state.pagesList;

    const pagesList = pages.map((item) => {
      return (
        <PageListItem key={item.id}
          id={item.id}
          name={item.title}
          href={item.url}
          isActive={item.id == this.state.pageId} />
      );
    });

    return (
      <div className="page-editor">

        {
          !this.props.isLoggedIn &&
          <LoginComponent onLogin={this.onLogin} />
        }

        {this.props.isLoggedIn &&
          <div className="page-editor__wrapper">
            <div className="page-editor__list-wrapper">
              <div className="page-editor__list">
                { this.state.isPageListLoading &&
                  <div className="loading"></div>
                }
                
                {pagesList}

                <div>
                  <NavLink
                    to="/page"
                    exact={true}
                    className="create-page"
                    >
                    New page
                  </NavLink>
                </div>
              </div>
              <div className="page-editor__logout-area">
                <button onClick={this.handleLogout}>Log out</button>
              </div>
            </div>
            <div className="page-editor__spacer" />
            <div className="page-editor__editor">
              <PagePropertiesEditor pageId={this.state.pageId}
                onDelete={this.onDeletePage}
                onUpdate={this.onUpdatePage} />
            </div>
          </div>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(Actions.logout, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageEditorComponent);

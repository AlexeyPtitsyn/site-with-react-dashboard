/**
 * @file Page properties editor nested component.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */
import React from 'react';

import Axios from 'axios';

import './PagePropertiesEditor.scss';

import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/theme-xcode";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../store/actions.js';

class PagePropertiesEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      page: {
        id: props.pageId,
        url: '',
        title: '',
        noIndex: false,
        noFollow: false,
        description: '',
        author: '',
        canonical: '',
        headStuff: '',
        content: '',
        lastModified: parseInt(Date.now() / 1000)
      }
    }

    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeCanonical = this.handleChangeCanonical.bind(this);
    this.handleChangeHeadStuff = this.handleChangeHeadStuff.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);

    this.handleChangeNoIndex = this.handleChangeNoIndex.bind(this);
    this.handleChangeNoFollow = this.handleChangeNoFollow.bind(this);

    this.updateLastModified = this.updateLastModified.bind(this);

    this.getPage = this.getPage.bind(this);

    this.handleDeletePage = this.handleDeletePage.bind(this);
    this.handleSavePage = this.handleSavePage.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Load page with AJAX request.
   * @param {*} newId Page id.
   */
  getPage(newId) {
    return new Promise((resolve, reject) => {
      if(newId == null) {
        this.setState({
          page: {
            id: null,
            url: '',
            title: '',
            noIndex: false,
            noFollow: false,
            description: '',
            author: '',
            canonical: '',
            headStuff: '',
            content: '',
            lastModified: parseInt(Date.now() / 1000)
          }
        }, () => {
          resolve();
        });
        return;
      }

      Axios.post(
        'backend/getpage.php',
        {
          id: newId
        }
      )
        .then((res) => {
          if(res.data.error) {
            console.error('Backend error:', res.data.message);

            if(res.data.loginError) {
              this.props.logout();
            }

            return;
          }

          this.setState({
            page: res.data.page
          }, resolve);
        })
        .catch(error => {
          console.error('Backend connection error:', error.message);
          resolve();
        });

    });
  }

  componentDidUpdate() {
    if(this.state.page.id !== this.props.pageId && !this.state.isLoading) {
      this.setState({
        isLoading: true
      }, () => {
        this.getPage(this.props.pageId)
          .then(() => {
            this.setState({
              isLoading: false
            });
        });
      });

    }
  }

  updateLastModified() {
    this.setState({
      page: {...this.state.page, lastModified: parseInt(Date.now() / 1000)}
    });
  }

  handleChangeTitle(e) {
    this.setState({
      page: {...this.state.page, title: e.target.value}
    }, this.updateLastModified);
  }

  handleChangeAuthor(e) {
    this.setState({
      page: {...this.state.page, author: e.target.value}
    }, this.updateLastModified);
  }

  handleChangeUrl(e) {
    this.setState({
      page: {...this.state.page, url: e.target.value}
    }, this.updateLastModified);
  }

  handleChangeCanonical(e) {
    this.setState({
      page: {...this.state.page, canonical: e.target.value}
    }, this.updateLastModified);
  }

  handleChangeHeadStuff(e) {
    this.setState({
      page: {...this.state.page, headStuff: e.target.value}
    }, this.updateLastModified);
  }

  handleChangeDescription(e) {
    this.setState({
      page: {...this.state.page, description: e.target.value}
    }, this.updateLastModified);
  }

  handleChangeContent(newValue) {
    this.setState({
      page: {...this.state.page, content: newValue}
    }, this.updateLastModified);
  }

  handleChangeNoIndex(e) {
    this.setState({
      page: {...this.state.page, noIndex: e.target.checked}
    }, this.updateLastModified);
  }

  handleChangeNoFollow(e) {
    this.setState({
      page: {...this.state.page, noFollow: e.target.checked}
    }, this.updateLastModified);
  }

  handleDeletePage() {
    if(!confirm('Really delete this page?')) {
      return;
    }

    this.setState({
      isLoading: true
    }, () => {
      Axios.post(
        'backend/deletepage.php',
        {
          id: this.state.page.id
        }
      )
        .then((res) => {
          if(res.data.error) {
            console.error('Backend error:', res.data.message);
            if(res.data.loginError) {
              this.props.logout();
            }
            return;
          }

          this.setState({
            isLoading: false
          }, () => {
            this.props.onDelete(this.state.page.id);
          });
        })
        .catch(error => {
          console.error('Backend connection error:', error.message);
        });
    });

  }

  handleSavePage() {
    this.setState({
      isLoading: true
    }, () => {
      Axios.post(
        'backend/savepage.php',
        {
          page: this.state.page
        }
      )
        .then((res) => {
          if(res.data.error) {
            console.error('Backend error:', res.data.message);
            if(res.data.loginError) {
              this.props.logout();
            }
            return;
          }

          this.setState({
            isLoading: false,
            page: res.data.page
          }, () => {
            this.props.onUpdate(res.data.page.id);
          })
        })
        .catch(error => {
          console.error('Backend connection error:', error.message);
        });
    });
  }

  /**
   * Save page by Ctrl-s.
   * @param {*} e Event.
   */
  handleKeyDown(e) {
    if(e.ctrlKey && (e.key == 's' || e.key == 'S')) {
      e.preventDefault();
      this.handleSavePage();
    }
  }

  render () {
    const page = this.state.page;

    function getReadableLastModified(lastModified) {
      const modifiedInt = lastModified * 1000;
      const date = new Date(modifiedInt);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if(month < 10) month = '0' + month;
      let day = date.getDay();
      if(day < 10) day = '0' + day;
      let hours = date.getHours();
      if(hours < 10) hours = '0' + hours;
      let minutes = date.getMinutes();
      if(minutes < 10) minutes = '0' + minutes;
      let seconds = date.getSeconds();
      if(seconds < 10) seconds = '0' + seconds;

      return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
    }

    const readableDate = getReadableLastModified(page.lastModified);

    return (
      <div className="properties-editor" tabIndex="0" onKeyDown={this.handleKeyDown}>
        {
          this.state.isLoading &&
          <div className="loading"></div>
        }
        <div className="basic-information">
          {page.id !== null &&
            <label>
              <div>Page id</div>
              <input type="text" value={page.id} readOnly={true} />
            </label>
          }

          <label>
            <div>Last modified</div>
            <input type="text" value={readableDate} readOnly={true} />
          </label>

          <label>
            <div>URL</div>
            <input type="text" value={page.url} onChange={this.handleChangeUrl} />
          </label>
        </div>

        <div className="top-fields">
          <div className="top-fields__left">
            <label>
              <div>Title</div>
              <input type="text" value={page.title} onChange={this.handleChangeTitle} />
            </label>

            <label>
              <div>Author</div>
              <input type="text" value={page.author} onChange={this.handleChangeAuthor} />
            </label>
          </div>

          <div className="top-fields__right">
            <label>
              <div>Description</div>
              <textarea value={page.description} onChange={this.handleChangeDescription} />
            </label>
          </div>
        </div>

        <label>
          <div>Content</div>
          <AceEditor
          className="content-editor"
          mode="php"
          theme="xcode"
          wrapEnabled={true}
          value={ page.content }
          setOptions={{
            tabSize: 2,
            useSoftTabs: true,
          }}
          onChange={this.handleChangeContent} />
        </label>


        <div className="rest">
          <div className="rest__left">
            <label>
              <div>Canonical</div>
              <input type="text" value={page.canonical} onChange={this.handleChangeCanonical} />
            </label>

            <label>
              <input type="checkbox" checked={page.noIndex} onChange={this.handleChangeNoIndex} />
              <span>noIndex</span>
            </label>

            <label>
              <input type="checkbox" checked={page.noFollow} onChange={this.handleChangeNoFollow} />
              <span>noFollow</span>
            </label>
          </div>

          <div className="rest__right">
            <label>
              <div>Head stuff</div>
              <textarea value={page.headStuff} onChange={this.handleChangeHeadStuff} />
            </label>
          </div>
        </div>

        <div className="buttons-row">
          <div className="buttons-row__left">
            <button
              onClick={this.handleSavePage}>Save page</button>
          </div>

          { this.state.page.id &&
            <div className="buttons-row__right">
              <button className="danger"
                onClick={this.handleDeletePage}>Delete page</button>
            </div>
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(Actions.logout, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePropertiesEditor);

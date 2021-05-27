/**
 * @file Page list item component.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */
import React from 'react';

import { NavLink } from 'react-router-dom';

import './PageListItem.scss';

function PageListItem(props) {
  return (
    <div className={'page-list-item ' + (props.isActive ? 'is_active' : '')}>
      <NavLink
        to={'/page/' + props.id}
        exact={true}
        className="item__name">
        <span>
          {props.name || props.href || 'id:' + props.id}
        </span>
      </NavLink>

      {props.href &&
        <a href={props.href}
          className="item__icon icon_new_window" target="_blank"></a>
      }
    </div>
  );
}

export default PageListItem;

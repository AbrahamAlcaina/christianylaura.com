import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../components/DropDownMenu'
import { FormattedMessage } from 'react-intl';
import menu from '../data/artworksMenu'
import { FaImage, FaAngleRight } from 'react-icons/fa'

const RootMenu = ( {props} ) => {
    const langKey = 'en';
    const keys = [ 'painting', 'sculpture', 'performance' ];
    const base = '/en/test/';
    const basename = 'artworks'

    console.log(keys);
    return(
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          <FaImage className="menu-names" />
          <FormattedMessage id="artworks"/>
        </a>
        <div className="navbar-dropdown">
          <a className="navbar-item">
            <FormattedMessage id="portfolio"/>
          </a>
          <div className="nested navbar-item dropdown">
            <div className="dropdown-trigger">
              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <FormattedMessage id="painting"/>
                <span className="icon is-small">
                  <FaAngleRight  aria-hidden="true"/>
                </span>
              </button>
           </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
               <div className="dropdown-content">
               <Dropdown
               langKey={langKey}
               base={base}
               baseName={basename}
               switches={keys}
               links={menu}
               />
           </div>
          </div>
        </div>
        <div className="nested navbar-item dropdown">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <FormattedMessage id="sculpture"/>
              <span className="icon is-small">
                <FaAngleRight  aria-hidden="true"/>
              </span>
            </button>
         </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
             <div className="dropdown-content">
             <Dropdown
             langKey={langKey}
             base={base}
             baseName={basename}
             switches={keys}
             links={menu}
             />
         </div>
        </div>
      </div>
        <a className="navbar-item">another one</a>
          <a className="navbar-item">
          Other dropdown item
        </a>
                  <a href="#" className="navbar-item is-active">
          Active dropdown item
        </a>
                  <a href="#" className="navbar-item">
          Other dropdown item
        </a>
        </div>
      </div>
    )
}

export default RootMenu;

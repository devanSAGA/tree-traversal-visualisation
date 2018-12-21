/* Utility component to render custom dropdown menu
"react-fontawesome" package is used to provide icons
*/

import React from "react";
import FontAwesome from "react-fontawesome";

import "../../styles/Dropdown.css";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false
    };
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.listOpen) {
        window.addEventListener("click", this.closeDropdown);
      } else {
        window.removeEventListener("click", this.closeDropdown);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.closeDropdown);
  }

  /*closes the dropdown menu when clicked anywhere on the screen*/
  closeDropdown = () => {
    this.setState({
      listOpen: false
    });
  };

  /*toggles the dropdown between open/close when clicked on its header*/
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  selectItem(selectedOption, id, stateKey) {
    this.setState({ listOpen: false });
    this.props.handleTraversalChange(selectedOption, id, stateKey);
  }

  render() {
    const { options, title } = this.props;
    const { listOpen } = this.state;
    return (
      <div className="dropdown-wrapper">
        <div className="dropdown-header" onClick={() => this.toggleList()}>
          <div className="dropdown-header-title">
            {title === "Select Traversal" ? `${title}` : `${title} Traversal`}
          </div>
          <div>
            {listOpen ? (
              <FontAwesome name="angle-up" />
            ) : (
              <FontAwesome name="angle-down" />
            )}
          </div>
        </div>
        {listOpen && (
          <ul className="dropdown-list" onClick={e => e.stopPropagation()}>
            {options.map(option => (
              <li
                className="dropdown-list-item"
                key={option.value}
                onClick={() =>
                  this.selectItem(option.value, option.id, option.key)
                }
              >
                <span>{option.value} Traversal</span>
                <span>{option.selected && <FontAwesome name="check" />}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

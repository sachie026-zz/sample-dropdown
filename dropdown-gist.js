/*
 * A simple React component

   Answer for the 5th question
   -> We can just have the function wich return the array of items, then we just have to assign it to
      any variable. Then just loop through it using the map function.
      example:
      Const dropDownItems = [item1,item2...];
      <Dropdown>
        {
            dropDownItems.map((item, index) => {
                <DropdownItem key=`page${index}` href=`/page${index}`>
                    Page {index}
                </DropdownItem>
            })
        }
      </Dropdown>  
 */
import React, { PureComponent } from "react";

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this); // Method binding is required
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen }, () => {
      let syncObject = {};
      syncObject[this.props.serverKey] = this.state.isOpen;
      app.sync("PATCH", "user", { ...syncObject });
    });
  }

  render() {
    const { isOpen } = this.state;
    const { label } = this.props;

    return (
      <div className="dropdown">
        <button
          type="button"
          className="dropdown-button"
          id="dropdownButton"
          aria-haspopup="true"
          aria-expended={isOpen}
          onClick={this.toggle}
        >
          {label}
        </button>

        <ul
          className={`${isOpen ? "dropdown-open" : ""} dropdown-menu`}
          aria-labelledby="dropdownButton"
          role="menu"
        >
          {/* Show hide the list based on isOpen property*/}
          {isOpen ? this.props.children : null}
        </ul>
      </div>
    );
  }
}

class DropdownItem extends PureComponent {
  render() {
    return (
      <div>
        {/* Need to show the nav content */}
        <h1>{this.props.children}</h1>
      </div>
    );
  }
}

class ExampleNav extends PureComponent {
  render() {
    return (
      <nav>
        <a href="/page1">Page 1</a>
        {/* Pass the serverKey prop to sync with server */}
        <Dropdown label="More items" serverKey="dropdown_1_state">
          {/* Pass the key prop to each child using */}
          <DropdownItem key="page2" href="/page2">
            Page 2
          </DropdownItem>
          <DropdownItem key="page3" href="/page3">
            Page 3
          </DropdownItem>
          <DropdownItem key="page4" href="/page4">
            Page 4
          </DropdownItem>
        </Dropdown>
        <Dropdown label="Even more items" serverKey="dropdown_2_state">
          <DropdownItem key="page5" href="/page5">
            Page 5
          </DropdownItem>
          <DropdownItem key="page6" href="/page6">
            Page 6
          </DropdownItem>
        </Dropdown>
      </nav>
    );
  }
}

/*
 * Render the above component into the div#app
 */
React.render(<ExampleNav />, document.getElementById("app"));

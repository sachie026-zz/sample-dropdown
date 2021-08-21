/*
 * A simple React component
 */

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this); // Method binding is required
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
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

class DropdownItem extends React.Component {
  render() {
    return (
      <div>
        {/* Need to show the nav content */}
        <h1>{this.props.children}</h1>
      </div>
    );
  }
}

class ExampleNav extends React.Component {
  render() {
    return (
      <nav>
        <a href="/page1">Page 1</a>
        <Dropdown label="More items">
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
        <Dropdown label="Even more items">
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

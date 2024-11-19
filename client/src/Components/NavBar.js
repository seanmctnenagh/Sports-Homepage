import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import SplitButton from 'react-bootstrap/SplitButton';



import { breakoutSettings as settings } from "./Settings";

const NavBar = () => {
	return (
		<Navbar expand="sm" className="bg-success" sticky="top">
			<Container>
				<Dropdown as={ButtonGroup}>
					<Button as={Link} to="/overallFuture" variant="warning" >Future</Button>

					<Dropdown.Toggle split variant="warning" className="navbarDropdownA" />

					<Dropdown.Menu>
						{settings.map((page, index) => {
							return (
								(page.navbar && page.timeframe === "Future" && page.comp)
									?
									<Dropdown.Item key={index} as={Link} to={`/${page.url}`}>
										<b>{page.comp}</b>
									</Dropdown.Item>
									:
									<></>
							)
						})}
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown as={ButtonGroup}>
					<Button as={Link} to="/overallPast" variant="danger">Past</Button>

					<Dropdown.Toggle split variant="danger" className="navbarDropdownB" id="dropdown-split-basic" />

					<Dropdown.Menu align="end">
						{settings.map((page, index) => {
							return (
								(page.navbar && page.timeframe === "Past" && page.comp)
									?
									<Dropdown.Item key={index} as={Link} to={`/${page.url}`}>
										<b>{page.comp}</b>
									</Dropdown.Item>
									:
									<></>
							)
						})}
					</Dropdown.Menu>
				</Dropdown>
			</Container>
		</Navbar >
	);
};

export default NavBar;

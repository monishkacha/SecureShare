import "./Navbar.css";

function Navbar({ title }) {
    return (
        <nav className="navbar">

            <div className="navbar-logo">
                SecureShare
            </div>

            <div className="navbar-title">
                {title}
            </div>

        </nav>
    );
}

export default Navbar;
import React from "react"
import "../Footer/Footer.css"

interface FooterProps{
  year: number;
}

const Footer: React.FC<FooterProps> = ({ year }) => {
  return (
    <footer>
      <span className="footer">© React Blog - {year}</span>
    </footer>
  );
};
export default Footer;
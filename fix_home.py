from pathlib import Path

p = Path("src/pages/Home.jsx")
s = p.read_text()

s = s.replace(
'import { Link } from "react-scroll";',
'import { Link as ScrollLink } from "react-scroll";\nimport { Link } from "react-router-dom";'
)

s = s.replace(
'''<Link
              to="services"
              smooth={true}
              duration={700}
              offset={-90}
            >''',
'''<ScrollLink
              to="services"
              smooth={true}
              duration={700}
              offset={-90}
            >'''
)

s = s.replace("</Link>", "</ScrollLink>", 1)

s = s.replace(
'''<Link
              to="about"
              smooth={true}
              duration={700}
              offset={-90}
            >''',
'''<Link
              to="/learn-more"
            >''',
1
)

p.write_text(s)
print("Done")

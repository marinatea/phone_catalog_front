// 1. CSS Stylesheets
// Use traditional CSS files to style your components. This is the simplest method and keeps HTML and CSS separate.

// 2. CSS Modules
// CSS Modules allow you to scope CSS to a specific component, preventing styles from leaking into other parts of the application.

:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #ffffff;
  --background-color: #ecf0f1;
  --border-color: #bdc3c7;
}

.container {
  background-color: var(--background-color);
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--secondary-color);
}

import React from 'react';
import styles from './styles.module.css';

function App() {
  return (
    <div className={styles.container}>
      <input type="text" />
      <button>Submit</button>
    </div>
  );
}

export default App;

3. Styled Components
Styled-components is a library for writing CSS in JS. It allows you to create component-level styles using tagged template literals.

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2ecc71;
  }
`;

function App() {
  return (
    <Container>
      <Input type="text" />
      <Button>Submit</Button>
    </Container>
  );
}

export default App;

4. Sass/SCSS
Sass (Syntactically Awesome Style Sheets) is a preprocessor scripting language that is interpreted or compiled into CSS. It adds features like variables, nested rules, and mixins.

:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #ffffff;
  --background-color: #ecf0f1;
  --border-color: #bdc3c7;
}

.container {
  background-color: var(--background-color);
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--secondary-color);
  }
}

import React from 'react';
import './styles.scss';

function App() {
  return (
    <div className="container">
      <input type="text" />
      <button>Submit</button>
    </div>
  );
}

export default App;

5. Tailwind CSS
Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It provides low-level utility classes to build complex designs.

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        text: '#ffffff',
        background: '#ecf0f1',
        border: '#bdc3c7',
      },
    },
  },
  variants: {},
  plugins: [],
};

import React from 'react';
import 'tailwindcss/tailwind.css';

function App() {
  return (
    <div className="bg-background p-5 border border-border rounded-lg max-w-md mx-auto shadow-lg">
      <input
        type="text"
        className="w-full p-2 mb-3 border border-border rounded text-lg"
      />
      <button className="bg-primary text-text p-2 rounded text-lg hover:bg-secondary transition-colors duration-300">
        Submit
      </button>
    </div>
  );
}

export default App;



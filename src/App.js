import React from 'react';
import './App.css'; // If you have any styles specific to App.js
import Search from './component/search'; // Import the Search component

function App() {
  return (
    <div className="App">
      <main>
        <Search /> {/* Add the Search component here */}
        {/* Other content/components can go here */}
      </main>
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import './search.css'; // Import CSS file for styling
import data from '../data/data.json';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'; // Import LineChart and BarChart components from recharts

// Create the Search component
function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false); // Track if search has been performed
  const [showSecondContainer, setShowSecondContainer] = useState(false); // Track if the second container should be shown
  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [showPopularTag, setShowPopularTag] = useState(false); // Track if popular tag should be shown
  const [showFollowers, setShowFollowers] = useState(false); // Track if followers should be shown
  const [showCharts, setShowCharts] = useState(false); // Track if charts should be shown
  const [searchResultsAnimationKey, setSearchResultsAnimationKey] = useState('');
  const [popularTagAnimationKey, setPopularTagAnimationKey] = useState('');
  const [followersAnimationKey, setFollowersAnimationKey] = useState('');
  const [chartsAnimationKey, setChartsAnimationKey] = useState('');
  const [logoButtonsAnimationKey, setLogoButtonsAnimationKey] = useState('');

  // Function to handle search input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to handle search button click
  const handleSearch = () => {
    const filteredResults = data.socialMediaPlatforms.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
    setSearched(true); // Set searched to true after performing a search
    setShowSecondContainer(false); // Always show the first container after search
    setShowSearchContainer(true); // Show search container with animation
    setShowPopularTag(true); // Show popular tag with animation
    setShowFollowers(true); // Show followers with animation
    setShowCharts(true); // Show charts after search

    // Reset animation state for various elements
    setSearchResultsAnimationKey(Math.random().toString());
    setPopularTagAnimationKey(Math.random().toString());
    setFollowersAnimationKey(Math.random().toString());
    setChartsAnimationKey(Math.random().toString());
    setLogoButtonsAnimationKey(Math.random().toString());
  };

  // Function to handle next page
  const handleNextPage = () => {
    setShowSecondContainer(true);
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    setShowSecondContainer(false);
  };

  return (
    <div>
      <div className={`search-container ${showSearchContainer ? 'show' : ''}`}>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search here..."
            value={query}
            onChange={handleInputChange}
          />
          <button className={`search-button ${searched ? 'animate' : ''}`} onClick={handleSearch}>
            <i className="bi bi-search">Search</i>
          </button>
        </div>
        {/* Display search results */}
        {searched && (
          <div key={searchResultsAnimationKey} className={`search-results ${showSearchContainer ? 'show' : ''}`}>
            {searchResults.length > 0 ? (
              <div className={showSecondContainer ? "first-container hidden" : "first-container"}>
                {searchResults.map((item, index) => (
                  <div key={index} className="result-item">
                    <p><img src={item.image} alt={item.founded} />{item.CEO}</p>
                    <p><img src={item.Ilogo} alt={item.name} style={{height: "10rem", width: "15rem"}}/>{item.Impact}</p>
                    <p><img src={item.logo} alt={item.founded} />{item.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-result">
                <p>No result found</p>
              </div>
            )}
            <div className={showSecondContainer ? "second-container" : "second-container hidden"}>
              {searchResults.map((item, index) => (
                <div key={index} className="result-item">
                  <p><img src={item.flogo} alt={item.name} />Founded:{item.founded}</p>
                  <p><img src={item.dlogo} alt={item.name} style={{height: "5rem", width: "15rem"}}/>{item.description}</p>
                  <p><img src={item.wlogo} alt={item.name} /><a href={item.website} target="_blank" rel="noopener noreferrer">Website</a></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display logo buttons for navigation */}
        {searched && searchResults.length > 0 && (
          <div key={logoButtonsAnimationKey} className="navigation">
            <button className={`logo-button ${showSecondContainer ? 'animate' : ''}`} onClick={handlePreviousPage} disabled={!showSecondContainer}>
              &lt;
            </button>
            <button className={`logo-button ${showSecondContainer ? '' : 'animate'}`} onClick={handleNextPage} disabled={showSecondContainer}>
              &gt;
            </button>
          </div>
        )}

        {/* Display popular tag and followers only if there are search results */}
        {searched && searchResults.length > 0 && (
          <div className="additional-info">
            <div key={popularTagAnimationKey} className={`popular-tag ${showPopularTag ? 'show' : ''}`}>
              <h3>Popular Tag</h3>
              {searchResults.map((item, index) => (
                <p key={index}>{item.Top}</p>
              ))}
            </div>
            <div key={followersAnimationKey} className={`followers ${showFollowers ? 'show' : ''}`}>
              <h3>Followers</h3>
              {searchResults.map((item, index) => (
                <p key={index}>{item.followers}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Display LineChart and BarChart if search is performed */}
      {searched && searchResults.length > 0 && showCharts && (
        <div key={chartsAnimationKey} className="charts-container">
          <div className="chart">
            <LineChart
              width={600}
              height={300}
              data={[
                { name: '2017', uv: 400, pv: -2400, amt: 2400 },
                { name: '2018', uv: -500, pv: 2400, amt: 2400 },
                { name: '2019', uv: 600, pv: -2400, amt: 2400 },
                { name: '2020', uv: -700, pv: 2400, amt: 2400 }
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
          <div className="chart">
            <BarChart
              width={600}
              height={300}
              data={[
                { name: '2017', uv: 400, pv: -2400, amt: 2400 },
                { name: '2018', uv: -500, pv: 2400, amt: 2400 },
                { name: '2019', uv: 600, pv: -2400, amt: 2400 },
                { name: '2020', uv: -700, pv: 2400, amt: 2400 }
              ]}
              margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
              <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
}

// Export the Search component
export default Search;

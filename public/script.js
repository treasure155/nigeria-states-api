document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const stateInput = document.getElementById('stateInput');
  const stateInfoBody = document.getElementById('stateInfoBody');

  searchBtn.addEventListener('click', () => {
    const stateName = stateInput.value.trim().toLowerCase(); // Normalize to lowercase
    console.log(`Searching for state: ${stateName}`); // Debugging: Log the state name

    if (stateName === 'capitals') {
      fetchCapitals();
    } else if (stateName === 'governors') {
      fetchGovernors();
    } else {
      fetchStateInfo(stateName);
    }
  });

  function fetchStateInfo(stateName) {
    fetch(`http://localhost:3000/states/${stateName}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('State not found:', stateName); // Debugging: Log when state not found
          throw new Error('State not found');
        }
      })
      .then(data => {
        console.log('State data received:', data); // Debugging: Log the received data
        displayStateInfo(data);
      })
      .catch(error => {
        console.error('Error fetching state info:', error); // Debugging: Log errors
        displayError(error.message);
      });
  }

  function fetchCapitals() {
    fetch('http://localhost:3000/states/capitals')
      .then(response => response.json())
      .then(data => {
        console.log('Capitals data received:', data); // Debugging: Log the received data
        displayCapitals(data);
      })
      .catch(error => {
        console.error('Error fetching capitals:', error); // Debugging: Log errors
        displayError(error.message);
      });
  }

  function fetchGovernors() {
    fetch('http://localhost:3000/states/governors')
      .then(response => response.json())
      .then(data => {
        console.log('Governors data received:', data); // Debugging: Log the received data
        displayGovernors(data);
      })
      .catch(error => {
        console.error('Error fetching governors:', error); // Debugging: Log errors
        displayError(error.message);
      });
  }

  function displayStateInfo(data) {
    stateInfoBody.innerHTML = `
      <tr>
        <td>${data.state}</td>
        <td>${data.capital}</td>
        <td>${data.governor}</td>
      </tr>
    `;
  }

  function displayCapitals(data) {
    stateInfoBody.innerHTML = data.map(capital => `
      <tr>
        <td colspan="3">${capital}</td>
      </tr>
    `).join('');
  }

  function displayGovernors(data) {
    stateInfoBody.innerHTML = data.map(governor => `
      <tr>
        <td colspan="3">${governor}</td>
      </tr>
    `).join('');
  }

  function displayError(message) {
    stateInfoBody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align:center;">${message}</td>
      </tr>
    `;
  }
});

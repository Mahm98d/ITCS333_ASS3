// Fetch and process data from the API
async function fetchData() {
    const API_URL = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";
  
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      // Safely access the 'results' array
      if (data.results && Array.isArray(data.results)) {
        populateTable(data.results);
      } else {
        console.error("Unexpected response structure");
        populateTable([]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  
  // Function to populate the table with data
  function populateTable(data) {
    const tableBody = document.getElementById("data-table");
    tableBody.innerHTML = ""; // clear previous data
  
    data.forEach((item) => {
      const row = `
        <tr>
          <td>${item.year || "N/A"}</td>
          <td>${item.semester || "N/A"}</td>
          <td>${item.the_programs || "N/A"}</td>
          <td>${item.nationality || "N/A"}</td>
          <td>${item.colleges || "N/A"}</td>
          <td>${item.number_of_students || "N/A"}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }
  
  // Call fetchData on page load
  document.addEventListener("DOMContentLoaded", fetchData);
  
import { displayPhotographers } from '../utils/functions.js'

/**
 * Retrieves data from a specified source asynchronously.
 *
 * @param {string} dataSrc - The URL or path to the data source.
 * @returns {Promise} A promise that resolves to the fetched data in JSON format.
 */
async function getData (dataSrc) {
  // Fetch data from the specified source
  let data = await fetch(dataSrc)

  // Parse the data as JSON
  data = data.json()

  // Return the fetched data
  return data
}

// Fetch JSON data from the './data/photographers.json' file using the getData function and store it in the 'jsonData' variable.
const jsonData = await getData('./data/photographers.json')
// console.log(jsonData)
displayPhotographers(jsonData.photographers)

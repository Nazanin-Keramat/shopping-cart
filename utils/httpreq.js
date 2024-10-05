// httpreq.js is for our request (getting and posting HTTP methods)

// this function is for get(fetch) data from json file
//  define dataFetch async beacause it takes time to fetch data and we want have efficient code
const fetchData = async () => {
  const res = await fetch("data.json");
  //   .json() is a default method in fetch and like .pars() on json string . Make data in their real role and not just string!
  const json = await res.json();
  //the export of this is array that contain 9 object
  return json;
};
// give permission for extract it in this file and export it in another file.
export { fetchData };

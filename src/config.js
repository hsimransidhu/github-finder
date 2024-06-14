 
 export const token = process.env.REACT_APP_GITHUB_TOKEN;
// GitHub API token for authentication
export const options = {
  headers: { Authorization: `Bearer ${token}` }  //Aithorization Header
};

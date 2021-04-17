export const setQueryParams = (params, history) => {
  let searchParams = new URLSearchParams(params);
  history.replace({...history.location, search:searchParams.toString()})
}
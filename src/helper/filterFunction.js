import { getStatus } from "./convertItemToFeature";

const itemFilterFunction = ({ filterState }) => {
  return (item) => {
    const filterStateStations = filterState?.stations;
    const status = getStatus(item);
    return filterStateStations.includes(status);
  };
};
export default itemFilterFunction;

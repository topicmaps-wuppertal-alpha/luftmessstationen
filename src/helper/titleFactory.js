import { LOOKUP } from "./constants";
const factory = ({ featureCollectionContext }) => {
  const getThemaById = (id) => {
    const result = featureCollectionContext?.items?.find((item) => item?.thema?.id === id);
    return result?.thema?.name;
  };
  console.log("featureCollectionContext?.filterState?", featureCollectionContext?.filterState);

  let filterDescription = "?";
  if (featureCollectionContext?.filteredItems?.length === featureCollectionContext?.items?.length) {
    filterDescription = undefined;
  } else {
    const stationsArten = [...featureCollectionContext?.filterState?.stations];
    stationsArten.sort();

    stationsArten.sort((a, b) => {
      if (a < b || a === "inaktiv") {
        return -1;
      }
      if (a > b || b === "inaktiv") {
        return 1;
      }
      // a muss gleich b sein
      return 0;
    });
    console.log("yyy stationsArten", stationsArten);

    if (
      stationsArten.includes("unauffaellig") &&
      stationsArten.includes("auffaellig") &&
      stationsArten.includes("warnend") &&
      stationsArten.includes("inaktiv")
    ) {
      filterDescription = "nur aktive Messstationen";
    } else if (stationsArten.length === 1 && !stationsArten.includes("inaktiv")) {
      filterDescription = `nur ${LOOKUP[stationsArten[0]].filterTitle} Messstationen`;
    } else if (stationsArten.length === 1) {
      filterDescription = `nur ${LOOKUP[stationsArten[0]].filterTitle}`;
    } else {
      const parts = [];
      for (const art of stationsArten) {
        parts.push(LOOKUP[art].filterTitle);
      }

      filterDescription = `nur ${parts.slice(0, parts.length - 1).join(", ")} und ${
        parts[parts.length - 1]
      } Messstationen`;
    }
  }

  // if (featureCollectionContext?.filteredItems?.length === 0) {
  //   return (
  //     <div>
  //       <b>Keine Luftmessstationen gefunden!</b> Bitte überprüfen Sie Ihre Filtereinstellungen.
  //     </div>
  //   );
  // }

  if (filterDescription) {
    return (
      <div>
        <b>Meine Messstationen der Luftqualität:</b> {filterDescription}
      </div>
    );
  } else {
    return undefined;
  }
};

export default factory;

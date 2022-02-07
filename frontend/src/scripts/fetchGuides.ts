import { DataModel } from "../models/DataModel";

export const fetchGuides = async (): Promise<DataModel[]> => {
  return fetch(
    "https://raw.githubusercontent.com/Mcbeer/medical-chest-scanner/main/fileparser/vejledninger3.json"
  )
    .then((data) => data.json())
    .then((guides: DataModel[]) =>
      guides.sort((a, b) => {
        const aId = parseInt(a.id.split(".")[0]);
        const bId = parseInt(a.id.split(".")[0]);
        return aId > bId ? -1 : 1;
      })
    );
};

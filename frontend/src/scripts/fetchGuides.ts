import { DataModel } from "../models/DataModel";

export const fetchGuides = async (): Promise<DataModel[]> => {
  return fetch(
    "https://raw.githubusercontent.com/Mcbeer/medical-chest-scanner/main/fileparser/vejledninger.json"
  )
    .then((data) => data.json())
    .then((guides: DataModel[]) =>
      guides.sort((a, b) => a.id.localeCompare(b.id))
    );
};

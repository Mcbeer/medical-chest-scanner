import { DataModel } from "../models/DataModel";

export const fetchGuides = async (): Promise<DataModel[]> => {
  return fetch(
    "https://raw.githubusercontent.com/Mcbeer/medical-chest-scanner/main/api/vejledninger.json"
  ).then((data) => data.json());
};

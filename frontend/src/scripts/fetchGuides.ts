import { set } from "idb-keyval";
import { DataModel } from "../models/DataModel";

export const fetchGuides = async () => {
  return fetch("http://localhost:8000/guides")
    .then((data) => data.json())
    .then(async (data: DataModel[]) => {
      // Save the JSON file to IndexedDB
      data.forEach(async (item) => {
        await set(item.id, item);
      });
    });
};

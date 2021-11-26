import fs from "fs";
import xlsx from "node-xlsx";

type ReadExcelRow = string[];

interface DataModel {
  id: string; // Grp. No / ATC Code
  groupNumber: number;
  groupName: string; // Header
  name: string; // Lægemiddelstof
  form: string; // Form
  effect: string; // Virkning
  dosage: string; // Dosering
  sideEffects: string; // Bivirkninger
  validity: string; // Holdbarhed
  storage: string; // Opbevaring
  remarks: string; // Anmærkninger
  lang: "da-DK" | "en-GB";
}

const main = () => {
  const workSheetsFromFile = xlsx.parse(`${__dirname}/vejledninger.xlsx`);
  const sheetData = workSheetsFromFile[0].data as ReadExcelRow[];
  const withoutHeaders = sheetData.slice(2);

  const groupedData: DataModel[] = [];
  let intermediate: DataModel = {
    id: "",
    name: "",
    dosage: "",
    form: "",
    effect: "",
    groupNumber: 0,
    groupName: "",
    sideEffects: "",
    validity: "",
    storage: "",
    remarks: "",
    lang: "da-DK",
  };
  let counter = 0;
  withoutHeaders.forEach((row) => {
    // console.log(row);
    if (row.length === 1) {
      intermediate = {
        id: "",
        name: "",
        dosage: "",
        form: "",
        effect: "",
        groupNumber: 0,
        groupName: "",
        sideEffects: "",
        validity: "",
        storage: "",
        remarks: "",
        lang: "en-GB",
      };
      counter = 0;
      intermediate.groupNumber = parseInt(row[0].replace(/\D/g, ""));
      intermediate.groupName = row[0].substring(6);
      counter++;
      return;
    }

    if (row.length === 4 && counter === 1) {
      intermediate.id = row[1].trim();
      intermediate.name = row[3].trim();
      if (isDanish(row[1].trim()) || isDanish(row[3].trim())) {
        intermediate.lang = "da-DK";
      }
      counter++;
      return;
    }

    if (row.length === 4 && counter === 2) {
      intermediate.form = row[3].trim();
      if (isDanish(row[3].trim())) {
        intermediate.lang = "da-DK";
      }
      counter++;
      return;
    }

    if (row.length === 4 && counter === 3) {
      intermediate.effect = row[3].trim();
      if (isDanish(row[3].trim())) {
        intermediate.lang = "da-DK";
      }
      counter++;
      return;
    }

    if (row.length === 4 && counter === 4) {
      intermediate.dosage = row[3].trim();
      if (isDanish(row[3].trim())) {
        intermediate.lang = "da-DK";
      }
      counter++;
      return;
    }

    if (row.length === 4 && counter === 5) {
      intermediate.sideEffects = row[3].trim();
      if (isDanish(row[3].trim())) {
        intermediate.lang = "da-DK";
      }
      counter++;
      return;
    }

    if (row.length === 4 && counter === 6) {
      intermediate.validity = row[3].trim();
      if (isDanish(row[3].trim())) {
        intermediate.lang = "da-DK";
      }
      counter++;
      return;
    }

    if (row.length === 4 && counter === 7) {
      intermediate.storage = row[3].trim();
      if (isDanish(row[3].trim())) {
        intermediate.lang = "da-DK";
      }
      counter++;
      return;
    }

    if (row.length === 4 && counter === 8) {
      intermediate.remarks = row[3].trim();
      if (isDanish(row[3].trim())) {
        intermediate.lang = "da-DK";
      }

      groupedData.push(intermediate);
      intermediate = {
        id: "",
        name: "",
        dosage: "",
        form: "",
        effect: "",
        groupNumber: intermediate.groupNumber,
        groupName: intermediate.groupName,
        sideEffects: "",
        validity: "",
        storage: "",
        remarks: "",
        lang: "en-GB",
      };

      counter = 0;
      counter++;
      return;
    }
  });

  fs.writeFileSync("vejledninger.json", JSON.stringify(groupedData));
  console.log("Data mapped...");
};

const isDanish = (str: string) => {
  return str.includes("æ") || str.includes("ø") || str.includes("å");
};

main();

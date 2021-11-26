export interface DataModel {
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

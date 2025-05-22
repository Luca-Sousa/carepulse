export const GENDER_OPTIONS = [
  {
    value: "male",
    label: "Masculino",
  },
  {
    value: "female",
    label: "Feminino",
  },
  {
    value: "other",
    label: "Outro",
  },
];

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  { value: "Birth Certificate", label: "Certidão de Nascimento" },
  { value: "Driver's License", label: "Carteira de Motorista" },
  {
    value: "Medical Insurance Card/Policy",
    label: "Cartão/Apólice de Seguro de Saúde",
  },
  { value: "Military ID Card", label: "Carteira de Identificação Militar" },
  { value: "National Identity Card", label: "Carteira de Identidade Nacional" },
  { value: "Passport", label: "Passaporte" },
  {
    value: "Resident Alien Card (Green Card)",
    label: "Cartão de Residente Permanente (Green Card)",
  },
  { value: "Social Security Card", label: "Cartão da Previdência Social" },
  { value: "State ID Card", label: "Carteira de Identidade Estadual" },
  { value: "Student ID Card", label: "Carteira de Estudante" },
  { value: "Voter ID Card", label: "Título de Eleitor" },
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

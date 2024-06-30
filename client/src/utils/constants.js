export const states = [
  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
  { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
  { label: "Assam", value: "Assam" },
  { label: "Bihar", value: "Bihar" },
  { label: "Chhattisgarh", value: "Chhattisgarh" },
  { label: "Chandigarh", value: "Chandigarh" },
  { label: "Delhi", value: "Delhi" },
  { label: "Goa", value: "Goa" },
  { label: "Gujarat", value: "Gujarat" },
  { label: "Haryana", value: "Haryana" },
  { label: "Himachal Pradesh", value: "Himachal Pradesh" },
  { label: "Jharkhand", value: "Jharkhand" },
  { label: "Karnataka", value: "Karnataka" },
  { label: "Kerala", value: "Kerala" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Manipur", value: "Manipur" },
  { label: "Meghalaya", value: "Meghalaya" },
  { label: "Mizoram", value: "Mizoram" },
  { label: "Nagaland", value: "Nagaland" },
  { label: "Odisha", value: "Odisha" },
  { label: "Punjab", value: "Punjab" },
  { label: "Rajasthan", value: "Rajasthan" },
  { label: "Sikkim", value: "Sikkim" },
  { label: "Tamil Nadu", value: "Tamil Nadu" },
  { label: "Telangana", value: "Telangana" },
  { label: "Tripura", value: "Tripura" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  { label: "Uttarakhand", value: "Uttarakhand" },
  { label: "West Bengal", value: "West Bengal" },
];

export const STUDENT_STATUS = {
  ONBOARDED: "ONBOARDED",
  INPROGRESS: "INPROGRESS",
  COMPLETED: "COMPLETED",
};

export const ATTENDANCE_STATUS = {
  STARTED: "STARTED",
  COMPLETED: "COMPLETED",
};

export const ATTENDANCE_STATUS_PAIR = [
  { label: "Started", value: "Started" },
  { label: "Completed", value: "Completed" },
];

export const PROFILES = {
  ADMIN: "ADMIN",
  ORGANIZATION: "ORGANIZATION",
  DRIVER: "DRIVER",
  STUDENT: "STUDENT",
};

export const ROLES_ROUTES = {
  ADMIN: "/admin",
  ORGANIZATION: "/organization",
  DRIVER: "/driver",
};

export function getRouteForRole(role) {
  return ROLES_ROUTES[role.toUpperCase()] || "undefined";
}

import axios from "axios";
import ApiRoute from "../../utils/apiRoutes";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const authRoute = "/auth";

// auth endpoints start

export async function checkOwnerExistence(data) {
  return await axios.post(authRoute + ApiRoute.checkOwnerExistence, data);
}

export async function getOwnerDetails() {
  return await axios.get(authRoute + ApiRoute.getOwnerDetails);
}

export async function organizationSignup(data) {
  return await axios.post(ApiRoute.createOrganization, data);
}

// auth endpoints end

// student apis start

export async function getStudents(role, query = "") {
  return await axios.get(role + ApiRoute.getStudents + query);
}

export async function getStudentById(role, id) {
  return await axios.get(role + ApiRoute.getStudentById.replace(":id", id));
}

export async function createStudent(role, data) {
  return await axios.post(role + ApiRoute.createStudent, data);
}

export async function updateStudent(role, id, data) {
  return await axios.patch(
    role + ApiRoute.updateStudent.replace(":id", id),
    data
  );
}

export async function deleteStudent(role, id) {
  return await axios.delete(role + ApiRoute.deleteStudent.replace(":id", id));
}

// student apis end

// attenadance apis start

export async function createAttendanceByStudentId(role, data) {
  return await axios.post(role + ApiRoute.createdAttendanceByStudentId, data);
}

export async function getAttendanceByStudentId(role, query = "") {
  return await axios.get(role + ApiRoute.getAttendanceByStudentId + query);
}

export async function updateAttendance(role, id, data) {
  return await axios.patch(
    role + ApiRoute.updateAttendance.replace(":id", id),
    data
  );
}

export async function deleteAttendance(role, id) {
  return await axios.delete(
    role + ApiRoute.deleteAttendance.replace(":id", id)
  );
}

// attenadance apis end

// driver apis start

export async function getDrivers(role, query = "") {
  return await axios.get(role + ApiRoute.getDrivers + query);
}

export async function getDriverById(role, id) {
  return await axios.get(role + ApiRoute.getDriverById.replace(":id", id));
}

export async function createDriver(role, data) {
  return await axios.post(role + ApiRoute.createDriver, data);
}

export async function updateDriver(role, id, data) {
  return await axios.patch(
    role + ApiRoute.updateDriver.replace(":id", id),
    data
  );
}

export async function deleteDriver(role, id) {
  return await axios.delete(role + ApiRoute.deleteDriver.replace(":id", id));
}

// driver apis end

// organization apis start

export async function getOrganizations(role, query = "") {
  return await axios.get(role + ApiRoute.getOrganizations + query);
}

export async function getOrganizationById(role, id) {
  return await axios.get(
    role + ApiRoute.getOrganizationById.replace(":id", id)
  );
}

export async function createOrganization(role, data) {
  return await axios.post(role + ApiRoute.createOrganization, data);
}

export async function updateOrganization(role, id, data) {
  return await axios.patch(
    role + ApiRoute.updateOrganization.replace(":id", id),
    data
  );
}

// export async function deleteOrganization(id) {
//     return await axios.delete(role + ApiRoute.deleteOrganization.replace(":id", id));
// }

// organization apis end

// Expenses apis start

export async function getExpenses(role, query = "") {
  return await axios.get(role + ApiRoute.getExpenses + query);
}

// Expenses apis end

// admin endpoints start

export async function getAdmins(role) {
  return await axios.get(role + ApiRoute.getAdmins);
}

export async function createAdmin(role, data, query = "") {
  return await axios.post(role + ApiRoute.createAdmin + query, data);
}

export async function deleteAdmin(role, id, query = "") {
  return await axios.delete(
    role + ApiRoute.deleteAdmin.replace(":id", id) + query
  );
}

// admin endpoints end

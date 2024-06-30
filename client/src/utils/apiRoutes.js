

const API_ROUTES = {
  // student routes
  getStudents: '/student',
  getStudentById : '/student/:id',
  createStudent: '/student',
  updateStudent : "/student/:id",
  deleteStudent : '/student/:id',

  // attendance routes
  getAttendanceByStudentId : '/attendance',
  createdAttendanceByStudentId : '/attendance',
  updateAttendance: "/attendance/:id",
  deleteAttendance: "/attendance/:id",

  // drivers routes
  getDrivers: '/driver',
  getDriverById : '/driver/:id',
  createDriver: '/driver',
  updateDriver : '/driver/:id',
  deleteDriver : "/driver/:id",

  // organzation routes
  getOrganizations: '/organization',
  getOrganizationById: '/organization/:id',
  createOrganization : '/organization',
  updateOrganization: '/organization/:id',
  // deleteOrganization : "/delete-driver/:id",


  // expenses routes
  getExpenses : "/expense",

  // auth
  getRefreshToken: '/auth/refresh-token',

  // admin
  getAdmins: '',
  createAdmin : '',
  deleteAdmin : '/:id',

  // auth
  checkOwnerExistence : "/check-owner-existence",
  getOwnerDetails : "/owner-details",

};

export default API_ROUTES;

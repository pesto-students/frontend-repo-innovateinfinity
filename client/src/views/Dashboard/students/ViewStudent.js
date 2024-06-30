import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBar from "@mui/material/AppBar";
import Container from "../../../MainLayouts/Container";
import { Topbar, Sidebar, Table } from "../components";
import setGlobalLoader from "../../../redux/actions/loaderActions";
import {
  getStudentById,
  getAttendanceByStudentId,
  deleteAttendance,
} from "../../../redux/actions/apiActions";

const TableComponent = ({ columns, data, title }) => {
  const theme = useTheme();

  return (
    <Box p={4}>
      <Box
        width={1}
        height={1}
        // minHeight={800}
        borderRadius={2}
        border={`2px solid ${theme.palette.divider}`}
        sx={{
          borderStyle: "dashed",
        }}
      >
        <Table
          columns={columns}
          data={data}
          export={false}
          // search
          selection={false}
          toolbar
          title={title}
        />
      </Box>
    </Box>
  );
};

const ViewStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.authReducer.role);
  const [studentDetails, setStudentDetails] = useState({});
  const [attendanceList, setAttendanceList] = useState([]);
  const [totalKmDriven, setTotalKmDriven] = useState();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const params = useParams();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const open = isMd ? false : openSidebar;

  const handleDeleteAttendance = async (rowData) => {
    let text = `Are you sure you want to delete this attendance record ?`;
    if (window.confirm(text) === true) {
      dispatch(setGlobalLoader(true));
      try {
        await deleteAttendance(role, rowData._id);
        setAttendanceList(attendanceList.filter((d) => d._id !== rowData._id));
        dispatch(setGlobalLoader(false));
      } catch (error) {
        dispatch(setGlobalLoader(false));
        console.log("delete attendance error", error);
        toast.error(error.response.data.msg);
      }
    } else {
      toast.success("Request Cancelled");
    }
  };

  const columns = [
    { title: "Sr no.", field: "index", filtering: false },
    { title: "KM Driven", field: "kmDriven", filtering: false },
    { title: "Driver", field: "driver", filtering: false },
    { title: "Date", field: "date", filtering: false },
    {
      title: "Actions",
      field: "",
      filtering: false,
      render: (rowData) => (
        <div className='tableActions '>
          <Tooltip title='Edit'>
            <EditIcon
              onClick={() =>
                navigate(`/students/attendance/edit/${rowData._id}`, {
                  state: {
                    studentName: studentDetails?.name,
                    date: format(new Date(rowData?.createdAt), "MMM dd, yyyy"),
                    kmDriven: rowData.kmDriven,
                  },
                })
              }
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <DeleteIcon onClick={() => handleDeleteAttendance(rowData)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(setGlobalLoader(true));
    if (params.id !== null && params.id !== undefined) {
      async function studentFunc() {
        try {
          const query = `?studentId=${params.id}`;
          const studentRes = await getStudentById(role, params.id);
          const attendanceRes = await getAttendanceByStudentId(role, query);
          setStudentDetails(studentRes.data.data[0]);
          const data = attendanceRes.data.data.map((d, i) => ({
            index: i + 1,
            ...d,
            date: format(new Date(d?.createdAt), "MMM dd, yyyy"),
            driver: d?.driverId?.name,
          }));
          setAttendanceList(data);
          const kmDriven = data
            .map((d) => d.kmDriven)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );
          setTotalKmDriven(kmDriven);
          dispatch(setGlobalLoader(false));
        } catch (error) {
          dispatch(setGlobalLoader(false));
          console.log("get student details and attendance error", error);
          toast.error(
            error.response.data.message ??
              "some error occured while fetching student and attendance details."
          );
        }
      }
      studentFunc();
    }
  }, [params.id]);

  // const capitalizeString = (values) => {
  //   const name = values.toLowerCase().split(" ");
  //   const capitalizeNameArray = name.map(
  //     (n) => n.charAt(0).toUpperCase() + n.substr(1)
  //   );
  //   return capitalizeNameArray.join(" ");
  // };

  return (
    <Box>
      <AppBar
        position={"fixed"}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
        elevation={0}
      >
        <Container maxWidth={1} paddingY={{ xs: 1, sm: 1.5 }}>
          <Topbar onSidebarOpen={handleSidebarOpen} />
        </Container>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant={isMd ? "permanent" : "temporary"}
      />
      <main>
        <Box height={{ xs: 58, sm: 66, md: 71 }} />
        <Box
          marginLeft={{ md: "290px", xs: "30px" }}
          marginTop={{ md: "20px", xs: "30px" }}
          marginRight={{ md: "40px", xs: "30px" }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant={"subtitle1"} fontWeight={700}>
            Student Details
          </Typography>
        </Box>

        <Box p={4}>
          <Box
            display='flex'
            flex='1 1 auto'
            overflow='hidden'
            paddingLeft={{ md: "256px" }}
            borderRadius={2}
          >
            <Box
              display='flex'
              flex='1 1 auto'
              overflow='hidden'
              border={`2px solid ${theme.palette.divider}`}
              sx={{
                borderStyle: "dashed",
              }}
            >
              <Box flex='1 1 auto' height='100%' overflow='auto'>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  padding={2}
                >
                  <Typography variant={"subtitle2"} fontWeight={700}>
                    Name -
                  </Typography>
                  <Typography variant={"subtitle2"} fontWeight={600}>
                    {studentDetails?.name}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  padding={2}
                >
                  <Typography variant={"subtitle2"} fontWeight={700}>
                    Phone Number -
                  </Typography>
                  <Typography variant={"subtitle2"} fontWeight={600}>
                    {studentDetails?.phoneNumber}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  padding={2}
                >
                  <Typography variant={"subtitle2"} fontWeight={700}>
                    Status -
                  </Typography>
                  <Typography variant={"subtitle2"} fontWeight={600}>
                    {studentDetails?.status}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  padding={2}
                >
                  <Typography variant={"subtitle2"} fontWeight={700}>
                    Organization -
                  </Typography>
                  <Typography variant={"subtitle2"} fontWeight={600}>
                    {studentDetails?.organizationId?.name}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  padding={2}
                >
                  <Typography variant={"subtitle2"} fontWeight={700}>
                    Total Driven
                  </Typography>
                  <Typography variant={"subtitle2"} fontWeight={600}>
                    {totalKmDriven} KM
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  padding={2}
                >
                  <Typography variant={"subtitle2"} fontWeight={700}>
                    Registered On -
                  </Typography>
                  <Typography variant={"subtitle2"} fontWeight={600}>
                    {studentDetails.createdAt &&
                      format(
                        new Date(studentDetails?.createdAt),
                        "MMM dd, yyyy"
                      )}
                  </Typography>
                </Box>
                <Divider />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          display='flex'
          flex='1 1 auto'
          overflow='hidden'
          paddingLeft={{ md: "256px" }}
        >
          <Box display='flex' flex='1 1 auto' overflow='hidden'>
            <Box flex='1 1 auto' height='100%' overflow='auto'>
              <TableComponent
                data={attendanceList}
                columns={columns}
                title='Attendance'
              />
              <Divider />
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default ViewStudent;

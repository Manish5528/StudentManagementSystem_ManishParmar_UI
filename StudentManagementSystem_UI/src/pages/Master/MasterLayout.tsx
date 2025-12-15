import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button, Box, Typography, Stack, Paper } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
 
export default function MasterLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const handleStudentClick = () => {
    navigate("/master/students");
  };
  const handleCourseClick = () => {
    navigate("/master/classes");
  };
 
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <Paper
        elevation={3}
        sx={{
          width: 240,
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={4} align="center">
          Dashboard
        </Typography>
 
        <Stack spacing={2} flexGrow={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStudentClick}
            fullWidth
          >
            Students
          </Button>
 
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCourseClick}
            fullWidth
          >
            Courses
          </Button>
           <Button
          variant="contained"
          color="error"
          onClick={logout}
          sx={{ mt: 4 }}
          fullWidth
        >
          Logout
        </Button>
        </Stack>
 
       
      </Paper>
 
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
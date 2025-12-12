import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button, Box, Typography } from "@mui/material";

export default function MasterLayout() {
  const { logout } = useContext(AuthContext);

  return (
    <Box p={4}>
      <Typography variant="h4">Master Page</Typography>

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
}

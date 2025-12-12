import { useEffect, useState } from "react";
import { courseApi } from "../../api/courseApi";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import ClassImportModal from "./CourseImportModal";

interface ClassType {
  id: string;
  name: string;
  description: string;
}

export default function CourseList() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [openImport, setOpenImport] = useState(false);

const loadData = async () => {
  try {
    const res = await courseApi.getAll();
    setClasses(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadData(); 
}, []);


  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Classes
      </Typography>

      <Button variant="contained" onClick={() => setOpenImport(true)}>
        Import CSV
      </Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ClassImportModal
        open={openImport}
        onClose={() => setOpenImport(false)}
        refresh={loadData}
      />
    </Box>
  );
}

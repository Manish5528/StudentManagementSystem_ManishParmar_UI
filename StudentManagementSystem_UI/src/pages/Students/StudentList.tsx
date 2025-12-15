import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { studentApi } from "../../api/studentApi";
import StudentForm from "./StudentForm";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
 
export default function StudentList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [students, setStudents] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
 
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("FirstName");
  const [asc, setAsc] = useState(true);
 
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
 
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await studentApi.getAll({
        page: page + 1,
        pageSize,
        search,
        sortBy,
        asc,
      });
 
      setStudents(res.data.items);
      setTotal(res.data.total);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    loadData();
  }, [page, pageSize, search, sortBy, asc]);
 
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this student?")) return;
 
    try {
      await studentApi.delete(id);
      loadData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };
 
  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "phoneNumber", headerName: "Phone", width: 150 },
    { field: "emailId", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              setEditId(params.row.id);
              setOpenForm(true);
            }}
          >
            <EditIcon />
          </IconButton>
 
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
 
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Students
      </Typography>
 
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
 
        <Button
          variant="contained"
          onClick={() => {
            setEditId(null);
            setOpenForm(true);
          }}
        >
          Add Student
        </Button>
      </Box>
 
      <div style={{ height: 500 }}>
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          rowCount={total}
          paginationMode="server"
          sortingMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          onSortModelChange={(model) => {
            if (model.length > 0) {
              setSortBy(model[0].field);
              setAsc(model[0].sort === "asc");
            }
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>
 
      <StudentForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        refresh={loadData}
        editId={editId}
      />
    </Box>
  );
}
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { courseApi } from "../../api/courseApi";

export default function ClassImportModal({
  open,
  onClose,
  refresh,
}: {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const handleImport = async () => {
    if (!file) return alert("Please select a file");

    if (file.size > 5 * 1024 * 1024) {
      return alert("File too large! Maximum allowed size is 5MB.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await courseApi.importCSV(formData);
      alert("Import successful!");
      refresh();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err?.response?.data?.message || "Import failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Import CSV</DialogTitle>
      <DialogContent>
        <Typography>Select a CSV file to import classes.</Typography>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginTop: 20 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleImport}>
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { studentApi, type StudentPayload } from "../../api/studentApi";
import { courseApi } from "../../api/courseApi";

interface ClassType {
  id: string;
  name: string;
  description: string;
}

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
  editId: string | null;
}

const schema: Yup.ObjectSchema<StudentPayload> = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone Number is required"),
  emailId: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  courseIds: Yup.array()
    .of(Yup.string().required())
    .min(1, "Select at least one class")
    .required(),
});



export default function StudentForm({
  open,
  onClose,
  refresh,
  editId,
}: StudentFormProps) {
  const [classList, setClassList] = useState<ClassType[]>([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailId: "",
      courseIds: [],
    },
  });

  const loadClasses = useCallback(async () => {
    try {
      const res = await courseApi.getAll();
      setClassList(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadEditData = useCallback(async () => {
    if (!editId) {
      reset();
      return;
    }

    try {
      const res = await studentApi.getById(editId);
      reset(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [editId, reset]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadClasses();
      loadEditData();
    }
  }, [open, loadClasses, loadEditData]);

  const onSubmit: SubmitHandler<StudentPayload> = async (data) => {
    try {
      if (editId) {
        await studentApi.update(editId, data);
      } else {
        await studentApi.create(data);
      }
      refresh();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editId ? "Edit Student" : "Add Student"}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="First Name"
          margin="dense"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        <TextField
          fullWidth
          label="Last Name"
          margin="dense"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <TextField
          fullWidth
          label="Phone Number"
          margin="dense"
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <TextField
          fullWidth
          label="Email"
          margin="dense"
          {...register("emailId")}
          error={!!errors.emailId}
          helperText={errors.emailId?.message}
        />

        <FormControl
          fullWidth
          margin="dense"
          error={!!errors.courseIds}
        >
          <InputLabel id="class-label">Classes</InputLabel>

          <Controller
            name="courseIds"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="class-label"
                multiple
                value={field.value ?? []}
                input={<OutlinedInput label="Classes" />}
                renderValue={(selected) => (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {(selected as string[]).map((id) => {
                      const cls = classList.find((c) => c.id === id);
                      return <Chip key={id} label={cls?.name} />;
                    })}
                  </div>
                )}
              >
                {classList.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

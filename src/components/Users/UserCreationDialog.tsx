"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";

const roles = ["Admin", "Editor", "Viewer"];

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface UserCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    id?: string;
    name: string;
    email: string;
    password?: string;
    phone: string;
    role: string;
  }) => void;
  initialData?: User | null; // Null when creating a new user
}

const UserCreationDialog: React.FC<UserCreationDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const formik = useFormik({
    enableReinitialize: true, // Ensure form updates when initialData changes
    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: "",
      phone: initialData?.phone || "",
      role: initialData?.role || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .when([], {
          is: () => !isEditing,
          then: (schema) => schema.required("Password is required when creating a new user"),
        }),
      phone: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      onSubmit(isEditing ? { ...values, id: initialData?.id } : values);
      onClose();
    },
  });
  console.log(initialData);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit User" : "Create User"}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="dense"
            disabled={isEditing} // Prevent email change when editing
          />
          {!isEditing && (
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="dense"
            />
          )}
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            margin="dense"
          />
          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            margin="dense"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserCreationDialog;
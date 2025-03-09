"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, useMediaQuery } from "@mui/material";
import { Add, Edit, Receipt } from "@mui/icons-material";
import UserCreationDialog from "./UserCreationDialog";
import axios from "axios";
import Swal from "sweetalert2";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type UserListProps = {
  users: User[];
  onDelete: (id: string) => void;
};

const UserList = ({ users, onDelete }: UserListProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [pageSize, setPageSize] = useState(8);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    if (![8, 20, 50].includes(pageSize)) {
      setPageSize(8);
    }
  }, [pageSize]);

  const handleOpenEditDialog = (user: User) => {
    setEditingUser(user);
    setOpen(true);
  };

  async function handleCreateUser(values: { name: string; email: string; password?: string; phone?: string; role: string; id?: string }): Promise<void> {
    try {
      if (values.id) {
        // Update existing user
        await axios.put(`/api/users/${values.id}`, values);
        Swal.fire({
          icon: "success",
          title: "User Updated",
          text: `User ${values.name} has been successfully updated!`,
          confirmButtonColor: "#4CAF50",
        });
      } else {
        // Create new user
        await axios.post("/api/users", values);
        Swal.fire({
          icon: "success",
          title: "User Created",
          text: `User ${values.name} has been successfully created!`,
          confirmButtonColor: "#4CAF50",
        });
      }

      console.log("User operation successful:", values);
      setOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error creating/updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: isMobile ? 80 : 150 },
    { field: "name", headerName: "Name", width: isMobile ? 120 : 200 },
    { field: "email", headerName: "Email", width: isMobile ? 180 : 250 },
    { field: "role", headerName: "Role", width: isMobile ? 100 : 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 150 : 200,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <Button variant="contained" color="primary" size="small" startIcon={<Edit />} onClick={() => handleOpenEditDialog(params.row)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={() => onDelete(params.row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <UserCreationDialog open={open} onClose={() => setOpen(false)} onSubmit={handleCreateUser} initialData={editingUser} />
      <section className="mx-10 p-2">
        <div className="mx-2 my-5 flex justify-between items-center mt-5">
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <Receipt />
            <span>All Team Members</span>
          </div>

          <Button
            onClick={() => {
              setEditingUser(null);
              setOpen(true);
            }}
            variant="contained"
            className="!bg-theme"
            startIcon={<Add />}
          >
            CREATE
          </Button>
        </div>

        <div className="w-full" style={{ height: 500, backgroundColor: "#fff", borderRadius: "8px" }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[8, 20, 50]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize: React.SetStateAction<number>) => setPageSize(newPageSize)}
            pagination
            disableRowSelectionOnClick
            autoHeight
            sx={{
              "& .MuiDataGrid-root": { backgroundColor: "#fff", borderRadius: "8px" },
              "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5" },
              "& .MuiDataGrid-cell": { fontSize: isMobile ? "12px" : "14px" },
              "& .MuiDataGrid-footerContainer": { backgroundColor: "#f5f5f5" },
            }}
          />
        </div>
      </section>
    </>
  );
};

export default UserList;
"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, Typography, TextField, MenuItem, Button } from "@mui/material";
import Swal from "sweetalert2";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];

const validationSchema = Yup.object({
  product: Yup.string().required("Product is required"),
  customerName: Yup.string().required("Customer name is required"),
  customerEmail: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
});

const OrderForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      product: "",
      customerName: "",
      customerEmail: "",
      address: "",
      quantity: 1,
    },
    validationSchema,
    onSubmit: (values) => {
      Swal.fire({
        title: "Success",
        text: "Order placed successfully!",
        icon: "success",
      });
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextField
        select
        label="Select Product"
        name="product"
        value={formik.values.product}
        onChange={formik.handleChange}
        error={formik.touched.product && Boolean(formik.errors.product)}
        helperText={formik.touched.product && formik.errors.product}
      >
        {products.map((product) => (
          <MenuItem key={product.id} value={product.name}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Customer Name"
        name="customerName"
        value={formik.values.customerName}
        onChange={formik.handleChange}
        error={formik.touched.customerName && Boolean(formik.errors.customerName)}
        helperText={formik.touched.customerName && formik.errors.customerName}
      />
      <TextField
        label="Customer Email"
        type="email"
        name="customerEmail"
        value={formik.values.customerEmail}
        onChange={formik.handleChange}
        error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
        helperText={formik.touched.customerEmail && formik.errors.customerEmail}
      />
      <TextField
        label="Shipping Address"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
      />
      <TextField
        label="Quantity"
        type="number"
        name="quantity"
        value={formik.values.quantity}
        onChange={formik.handleChange}
        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
        helperText={formik.touched.quantity && formik.errors.quantity}
        inputProps={{ min: 1 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Place Order
      </Button>
    </form>
  );
};

export default function CreateOrder() {
  const handleSubmit = (order) => {
    console.log("Order Details:", order);
  };
  const links = [
    { id: 1, page: "Product Dashboard", link: "/products" },
    // { id: 2, page: "Promissory-Note", link: "/promissory-note" },
  ];
  
  return (
    // <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "16px" }}>
    //   <Card style={{ width: "100%", maxWidth: "500px", padding: "24px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
    //     <CardHeader title={<Typography variant="h5">Create Order</Typography>} />
    //     <CardContent>
    //       <OrderForm onSubmit={handleSubmit} />
    //     </CardContent>
    //   </Card>
    // </div>
    <MainLayout title="Create Order">
      <>
      <div className="px-2 md:px-0 ml-14 mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>
      </>
    </MainLayout>
  );
}
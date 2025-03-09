"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Box, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { ROLE } from "@/constants/role.constants";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      // const response = await axios.post("http://localhost:5000/api/auth/login", values);

      // const userData = { email: response.data.email, role: response.data.role };
      const userData = {
        email: 'himadrinayak2702@gmail.com',
        role: ROLE.ADMIN
      }
      login(userData); // Store user in context
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Sign In</Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
import {
    Container,
    Typography,
    Paper,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip, Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import CircularProgress
    from "@mui/material/CircularProgress";

import IconButton from "@mui/material/IconButton";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);

            const res = await api.get("/customers");

            setCustomers(res.data);
        } finally {
            setLoading(false);
        }
    };

    const createCustomer = async (e) => {

        await api.post("/customers", formData);

        setFormData({
            full_name: "",
            email: "",
            phone: ""
        });

        fetchCustomers();
    };

    const deleteCustomer = async (id) => {

        const confirmed =
            window.confirm(
                "Delete this customer?"
            );

        if (!confirmed) return;

        await api.delete(`/customers/${id}`);

        fetchCustomers();
    };

    if (loading) {
        return (
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Typography
                variant="h4"
                sx={{ mb: 3, mt: 3 }}
            >
                Customers Management
            </Typography>
            <Card sx={{ mb: 4 }}>
                <CardContent>

                    <Typography
                        variant="h6"
                        sx={{ mb: 2 }}
                    >
                        Add Customer
                    </Typography>

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                value={formData.full_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        full_name: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ height: "56px" }}
                                onClick={createCustomer}
                            >
                                Add
                            </Button>
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>

            <TableContainer component={Paper}>
                <Table stickyHeader>

                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {customers.map((customer) => (
                            <TableRow key={customer.id}>

                                <TableCell>
                                    {customer.id}
                                </TableCell>

                                <TableCell>
                                    {customer.full_name}
                                </TableCell>

                                <TableCell>
                                    {customer.email}
                                </TableCell>

                                <TableCell>
                                    {customer.phone}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteCustomer(customer.id)}
                                        sx={{ ml: 2 }}
                                    >
                                        Delete
                                    </Button>

                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>

                </Table>
            </TableContainer>
        </Container >
    );
}
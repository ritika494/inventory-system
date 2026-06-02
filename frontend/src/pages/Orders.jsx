import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const [customers, setCustomers] = useState([]);

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        customer_id: "",
        product_id: "",
        quantity: ""
    });

    useEffect(() => {
        fetchOrders();
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);

        const res =
            await api.get("/orders");

        setOrders(res.data);

        setLoading(false);
    };

    const fetchCustomers = () => {
        api
            .get("/customers")
            .then((res) => setCustomers(res.data));
    };

    const fetchProducts = () => {
        api
            .get("/products")
            .then((res) => setProducts(res.data));
    };

    const createOrder = async () => {

        try {

            await api.post("/orders", {
                customer_id: Number(
                    formData.customer_id
                ),
                product_id: Number(
                    formData.product_id
                ),
                quantity: Number(
                    formData.quantity
                )
            });

            setFormData({
                customer_id: "",
                product_id: "",
                quantity: ""
            });

            fetchOrders();
            fetchProducts();

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Order creation failed"
            );

        }
    };

    const deleteOrder = async (id) => {

        const confirmed = window.confirm(
            "Delete this order?"
        );

        if (!confirmed) return;

        try {

            await api.delete(`/orders/${id}`);

            fetchOrders();
            fetchProducts();

        } catch (error) {

            console.error(error);

        }
    };

    const getCustomerName = (id) =>
        customers.find(
            (c) => c.id === id
        )?.full_name || id;

    const getProductName = (id) =>
        products.find(
            (p) => p.id === id
        )?.name || id;

    const selectedProduct = products.find(
        p =>
            p.id === Number(
                formData.product_id
            )
    );


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
                Orders Management
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>

                    <Typography
                        variant="h6"
                        sx={{ mb: 2 }}
                    >
                        Create Order
                    </Typography>

                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                select
                                fullWidth
                                label="Customer"
                                value={formData.customer_id}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        customer_id: e.target.value
                                    })
                                }
                            >
                                {customers.map((customer) => (
                                    <MenuItem
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.full_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                select
                                fullWidth
                                label="Product"
                                value={formData.product_id}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        product_id: e.target.value
                                    })
                                }
                            >
                                {products.map((product) => (
                                    <MenuItem
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name}
                                        {" ("}
                                        {product.quantity}
                                        {" left)"}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantity"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quantity: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={createOrder}
                                sx={{ height: "56px" }}
                            >
                                Create
                            </Button>
                        </Grid>

                    </Grid>

                    {selectedProduct && (

                        <Typography
                            sx={{
                                mt: 2,
                                color: "text.secondary"
                            }}
                        >
                            Available Stock:
                            {" "}
                            {selectedProduct.quantity}
                        </Typography>

                    )}

                </CardContent>
            </Card>

            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table stickyHeader>

                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {orders.map((order) => (
                            <TableRow key={order.id}>

                                <TableCell>
                                    {order.id}
                                </TableCell>

                                <TableCell>
                                    {getCustomerName(
                                        order.customer_id
                                    )}
                                </TableCell>

                                <TableCell>
                                    {getProductName(
                                        order.product_id
                                    )}
                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={`${order.quantity} units`}
                                        color="primary"
                                        variant="outlined"
                                    />

                                </TableCell>

                                <TableCell>
                                    ₹{order.total_amount}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            deleteOrder(order.id)
                                        }
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
        </Container>
    );
}
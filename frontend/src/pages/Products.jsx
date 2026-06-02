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

import { useEffect, useState } from "react";
import api from "../services/api";
import { useSnackbar } from "notistack";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        quantity: ""
    });
    const [loading, setLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({
        id: "",
        name: "",
        sku: "",
        price: "",
        quantity: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);

        const res = await api.get("/products");
        setProducts(res.data);
        setLoading(false);
    };

    const createProduct = async () => {
        try {

            await api.post("/products", {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            });

            enqueueSnackbar(
                "Product Created Successfully",
                {
                    variant: "success"
                }
            );

            setFormData({
                name: "",
                sku: "",
                price: "",
                quantity: ""
            });

            fetchProducts();

        } catch (error) {

            enqueueSnackbar(
                error.response?.data?.detail ||
                "Failed to create product",
                {
                    variant: "error"
                }
            );
        }
    };

    const updateProduct = async () => {
        try {

            await api.put(
                `/products/${selectedProduct.id}`,
                {
                    name: selectedProduct.name,
                    sku: selectedProduct.sku,
                    price: Number(selectedProduct.price),
                    quantity: Number(
                        selectedProduct.quantity
                    )
                }
            );

            enqueueSnackbar(
                "Product Updated",
                {
                    variant: "success"
                }
            );

            setOpen(false);

            fetchProducts();

        } catch (error) {

            enqueueSnackbar(
                error.response?.data?.detail ||
                "Update Failed",
                {
                    variant: "error"
                }
            );
        }
    };

    const deleteProduct = async (id) => {
        const confirmed = window.confirm(
            "Delete this product?"
        );

        if (!confirmed) return;

        try {

            await api.delete(`/products/${id}`);

            enqueueSnackbar(
                "Product Deleted",
                {
                    variant: "success"
                }
            );

            fetchProducts();

        } catch {
            enqueueSnackbar(
                "Delete Failed",
                {
                    variant: "error"
                }
            );
        }
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
                Products Management
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>

                    <Typography
                        variant="h6"
                        sx={{ mb: 2 }}
                    >
                        Add Product
                    </Typography>

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                label="Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                label="SKU"
                                value={formData.sku}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        sku: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Price"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
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
                                sx={{ height: "56px" }}
                                onClick={createProduct}
                            >
                                Add
                            </Button>
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>

            <TableContainer component={Paper} sx={{ mb: 4 }}>
                {products.length === 0 && (
                    <Typography
                        align="center"
                        sx={{ mt: 4 }}
                    >
                        No products found.
                    </Typography>
                )}
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {products.map((product) => (
                            <TableRow key={product.id}>

                                <TableCell>
                                    {product.name}
                                </TableCell>

                                <TableCell>
                                    {product.sku}
                                </TableCell>

                                <TableCell>
                                    ₹{product.price}
                                </TableCell>

                                <TableCell>
                                    {product.quantity < 10 ? (
                                        <Chip
                                            label={`Low (${product.quantity})`}
                                            color="warning"
                                        />
                                    ) : (
                                        <Chip
                                            label={`In Stock (${product.quantity})`}
                                            color="success"
                                        />
                                    )}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setOpen(true);
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteProduct(product.id)}
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
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle color="primary">
                    Edit Product
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        value={selectedProduct.name}
                        onChange={(e) =>
                            setSelectedProduct({
                                ...selectedProduct,
                                name: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="SKU"
                        value={selectedProduct.sku}
                        onChange={(e) =>
                            setSelectedProduct({
                                ...selectedProduct,
                                sku: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Price"
                        type="number"
                        value={selectedProduct.price}
                        onChange={(e) =>
                            setSelectedProduct({
                                ...selectedProduct,
                                price: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Quantity"
                        type="number"
                        value={selectedProduct.quantity}
                        onChange={(e) =>
                            setSelectedProduct({
                                ...selectedProduct,
                                quantity: e.target.value
                            })
                        }
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setOpen(false)
                        }
                        color="inherit"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={updateProduct}
                    >
                        Save Changes
                    </Button>

                </DialogActions>

            </Dialog>
        </Container>
    );
}
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@mui/material";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1,
            textAlign: "left"
           }}
        >
          Inventory System
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/products"
        >
          Products
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/customers"
        >
          Customers
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/orders"
        >
          Orders
        </Button>

      </Toolbar>
    </AppBar>
  );
}
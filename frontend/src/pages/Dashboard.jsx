import {
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) =>
        setStats(res.data)
      );
  }, []);

  if (!stats) return <h2>Loading...</h2>;

  return (
    <Grid
      container
      spacing={3}
      sx={{ p: 4 }}
    >

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Products
            </Typography>

            <Typography variant="h3">
              {stats.total_products}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Customers
            </Typography>

            <Typography variant="h3">
              {stats.total_customers}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Orders
            </Typography>

            <Typography variant="h3">
              {stats.total_orders}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Low Stock
            </Typography>

            <Typography variant="h3">
              {stats.low_stock_products}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}
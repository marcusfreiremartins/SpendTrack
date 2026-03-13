import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const pages = [
    { label: "Pessoas", path: "/persons" },
    { label: "Categorias", path: "/categories" },
    { label: "Transações", path: "/transactions" },
    { label: "Relatórios", path: "/reports" },
];

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 0, mr: 4 }}>
                    SpendTrack
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    {pages.map((page) => (
                        <Button
                            key={page.path}
                            color="inherit"
                            onClick={() => navigate(page.path)}
                            sx={{
                                fontWeight: location.pathname === page.path ? "bold" : "normal",
                                borderBottom: location.pathname === page.path ? "2px solid white" : "none",
                            }}
                        >
                            {page.label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
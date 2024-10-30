import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import WarningIcon from '@mui/icons-material/Warning';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';
import MedicationIcon from '@mui/icons-material/Medication';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';



function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path) => navigate(path);

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f0f0f0' }}>
      {sidebarOpen && (
        <Box
          sx={{
            width: 300,
            bgcolor: '#E8E8E8',
            minHeight: '100vh',
            borderRight: '1px solid #ddd',
            color: '#000',
          }}
        >
          <Card sx={{ margin: 2, bgcolor: '#FAFAFA', border: '5px solid #ddd', borderRadius: '12px' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <InventoryIcon  sx={{ mr: 1, color: '#000' }} />
              <Typography variant="h6" sx={{ color: '#000' }}>
                Gestion de stock
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ margin: 2, bgcolor: '#FAFAFA', border: '5px solid #ddd', borderRadius: '12px' }}>
            <CardContent>
              <List>
                {[
                { text: 'Tableau de bord', icon: <DashboardIcon /> },
                { text: 'Listes des Médicaments', icon: <MedicationIcon />, path: '/' },
                { text: 'Entrées de Stock', icon: <Inventory2Icon />, path: '/entrees' },
                { text: 'Sorties de Stock', icon: <LocalShippingIcon />, path: '/sorties' },
                { text: 'Entrées/Sorties', icon: <SyncAltIcon />, path: '/entreesortie' },
                
                ].map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      '&:hover': {
                        bgcolor: '#BDBDBD',
                        borderRadius: '12px',
                      },
                      padding: '4px 16px',
                    }}
                  >
                    <ListItemIcon sx={{ color: '#000' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} sx={{ '& span': { color: '#000' } }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: '#F5F5F5',
            color: '#000',
            boxShadow: 'none',
            border: '5px solid #ddd',
            borderRadius: '12px',
            marginBottom: 3,
          }}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tableau de bord
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3}>
          {/* Card pour les alertes de médicaments en rupture */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#FFF3E0', borderRadius: '12px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Médicaments en rupture
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <WarningIcon sx={{ color: '#FF9800' }} /> 3 Médicaments en rupture
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card pour le stock total de médicaments */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#E3F2FD', borderRadius: '12px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Stock total de médicaments
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <InventoryIcon sx={{ color: '#2196F3' }} /> 1500 unités en stock
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card pour les médicaments arrivant à expiration */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#FFEBEE', borderRadius: '12px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Médicaments proches de l'expiration
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <DateRangeIcon sx={{ color: '#F44336' }} /> 5 Médicaments expirant bientôt
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tableau des transactions récentes */}
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
            Transactions récentes
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom du médicament</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Exemple de données */}
                {[
                  { name: 'Paracétamol', type: 'Entrée', quantity: 100, date: '2024-10-28' },
                  { name: 'Ibuprofène', type: 'Sortie', quantity: 50, date: '2024-10-27' },
                  { name: 'Aspirine', type: 'Entrée', quantity: 200, date: '2024-10-26' },
                ].map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;

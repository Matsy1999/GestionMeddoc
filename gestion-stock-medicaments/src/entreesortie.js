import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MedicationIcon from '@mui/icons-material/Medication';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function EntreesSorties() {
  const [entrees, setEntrees] = useState([]);
  const [sorties, setSorties] = useState([]);

  const fetchEntrees = async () => {
    try {
      const response = await axios.get('http://localhost:2000/entrees');
      setEntrees(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des entrées:', error);
    }
  };

  const fetchSorties = async () => {
    try {
      const response = await axios.get('http://localhost:2000/sorties');
      setSorties(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des sorties:', error);
    }
  };

  useEffect(() => {
    fetchEntrees();
    fetchSorties();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path) => navigate(path);

  const generatePDF = () => {
    // Code pour générer le PDF à ajouter ici
    console.log('Génération du PDF');
  };

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
                 { text: 'Tableau de bord', icon: <DashboardIcon />,path:'/dashboard' },
                 { text: 'Listes des Médicaments', icon: <MedicationIcon />, path: '/' },
                 { text: 'Entrées de Stock', icon: <Inventory2Icon />, path: '/entrees' },
                 { text: 'Sorties de Stock', icon: <LocalShippingIcon />, path: '/sorties' },
                 { text: 'Entrées/Sorties', icon: <SyncAltIcon />},
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
              Entrées et Sorties
            </Typography>
          </Toolbar>
        </AppBar>

        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Entrées de Médicaments
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Médicament ID</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entrees.map((medicament) => (
                <TableRow key={medicament.id}>
                  <TableCell>{medicament.id}</TableCell>
                  <TableCell>{medicament.medicament_id}</TableCell>
                  <TableCell>{medicament.quantite}</TableCell>
                  <TableCell>{new Date(medicament.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
          Sorties de Médicaments
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Médicament ID</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorties.map((medicament) => (
                <TableRow key={medicament.id}>
                  <TableCell>{medicament.id}</TableCell>
                  <TableCell>{medicament.medicament_id}</TableCell>
                  <TableCell>{medicament.quantite}</TableCell>
                  <TableCell>{new Date(medicament.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 4 }} 
          onClick={generatePDF}
        >
          Générer PDF
        </Button>
      </Box>
    </Box>
  );
}

export default EntreesSorties;

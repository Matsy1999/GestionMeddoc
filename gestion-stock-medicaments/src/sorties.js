import React, { useState, useEffect } from 'react'; 
import ChecklistIcon from '@mui/icons-material/Checklist';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import MedicationIcon from '@mui/icons-material/Medication';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';

function AjouterSortie() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [medicaments, setMedicaments] = useState([]);
  const [formData, setFormData] = useState({
    medicament_id: '',
    quantite: '',
    date: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path) => navigate(path);

  const fetchMedicaments = async () => {
    const response = await axios.get('http://localhost:2000/sorties');
    setMedicaments(response.data);
  };

  useEffect(() => {
    fetchMedicaments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        const confirmEdit = window.confirm('Êtes-vous sûr de vouloir modifier cette sortie?');
        if (confirmEdit) {
          await axios.put(`http://localhost:2000/sorties/${formData.id}`, formData);
          setSnackbarMessage('Médicament mis à jour avec succès');
        }
      } else {
        await axios.post('http://localhost:2000/sorties', formData);
        setSnackbarMessage('Sortie ajoutée avec succès');
      }
      setOpenDialog(false);
      fetchMedicaments();
      setSnackbarOpen(true);
      setFormData({
        medicament_id: '',
        quantite: '',
        date: '',
      });
    } catch (error) {
      setSnackbarMessage('Erreur lors de l\'ajout de la sortie');
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (medicament) => {
    setFormData(medicament);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette sortie?');
    if (confirmDelete) {
      await axios.delete(`http://localhost:2000/sorties/${id}`);
      setSnackbarMessage('Sortie supprimée avec succès');
      fetchMedicaments();
      setSnackbarOpen(true);
    }
  };

  const handleDialogOpen = () => {
    setFormData({
      medicament_id: '',
      quantite: '',
      date: '',
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Liste des Sorties de Médicaments', 14, 16);
    doc.autoTable({
      head: [['Médicament ID', 'Quantité', 'Date']],
      body: medicaments.map(medicament => [medicament.medicament_id, medicament.quantite, medicament.date]),
    });
    doc.save('sorties_medicamenteuses.pdf');
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
                  { text: 'Sorties de Stock', icon: <LocalShippingIcon /> },
                  { text: 'Entrées/Sorties', icon: <SyncAltIcon />, path:'/entreesortie'},
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
              Medicaments sortant  
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 1 }}>
          <Card sx={{ marginBottom: 1, border: '5px solid #ddd', borderRadius: '12px' }}>
            <CardContent>
              <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Enregistrer une sortie 
              </Button>
              <Button variant="contained" color="secondary" onClick={generatePDF}>
                Générer PDF
              </Button>

              <Box sx={{ padding: 1, maxHeight: 400, overflowY: 'auto', position: 'relative' }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Médicament ID</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {medicaments.map((medicament) => (
                        <TableRow key={medicament.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                          <TableCell>{medicament.medicament_id}</TableCell>
                          <TableCell>{medicament.quantite}</TableCell>
                          <TableCell>{medicament.date}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                              <Button variant="outlined" onClick={() => handleEdit(medicament)}>
                                Modifier
                              </Button>
                              <Button variant="outlined" color="secondary" onClick={() => handleDelete(medicament.id)}>
                                Supprimer
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>{formData.id ? 'Modifier Sortie' : 'Ajouter Sortie'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="medicament_id"
              label="Médicament ID"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.medicament_id}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="quantite"
              label="Quantité"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.quantite}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              value={formData.date}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Annuler</Button>
            <Button onClick={handleSubmit}>{formData.id ? 'Modifier' : 'Ajouter'}</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AjouterSortie;

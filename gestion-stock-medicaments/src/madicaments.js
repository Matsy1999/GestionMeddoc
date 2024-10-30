import React, { useState, useEffect } from 'react';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import MedicationIcon from '@mui/icons-material/Medication';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';

function Medicaments() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [medicaments, setMedicaments] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    date_expiration: '',
    prix_unitaire: '',
    categorie: '',
    forme_pharmaceutique: '',
    famille: '',
    concentration: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [medicamentToDelete, setMedicamentToDelete] = useState(null);
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path) => navigate(path);

  const fetchMedicaments = async () => {
    const response = await axios.get('http://localhost:2000/medicaments');
    setMedicaments(response.data);
  };

  useEffect(() => {
    fetchMedicaments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.id) {
      setConfirmEditOpen(true); // Ouvre la confirmation avant modification
    } else {
      await axios.post('http://localhost:2000/medicaments', formData);
      setSnackbarMessage('Médicament ajouté avec succès');
      setSnackbarOpen(true);
      setOpenDialog(false);
      fetchMedicaments();
      resetForm();
    }
  };

  const handleEdit = (medicament) => {
    setFormData(medicament);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setMedicamentToDelete(id);
    setConfirmDeleteOpen(true); // Ouvre la confirmation avant suppression
  };

  const confirmDeleteMedicament = async () => {
    await axios.delete(`http://localhost:2000/medicaments/${medicamentToDelete}`);
    setSnackbarMessage('Médicament supprimé avec succès');
    fetchMedicaments();
    setSnackbarOpen(true);
    setConfirmDeleteOpen(false);
  };

  const confirmEditMedicament = async () => {
    await axios.put(`http://localhost:2000/medicaments/${formData.id}`, formData);
    setSnackbarMessage('Médicament mis à jour avec succès');
    setSnackbarOpen(true);
    setConfirmEditOpen(false);
    setOpenDialog(false);
    fetchMedicaments();
    resetForm();
  };

  const handleDialogOpen = () => {
    setFormData({
      id: '',
      nom: '',
      date_expiration: '',
      prix_unitaire: '',
      categorie: '',
      forme_pharmaceutique: '',
      famille: '',
      concentration: ''
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      nom: '',
      date_expiration: '',
      prix_unitaire: '',
      categorie: '',
      forme_pharmaceutique: '',
      famille: '',
      concentration: ''
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Liste des Médicaments', 14, 22);
    
    // Ajouter un tableau avec les médicaments
    doc.autoTable({
      head: [['Nom', 'Date d\'Expiration', 'Prix Unitaire', 'Catégorie', 'Forme Pharmaceutique', 'Famille', 'Concentration']],
      body: medicaments.map((medicament) => [
        medicament.nom,
        medicament.date_expiration,
        `${medicament.prix_unitaire} €`,
        medicament.categorie,
        medicament.forme_pharmaceutique,
        medicament.famille,
        medicament.concentration,
      ]),
      startY: 30,
    });
    
    doc.save('medicaments.pdf');
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
              <InventoryIcon sx={{ mr: 1, color: '#000' }} />
              <Typography variant="h6" sx={{ color: '#000' }}>
                Gestion de stock
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ margin: 2, bgcolor: '#FAFAFA', border: '5px solid #ddd', borderRadius: '12px' }}>
            <CardContent>
              <List>
                {[
                 { text: 'Tableau de bord', icon: <DashboardIcon />, path:'/dashboard' },
                 { text: 'Listes des Médicaments', icon: <MedicationIcon />, path: '/' },
                 { text: 'Entrées de Stock', icon: <Inventory2Icon />, path: '/entrees' },
                 { text: 'Sorties de Stock', icon: <LocalShippingIcon />, path: '/sorties' },
                 { text: 'Entrées/Sorties', icon: <SyncAltIcon /> },
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
              Liste des medicaments disponible
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 1, width: 1100 }}>
          <Card sx={{ marginBottom: 1, marginTop: 0, border: '5px solid #ddd', borderRadius: '12px' }}>
            <CardContent>
              <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Ajouter Médicament
              </Button>
              <Button variant="contained" color="secondary" onClick={generatePDF} sx={{ marginLeft: 2 }}>
                Générer PDF
              </Button>

              <Box sx={{ padding: 1, maxHeight: 400, overflowY: 'auto' }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Date d'Expiration</TableCell>
                        <TableCell>Prix Unitaire</TableCell>
                        <TableCell>Catégorie</TableCell>
                        <TableCell>Forme Pharmaceutique</TableCell>
                        <TableCell>Famille</TableCell>
                        <TableCell>Concentration</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {medicaments.map((medicament) => (
                        <TableRow key={medicament.id}>
                          <TableCell>{medicament.id}</TableCell>
                          <TableCell>{medicament.nom}</TableCell>
                          <TableCell>{medicament.date_expiration}</TableCell>
                          <TableCell>{medicament.prix_unitaire} €</TableCell>
                          <TableCell>{medicament.categorie}</TableCell>
                          <TableCell>{medicament.forme_pharmaceutique}</TableCell>
                          <TableCell>{medicament.famille}</TableCell>
                          <TableCell>{medicament.concentration}</TableCell>
                          <TableCell>
                            <Button variant="outlined" color="primary" onClick={() => handleEdit(medicament)}>
                              Modifier
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(medicament.id)} sx={{ marginLeft: 1 }}>
                              Supprimer
                            </Button>
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
          <DialogTitle>{formData.id ? 'Modifier Médicament' : 'Ajouter Médicament'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="nom"
              label="Nom"
              type="text"
              fullWidth
              value={formData.nom}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="date_expiration"
              label="Date d'Expiration"
              type="date"
              fullWidth
              value={formData.date_expiration}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="prix_unitaire"
              label="Prix Unitaire"
              type="number"
              fullWidth
              value={formData.prix_unitaire}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="categorie"
              label="Catégorie"
              type="text"
              fullWidth
              value={formData.categorie}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="forme_pharmaceutique"
              label="Forme Pharmaceutique"
              type="text"
              fullWidth
              value={formData.forme_pharmaceutique}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="famille"
              label="Famille"
              type="text"
              fullWidth
              value={formData.famille}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="concentration"
              label="Concentration"
              type="text"
              fullWidth
              value={formData.concentration}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Annuler</Button>
            <Button onClick={handleSubmit}>{formData.id ? 'Modifier' : 'Ajouter'}</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
          <DialogTitle>Confirmation de Suppression</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer ce médicament ?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteOpen(false)}>Annuler</Button>
            <Button onClick={confirmDeleteMedicament} color="error">Supprimer</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmEditOpen} onClose={() => setConfirmEditOpen(false)}>
          <DialogTitle>Confirmation de Modification</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir modifier ce médicament ?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmEditOpen(false)}>Annuler</Button>
            <Button onClick={confirmEditMedicament} color="primary">Modifier</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default Medicaments;

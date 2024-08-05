"use client";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const PANTRY_COLLECTION = "items";

function DisplayPantries({ items, fetchPantryItems }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async () => {
    if (selectedItem && selectedItem.id) {
      try {
        const itemDoc = doc(db, PANTRY_COLLECTION, selectedItem.id);
        await updateDoc(itemDoc, {
          name: selectedItem.name,
          quantity: selectedItem.quantity,
        });
        console.log("Item updated with ID:", selectedItem.id);
        fetchPantryItems(selectedItem.userId);
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
    setOpen(false);
  };

  const handleDelete = async (item) => {
    if (item.id) {
      try {
        const itemDoc = doc(db, PANTRY_COLLECTION, item.id);
        await deleteDoc(itemDoc);
        console.log(`Item deleted with ID: `, item.id);
        fetchPantryItems(item.userId);
      } catch (error) {
        console.error(`Error deleting item: `, error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <TableContainer
        component={Paper}
        elevation={24}
        className="w-full max-w-4xl mx-auto"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Quantity</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="capitalize">{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={selectedItem?.name || ""}
            onChange={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={selectedItem?.quantity || ""}
            onChange={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, quantity: parseInt(e.target.value) } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DisplayPantries;

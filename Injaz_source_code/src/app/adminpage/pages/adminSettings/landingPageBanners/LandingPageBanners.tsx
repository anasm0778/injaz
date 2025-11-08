"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import {
  CloudUpload,
  Delete,
  Edit,
  Add,
  Visibility,
  VisibilityOff,
  Save,
  Cancel,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import AdminPageLogic from "@/app/adminpage";
import AdminNavbar from "@/app/adminpage/AdminNavbar";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  altText: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

const LandingPageBanners: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    altText: "",
    isActive: true,
    displayOrder: 0,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverUrl}/admin/getBanners`);
      setBanners(response.data.data || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
      showSnackbar("Error fetching banners", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error" | "warning" | "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleOpenDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        name: banner.name,
        altText: banner.altText,
        isActive: banner.isActive,
        displayOrder: banner.displayOrder,
      });
      setPreviewUrl(banner.imageUrl);
    } else {
      setEditingBanner(null);
      setFormData({
        name: "",
        altText: "",
        isActive: true,
        displayOrder: banners.length + 1,
      });
      setPreviewUrl("");
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingBanner(null);
    setSelectedFile(null);
    setPreviewUrl("");
    setFormData({
      name: "",
      altText: "",
      isActive: true,
      displayOrder: 0,
    });
  };

  const handleSubmit = async () => {
    if (!selectedFile && !editingBanner) {
      showSnackbar("Please select an image", "error");
      return;
    }

    try {
      setUploading(true);
      const formDataToSend = new FormData();
      
      // Make text fields optional - only add if they have values
      if (formData.name.trim()) {
        formDataToSend.append("name", formData.name);
      }
      if (formData.altText.trim()) {
        formDataToSend.append("altText", formData.altText);
      }
      
      formDataToSend.append("isActive", formData.isActive.toString());
      formDataToSend.append("displayOrder", formData.displayOrder.toString());

      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }

      console.log("Sending banner data:", {
        name: formData.name || "Auto-generated",
        altText: formData.altText || "Auto-generated",
        isActive: formData.isActive,
        displayOrder: formData.displayOrder,
        hasFile: !!selectedFile
      });

      if (editingBanner) {
        // Update existing banner
        const response = await axios.put(`${serverUrl}/admin/updateBanner/${editingBanner.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Update response:", response.data);
        showSnackbar("Banner updated successfully", "success");
      } else {
        // Create new banner
        const response = await axios.post(`${serverUrl}/admin/createBanner`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Create response:", response.data);
        showSnackbar("Banner created successfully", "success");
      }

      handleCloseDialog();
      fetchBanners();
    } catch (error: any) {
      console.error("Error saving banner:", error);
      console.error("Error response:", error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || "Error saving banner";
      showSnackbar(errorMessage, "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        console.log("Deleting banner with ID:", id);
        const response = await axios.delete(`${serverUrl}/admin/deleteBanner/${id}`);
        console.log("Delete response:", response.data);
        showSnackbar("Banner deleted successfully", "success");
        fetchBanners();
      } catch (error: any) {
        console.error("Error deleting banner:", error);
        console.error("Error response:", error.response?.data);
        const errorMessage = error.response?.data?.message || error.message || "Error deleting banner";
        showSnackbar(errorMessage, "error");
      }
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    try {
      await axios.put(`${serverUrl}/admin/updateBanner/${banner.id}`, {
        ...banner,
        isActive: !banner.isActive,
      });
      showSnackbar(`Banner ${!banner.isActive ? "activated" : "deactivated"}`, "success");
      fetchBanners();
    } catch (error) {
      console.error("Error updating banner status:", error);
      showSnackbar("Error updating banner status", "error");
    }
  };

  if (loading) {
    return (
      <AdminPageLogic>
        <Box sx={{ display: "flex" }}>
          <AdminNavbar />
          <Box sx={{ flexGrow: 1, p: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        </Box>
      </AdminPageLogic>
    );
  }

  return (
    <AdminPageLogic>
      <Box sx={{ display: "flex" }}>
        <AdminNavbar />
        <Box sx={{ flexGrow: 1, p: 3, pt: 6 }}>
          <Container maxWidth="xl">
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: "#01437D" }}>
                  Landing Page Banners
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => handleOpenDialog()}
                  sx={{
                    backgroundColor: "#01437D",
                    "&:hover": { backgroundColor: "#012a4a" },
                  }}
                >
                  Add New Banner
                </Button>
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                Manage the banner images that appear on the landing page carousel. Active banners will be displayed in the order specified.
              </Alert>

              <Grid container spacing={3}>
                {banners.map((banner) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={banner.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        opacity: banner.isActive ? 1 : 0.6,
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={`${serverUrl}${banner.imageUrl}`}
                        alt={banner.altText}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {banner.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {banner.altText}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                          <Chip
                            label={banner.isActive ? "Active" : "Inactive"}
                            color={banner.isActive ? "success" : "default"}
                            size="small"
                          />
                          <Chip
                            label={`Order: ${banner.displayOrder}`}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Button
                            size="small"
                            startIcon={<Edit />}
                            onClick={() => handleOpenDialog(banner)}
                            variant="outlined"
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            startIcon={banner.isActive ? <VisibilityOff /> : <Visibility />}
                            onClick={() => handleToggleActive(banner)}
                            variant="outlined"
                            color={banner.isActive ? "warning" : "success"}
                          >
                            {banner.isActive ? "Hide" : "Show"}
                          </Button>
                          <Button
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => handleDelete(banner.id)}
                            variant="outlined"
                            color="error"
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {banners.length === 0 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No banners found. Click "Add New Banner" to create your first banner.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Container>

          {/* Add/Edit Banner Dialog */}
          <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>
              {editingBanner ? "Edit Banner" : "Add New Banner"}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
                <TextField
                  label="Banner Name (Optional)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  fullWidth
                  placeholder="Leave empty for auto-generated name"
                />
                <TextField
                  label="Alt Text (Optional)"
                  value={formData.altText}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Leave empty for auto-generated alt text"
                />
                <TextField
                  label="Display Order"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  fullWidth
                  inputProps={{ min: 1 }}
                />
                <Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    sx={{ mb: 2 }}
                  >
                    {editingBanner ? "Change Image" : "Upload Image"}
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {selectedFile && (
                    <Box sx={{ mt: 1, mb: 2 }}>
                      <Chip
                        label={`Selected: ${selectedFile.name}`}
                        color="success"
                        size="small"
                        icon={<CloudUpload />}
                      />
                    </Box>
                  )}
                  {previewUrl && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Preview:
                      </Typography>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxHeight: "300px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                startIcon={<Save />}
                disabled={uploading}
                sx={{ backgroundColor: "#01437D" }}
              >
                {uploading ? <CircularProgress size={20} /> : "Save"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </AdminPageLogic>
  );
};

export default LandingPageBanners;

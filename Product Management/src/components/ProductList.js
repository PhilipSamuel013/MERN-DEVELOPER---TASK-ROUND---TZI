import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const ProductList = ({ products, setProducts, handleDeleteProduct, handleEditProduct }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setEditedProduct({});
  };

  const handleSave = () => {
    handleEditProduct(editedProduct);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No products available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardContent>
                  {/* {product.images ? (
                    <img 
                      src={product.images} 
                      alt={product.title} 
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography variant="body2" color="textSecondary">No Image Available</Typography>
                    </div>
                  )} */}
                  <Typography variant="h5" style={{ marginTop: '10px' }}>
                    {product.title}
                  </Typography>
                  <div>
                    {product.images && product.images.map((img, idx) => (
                      <img key={idx} src={URL.createObjectURL(img)} alt="product" width="100" />
                    ))}
                  </div>
                  <Typography variant="body2" color="textSecondary">
                    Description: {product.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {product.quantity}
                  </Typography>
                  <div>
                    {/* <Typography variant="body2" color="textSecondary">
                      Variants:
                    </Typography> */}
                    {product.variants && product.variants.map((variant, idx) => (
                      <div key={idx}>
                        <Typography variant="body2" color="textSecondary">
                        Variants
                          {variant.level}:
                        </Typography>
                        <ul>
                          {variant.options.map((option, optionIdx) => (
                            <li key={optionIdx}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleClickOpen(product)}>
                    Edit
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <TextField
                label="Product Title"
                name="title"
                value={editedProduct.title || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={editedProduct.description || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={editedProduct.price || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={editedProduct.quantity || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Typography, Grid, Input, Select, MenuItem, FormControl, InputLabel, IconButton, Card, CardContent, CardActions, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice'; 

const ProductForm = ({ products, setProducts, onAddProduct }) => {
  const { control, handleSubmit, setValue, reset } = useForm();
  const [variants, setVariants] = useState([
    { type: 'Size', options: ['Small', 'Medium', 'Large'] },
    { type: 'Color', options: ['Red', 'Blue', 'Green'] },
    { type: 'Materials', options: ['Cotton', 'Polyester', 'Linen'] }
  ]);
  const [imageFiles, setImageFiles] = useState([]);
  const [variantCombinations, setVariantCombinations] = useState([]);
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        reset(product);
        setVariants(product.variants);
        setImageFiles(product.images);
        setVariantCombinations(product.variantCombinations);
      }
    }
  }, [productId, products, reset]);

  const generateVariantCombinations = () => {
    const options = variants.map(variant => variant.options);
    const combinations = getCombinations(options);
    const combinationsWithStatus = combinations.map(combination => ({
      combination,
      enabled: true, 
    }));
    setVariantCombinations(combinationsWithStatus);
  };

  const getCombinations = (options) => {
    const result = [];
    const f = function(prefix, options) {
      if (options.length === 0) {
        result.push(prefix);
        return;
      }
      for (let i = 0; i < options[0].length; i++) {
        f([...prefix, options[0][i]], options.slice(1));
      }
    };
    f([], options);
    return result;
  };

  useEffect(() => {
    generateVariantCombinations();
  }, [variants]);

  const onSubmit = (data) => {
    const newProduct = {
      id: productId || Date.now().toString(), 
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      images: imageFiles,
      variants,
      variantCombinations: variantCombinations.filter(comb => comb.enabled),
    };

    if (productId) {
      
      setProducts(products.map(product => (product.id === productId ? newProduct : product)));
    } else {
      
      onAddProduct(newProduct);
    }

    navigate('/product-list');
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setImageFiles(Array.from(files));
    }
  };

  const handleAddVariant = (index) => {
    const newVariants = [...variants];
    newVariants[index].options.push('');
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index, optionIndex) => {
    const newVariants = [...variants];
    newVariants[index].options.splice(optionIndex, 1);
    setVariants(newVariants);
  };

  const handleVariantChange = (index, optionIndex, value) => {
    const newVariants = [...variants];
    newVariants[index].options[optionIndex] = value;
    setVariants(newVariants);
  };

  const toggleCombinationEnabled = (index) => {
    const newCombinations = [...variantCombinations];
    newCombinations[index].enabled = !newCombinations[index].enabled;
    setVariantCombinations(newCombinations);
  };

  const handleDeleteProduct = () => {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      setProducts(products.filter(product => product.id !== productId));
      navigate('/product-list');
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: 4 }}>
      <Typography variant="h5" mb={3} textAlign="center" sx={{ fontWeight: 'bold' }}>
        {productId ? 'Edit Product' : 'Add New Product'}
      </Typography>

      <Card sx={{ boxShadow: 3, marginBottom: 3, borderRadius: '12px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Product Information
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Title is required' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Product Title"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      sx={{ borderRadius: '8px', backgroundColor: '#fff', boxShadow: 1 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Price is required' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Price"
                      fullWidth
                      type="number"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      sx={{ borderRadius: '8px', backgroundColor: '#fff', boxShadow: 1 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Quantity is required' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Quantity"
                      fullWidth
                      type="number"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      sx={{ borderRadius: '8px', backgroundColor: '#fff', boxShadow: 1 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Description is required' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Product Description"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      sx={{ borderRadius: '8px', backgroundColor: '#fff', boxShadow: 1 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" mb={1}>Upload Product Images</Typography>
                <Input
                  type="file"
                  multiple
                  fullWidth
                  inputProps={{ accept: 'image/*' }}
                  onChange={handleImageChange}
                  sx={{ borderRadius: '8px', padding: '12px', border: '1px solid #ddd' }}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Variants */}
      <Card sx={{ boxShadow: 3, marginBottom: 3, borderRadius: '12px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Product Variants
          </Typography>
          {variants.map((variant, index) => (
            <Box key={index} mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{variant.type}</Typography>
              <Grid container spacing={2}>
                {variant.options.map((option, optionIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={optionIndex}>
                    <Box display="flex" alignItems="center">
                      <FormControl fullWidth margin="normal">
                        <InputLabel>{`Option ${optionIndex + 1}`}</InputLabel>
                        <Select
                          value={option}
                          onChange={(e) => handleVariantChange(index, optionIndex, e.target.value)}
                          label={`Option ${optionIndex + 1}`}
                          sx={{ borderRadius: '8px', boxShadow: 1 }}
                        >
                          {variant.options.map((opt, idx) => (
                            <MenuItem key={idx} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <IconButton onClick={() => handleRemoveVariant(index, optionIndex)} color="error">
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddVariant(index)}
                    sx={{ borderRadius: '8px' }}
                  >
                    Add Option
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Variant Combinations */}
      <Card sx={{ boxShadow: 3, marginBottom: 3, borderRadius: '12px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            All Variant Combinations
          </Typography>
          {variantCombinations.length > 0 ? (
            <Grid container spacing={2}>
              {variantCombinations.map((combination, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card sx={{ boxShadow: 1, padding: 2, borderRadius: '8px' }}>
                    <CardContent>
                      <Typography variant="body2" align="center">
                        {combination.combination.join(' | ')}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={combination.enabled}
                            onChange={() => toggleCombinationEnabled(idx)}
                          />
                        }
                        label="Enable"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" align="center" color="text.secondary">
              No combinations available.
            </Typography>
          )}
        </CardContent>
      </Card>

      <Card sx={{ boxShadow: 3, borderRadius: '12px' }}>
        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 3, width: '100%', borderRadius: '8px' }}
            onClick={handleSubmit(onSubmit)}
          >
            {productId ? 'Save Changes' : 'Add Product'}
          </Button>
          {productId && (
            <Button
              variant="outlined"
              color="error"
              sx={{ marginTop: 3, marginBottom: 3, width: '100%', borderRadius: '8px' }}
              onClick={handleDeleteProduct}
            >
              Delete Product
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductForm;

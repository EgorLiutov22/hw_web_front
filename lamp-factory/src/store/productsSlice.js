import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '../services/api';
import { products as mockProducts } from '../data/mockProducts';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const data = await productsApi.getAll();
      if (!data || data.length === 0) {
        return mockProducts;
      }
      return data;
    } catch {
      return mockProducts;
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.items = mockProducts;
      });
  }
});

export const selectAllProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
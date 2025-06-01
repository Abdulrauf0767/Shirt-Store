import React, { useState } from 'react';
import { AppBar, Typography,Badge, IconButton,Button, Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import {
  AddShoppingCartOutlined,
  AccountCircleOutlined,
  SearchOutlined,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from '../features/DataSlice';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // Mobile search toggle
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, addtoCart } = useSelector((state) => ({
  list: state.cardData.list,
  addtoCart: state.cardData.addtoCart
}));
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(handleSearch(value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== '') {
      navigate('/search');
      setShowSearch(false); // close mobile search after submission
    }
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        boxShadow: 'none',
        height: '5rem',
        paddingX: { xs: 2, md: 6 },
        zIndex: 30,
      }}
    >
      <div className="flex items-center justify-between h-full w-full mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold w-[120px] flex-shrink-0">Get Shirts</div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative flex-1 max-w-lg mx-4"
        >
          <input
            type="search"
            name="search"
            placeholder="Search here"
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-10 w-full h-10 rounded-2xl border border-gray-300 focus:outline-none"
          />
          <SearchOutlined
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            fontSize="small"
          />
        </form>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700 flex-shrink-0">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/about" className="hover:text-green-600">About</Link>
          <Link to="/contact" className="hover:text-green-600">Contact Us</Link>
          <Link to="/products" className="hover:text-green-600">Products</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
          {/* Mobile Search Toggle */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={toggleSearch}
          >
            <SearchOutlined />
          </IconButton>
          <Box component="div" sx={{ position: 'relative' }}>
            <Link to="/cart">
              <Badge 
                badgeContent={addtoCart.reduce((total, item) => total + item.quantity, 0)} 
                color="error" 
                invisible={addtoCart.length === 0}
              >
                <AddShoppingCartOutlined className="cursor-pointer" />
              </Badge>
            </Link>
          </Box>

          <Link to="/login">
            <AccountCircleOutlined className="cursor-pointer" />
          </Link>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <form
          onSubmit={handleSearchSubmit}
          className="flex md:hidden items-center gap-x-2 px-4 py-2 border-t border-gray-200 bg-white"
        >
          <input
            type="search"
            name="mobileSearch"
            placeholder="Search here"
            value={searchValue}
            onChange={handleSearchChange}
            className="flex-1 h-10 px-4 rounded-2xl border border-gray-300 focus:outline-none"
          />
          <Button type="submit" variant='outlined' sx={{
            borderRadius : 2
          }} >Go</Button>
        </form>
      )}

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md absolute top-[5rem] left-0 right-0 w-full z-20">
          <ul className="flex flex-col space-y-2 p-4 text-center font-medium text-gray-700">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-green-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-green-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-green-600">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-green-600">
                Products
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </AppBar>
  );
};

export default Header;

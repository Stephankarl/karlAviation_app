import * as React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

//IMPORT FILES
import HomePage from './HomePage';
import LoginForm from './auth/LoginForm'
import RegisterUser from './auth/RegisterUser'
import Profile from './auth/Profile';

import AllContracts from './contracts/AllContracts'
import NewContract from './contracts/NewContract'
import OneContract from './contracts/OneContract'

import NewAgent from './agents/NewAgent'
import AllAgents from './agents/AllAgents'
import OneAgent from './agents/OneAgent'

//Import Functions
import { logoutUser } from './store/users';

//MATERIAL UI STYLES
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";

//MATERIAL UI IMPORTS
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import { Grid, Button, Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';

//ICONS
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';

//MAKING STYLES
const useStyles = makeStyles(theme => ({
    linkStyles: {
        color: 'black',
        textDecoration: 'none'
    }
}))

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const user = useSelector(state => state.entities.user)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Grid container justifyContent='space-between'>
            <Grid item>
              <Typography variant="h6" noWrap component="div">
                Karl Aviation
              </Typography>
            </Grid>
            { user.loggedIn && 
              <Grid item style={{ display: 'flex', alignItems: 'center'}}>
                <Typography variant='h6' align='right' mr={3}>{`${user.currentUser.firstName} ${user.currentUser.lastName}`}</Typography>
                <IconButton onClick={() => navigate(`/profile/${user.currentUser._id}`)}>
                  <SettingsIcon fontSize='small' sx={{ color: 'white', m: 1 }} />
                </IconButton>
                <Button variant='inherit' style={{ color: 'white' }} onClick={() => {
                  dispatch(logoutUser())
                  navigate('/login')
                }}>Logout</Button>
              </Grid>
            }
            { !user.loggedIn && 
              <Grid item style={{ display: 'flex', alignItems: 'center'}}>
                <Button variant='inherit' style={{ color: 'white' }} onClick={() => navigate('/login')}>Login</Button>
              </Grid>
            }
          </Grid>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to='/' className={classes.linkStyles} >
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
            </ListItem>
          </Link>
          <Link to='/contracts/all' className={classes.linkStyles} >
            <ListItem button>
              <ListItemIcon>
                  <ContentCopyIcon />
              </ListItemIcon>
              <ListItemText primary='All Contracts' />
            </ListItem>
          </Link>
          <Link to='/agents/all' className={classes.linkStyles} >
            <ListItem button>
              <ListItemIcon>
                  <SupportAgentIcon />
              </ListItemIcon>
              <ListItemText primary='Agents' />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
            {/* USERS  */}
            <Route path='/login' exact element={<LoginForm />} />
            <Route path='/register' exact element={<RegisterUser />} />
            <Route path='/profile/:id' exact element={<Profile />} />
            
            {/* HOMEPAGE  */}
            <Route path='/' exact element={<HomePage />} />

            {/* CONTRACTS  */}
            <Route path='/contracts/all' exact element={<AllContracts />} />
            <Route path='/contracts/new' exact element={<NewContract />} />
            <Route path='/contracts/:id' exact element={<OneContract />} />

            {/* AGENTS  */}
            <Route path='/agents/all' exact element={<AllAgents />} />
            <Route path='/agents/new' exact element={<NewAgent />} />
            <Route path='/agents/:id' exact element={<OneAgent />} />

            {/* AIRPLANES  */}
            {/* <Route path='/airplanes/all' element={AllAirplanes} />
            <Route path='/airplanes/new' exact element={NewAirplane} />
            <Route path='/airplanes/:id' element={OneAirplane} /> */}
            
          <Route path='*' element={<HomePage />} />
        </Routes>
      </Box>
    </Box>
  );
}
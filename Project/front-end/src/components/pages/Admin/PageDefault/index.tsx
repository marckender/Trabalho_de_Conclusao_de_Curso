// // import * as React from 'react';
// // import Button from '@mui/material/Button';
// // import "./styles.scss"


// // interface PageDefaultProps {
// //     children: React.ReactNode;
// // }

// // export const PageDefault: React.FC<PageDefaultProps> = ({children}) =>{

// //   return (
// //     <div className="admin_default_page_container">
// //       <div className="admin_content_container">
// //         <h1>Admin Sidebar</h1>
// //         <div className="admin_content">
// //           Admin Navbar
// //           <div className="admin_content_container">

// //   <Button variant="contained">Hello world</Button>;
// //             {children}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

//       import { styled, useTheme } from '@mui/material/styles';
//       import Box from '@mui/material/Box';
//       import Drawer from '@mui/material/Drawer';
//       import CssBaseline from '@mui/material/CssBaseline';
//       import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
//       import Toolbar from '@mui/material/Toolbar';
//       import IconButton from '@mui/material/IconButton';
//       import { IoMdClose, IoMdMenu } from 'react-icons/io';
//       // import AdminNavbar from '../../../template/Admin/Navbar';
//       // import AdminSidebar from '../../../template/Admin/Sidebar';
//       // import "./styles.scss"
// import { Divider } from '@mui/material';
// import React from 'react';
      
// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   minHeight: '85vh',
//   marginTop: '8px',
//   marginBottom: '8px',
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   alignItems: 'center',
//   display: 'flex',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// interface PageDefaultProps {
//     children: React.ReactNode;
// }

// export const PageDefault: React.FC<PageDefaultProps> = ({children}) =>{
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{
//         background: '#121212'
//       }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <IoMdMenu />
//           </IconButton>

//           {/* <AdminNavbar /> */}
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader sx={{
//           width: '100%',
//           background: "#121212", color: 'white'
//         }}>
//             <div className="admin_sidebar_menu">
//                 <div className="header">
//                     <p>CashLakay</p>
//                 </div>
//             </div>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <IoMdClose color="white"/> : "<ChevronRightIcon />"}
//           </IconButton>
//         </DrawerHeader>
//             <Divider sx={{border: "1px solid #353343"}}/>
        
//         {/* <AdminSidebar /> */}
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         {children}
//       </Main>
//     </Box>
//   );
// }



import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


interface PageDefaultProps {
  children: React.ReactNode;
}


export const PageDefault: React.FC<PageDefaultProps> = ({children}) =>{
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{
        background: '#EC4256'
      }}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <IoMdMenu color="white"/>
          </IconButton>
        Nav
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between'
          // background: "#121212", color: 'white'
        }}>
          DASHBOARD
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <IoMdClose color="#EC4256"/> : "<ChevronRightIcon />"}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
               Icon
                Text
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
            {children}
      </Main>
    </Box>
  );
}

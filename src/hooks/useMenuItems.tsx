import {
  AdminPanelSettings,
  ChecklistRtl,
  ConfirmationNumber,
  CrisisAlert,
  CurrencyBitcoin,
  Dashboard,
  DriveFolderUpload,
  Email,
  FactCheck,
  Help,
  KeyboardAlt,
  Notifications,
  Password,
  Person,
  Public,
  Rule,
  SupportAgent
} from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from '@mui/icons-material/Money';
import NoteIcon from "@mui/icons-material/Note";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default () => {
  const userRole = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  // const orgType = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
  // const organizationType = orgType?.company_type
  // console.log(organizationType)
  const userMenu = [
    {
      key: '1',
      title: 'Dashboard',
      icon: <Dashboard />,
      route: '/',
    },
    {
      key: '6',
      title: 'Team Managment',
      icon: <PeopleIcon />,
      submenus: [
        {
          key: '6.1',
          route: '/users/dashboard',
          title: 'Dashboard',
          icon: <Dashboard />,
        },

        {
          key: '6.2',
          route: '/users',
          title: 'View Team Members',
          icon: <PeopleIcon /> ,
        },
      ],
    },
    {
      key: '7',
      title: 'Products',
      icon: <CreditCardIcon />,
      submenus: [
        {
          key: '7.1',
          route: '/products',
          title: 'Dashboard',
          icon: <Dashboard />,
        },
        {
          key: '7.2',
          route: '/products/create-product',
          title: 'Create Product',
          icon: <PostAddIcon/>,
        },
      ],
    },
    
    {
      key: '8',
      title: 'Orders',
      icon: <NoteIcon />,
      submenus: [
        
        {
          key: '8.2',
          route: '/orders',
          title: 'View Orderss',
          icon: <ReceiptLongIcon /> ,
        },
        {
          key: '8.3',
          route: '/orders/create-orders',
          title: 'Create Orders',
          icon: <NoteAddIcon /> ,
        },
      ],
    },
  ]

  const adminMenu = [
    {
      key: '1',
      title: 'Dashboard',
      icon: <Dashboard />,
      route: '/',
    },
    {
      key: '2',
      title: 'Admin',
      icon: <AdminPanelSettings />,
      route: '/access',
    },
    {
      key: '3',
      title: 'Website Inquiries',
      icon: <SupportAgent />,
      route: '/inquiry',
    },
    {
      key: '4',
      title: 'Manage chain',
      icon: <CurrencyBitcoin />,
      route: '/manage-blockchain',
    },
    {
      key: '5',
      title: 'Trade Limit',
      icon: <CrisisAlert />,
      route: '/trade-limit',
    },
    {
      key: '5',
      title: 'Unlocode / HS-code data',
      icon: <KeyboardAlt />,
      route: '/unlocode-data',
    },
    {
      key: '6',
      title: 'Countrywise Rules',
      icon: <Public />,
      route: '/country-wise-rules',
    },
    {
      key: '7',
      title: 'Unanchored Payments',
      icon: <MoneyIcon />,
      routes: '/unanchoredPayments'
    },
    {
      key: '16.4',
      route: '/profile/promo-code',
      title: 'Promo Code',
      // icon: <ConfirmationNumber size={20} />,
    },
    {
      key: '16.5',
      route: '/profile/listing',
      title: 'Listing',
      // icon: <FactCheck size={20} />,
    },
    {
      key: '16.5',
      route: '/incoterm',
      title: 'Incoterm',
      icon: <Rule />,
    },
    {
      key: '7',
      title: 'Cover Letter',
      icon: <Email />,
      route: '/cover-letter',
    },
    {
      key: '8',
      title: 'LEI Requests',
      icon: <ChecklistRtl />,
      route: '/lei-docs/lei-request',
    },
    {
      key: '15',
      title: 'Profile',
      icon: <Person />,
      submenus: [
        {
          key: '15.1',
          route: '/profile',
          title: 'Your Profile',
          icon: <PersonIcon />,
        },
        {
          key: '15.9',
          route: '/profile/companyLogo',
          title: 'Company Logo',
          icon: <DriveFolderUpload  />,
        },
        // {
        //   key: '16.0',
        //   route: '/profile/getPrivateKey',
        //   title: 'Authorization Key',
        //   icon: <Security />,
        // },
        // {
        //   key: '16.1',
        //   route: '/profile/docSetup',
        //   title: 'Document Setup',
        //   icon: <Article />,
        // },
        // {
        //   key: '16.2',
        //   route: '/profile/bankAccount',
        //   title: 'Bank Account',
        //   icon: <AssuredWorkload size={20} />,
        // },
        // {
        //   key: '16.3',
        //   route: '/profile/tokenRegistry',
        //   title: 'Token Registry',
        //   icon: <VpnKey />,
        // },
        // {
        //   key: '16.7',
        //   route: '/profile/whiteListing',
        //   title: 'White-Listed Wallet Address',
        //   icon: <Wallet />,
        // },
        {
          key: '16.4',
          route: '/profile/updatePassword',
          title: 'Change Password',
          icon: <Password />,
        },
      ],
    },
    // {
    //   key: '20',
    //   title: 'User Management',
    //   icon: <FaUser size={23} />,
    //   route: '/admin/users',
    //   submenus: [
    //     {
    //       key: '20.1',
    //       route: '/admin/users/view-all',
    //       title: 'View All Users',
    //       icon: <PersonIcon />,
    //     },
    //     {
    //       key: '20.2',
    //       route: '/admin/users/add-new',
    //       title: 'Add New User',
    //       icon: <IoIosCreate size={25} />,
    //     },
    //   ],
    // },
    {
      key: '2',
      title: 'Notifications',
      icon: <Notifications />,
      route: '/notification',
    },
    {
      key: '5',
      title: 'Help',
      icon: <Help />,
      route: '/help',
    },
  ];

   // Return appropriate menu based on user role
   return userRole === 'Admin' ? adminMenu : userMenu;
}
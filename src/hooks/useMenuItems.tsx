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
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from '@mui/icons-material/Money';
import NoteIcon from "@mui/icons-material/Note";
import PersonIcon from "@mui/icons-material/Person";

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
      title: 'Invoice',
      icon: '',
      submenus: [
        {
          key: '6.1',
          route: '/invoice/dashboard',
          title: 'Dashboard',
          icon: <Dashboard />,
        },
        {
          key: '6.2',
          // route: '/invoice',
          title: 'View Invoices',
          // icon: ,
          subSubMenus: [
            {
              key: '6.2.1',
              route: '/invoice',
              title: 'View Commercial Invoice',
              // icon: ,
            },
            {
              key: '6.2.2',
              // route: '/invoice/createInvoice?type=PROFORMA_INVOICE',
              route: '/invoice/view-all-proforma-invoice',
              title: 'View Proforma Invoice',
              // icon: ,
            },
          ]
        },
        {
          key: '6.3',
          // route: '/invoice/createInvoice',
          title: 'Create Invoice',
          // icon: ,
          subSubMenus: [
            {
              key: '6.3.1',
              route: '/invoice/createInvoice?type=COMMERCIAL_INVOICE',
              title: 'Commercial Invoice',
              // icon: ,
            },
            {
              key: '6.3.2',
              // route: '/invoice/createInvoice?type=PROFORMA_INVOICE',
              route: '/invoice/create-proforma-invoice',
              title: 'Proforma Invoice',
              // icon: ,
            },
          ]
        },
      ],
    },
    {
      key: '7',
      title: 'Bill Of Lading',
      icon: <CreditCardIcon />,
      submenus: [
        {
          key: '7.1',
          route: '/bol/dashboard',
          title: 'Dashboard',
          icon: <Dashboard />,
        },
        {
          key: '7.2',
          route: '/bol',
          title: 'View BOLs',
          // icon: <RiBillFill size={25} />,
        },
        {
          key: '7.3',
          route: '/bol/incomingBol',
          title: 'Incoming BOLs',
          // icon: <RiBillFill size={25} />,
        },
        {
          key: '7.4',
          route: '/bol/createBol',
          title: 'Create BOL',
          // icon: ,
        },
      ],
    },
    
    {
      key: '8',
      title: 'Promissory Note',
      icon: <NoteIcon />,
      submenus: [
        {
          key: '8.1',
          route: '/promissory-note/dashboard',
          title: 'Dashboard',
          icon: <Dashboard />,
        },
        {
          key: '8.2',
          route: '/promissory-note',
          title: 'View promissory notes',
          // icon: ,
        },
        {
          key: '8.3',
          route: '/promissory-note/create-pNote',
          title: 'Create p-Note',
          // icon: ,
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
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Drawer, List, ListItem, ListItemIcon,ListItemText, Collapse, } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FaWpforms, FaRegListAlt } from "react-icons/fa";

const DrawerComponent = ({ drawerOpen, handleDrawerToggle }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  const handleSubMenuClick = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  // Scroll to a section within the Main Component
  const scrollToSection = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); 
  };

  const menuItems = [
    {
      text: 'Add Clinical Trial',
      icon: <FaWpforms />,
      subItems: [
        { label: 'Administrative Details', sectionId: 'AdministrativeDetails' },
        { label: 'Investigators', sectionId: 'Investigators' },
        { label: 'Participants', sectionId: 'Participants' },
        { label: 'Benefits And Risks', sectionId: 'BenefitsAndRisks' },
        { label: 'Payment Compensation', sectionId: 'PaymentCompensation' },
        { label: 'Storage And Confidentiality', sectionId: 'StorageAndConfidentiality' },
        { label: 'Checklist', sectionId: 'Checklist' },
      ],
    },
    {
      text: 'All Clinical Trials',
      icon: <FaRegListAlt  />,
      link: '/clinical-trials', // Route for the clinical trials component
    },
  ];

  return (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      className={`drawer ${drawerOpen ? '' : 'drawerClosed'}`}
      PaperProps={{
        style: {
          top: '65px',
          width: '300px',
          zIndex: 1000,
        },
      }}
      ModalProps={{
        keepMounted: true,
        disableEnforceFocus: true,
        hideBackdrop: true,
      }}
    >
      <div className="drawerContainer">
        <List>
          {menuItems.map((item, index) => (
            <div key={item.text}>
              {item.link ? (
                // Link for "All Clinical Trials" using react-router's Link
                <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button onClick={() => handleSubMenuClick(index)}>
                    <ListItemIcon className="icon">{item.icon}</ListItemIcon>
                    <ListItemText className="menuItem" primary={item.text} />
                    {openSubMenu === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                </Link>
              ) : (
                // Handle clicking on subsections within "Add Clinical Trial"
                <ListItem button onClick={() => handleSubMenuClick(index)}>
                  <ListItemIcon className="icon">{item.icon}</ListItemIcon>
                  <ListItemText className="menuItem" primary={item.text} />
                  {openSubMenu === index ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              )}

              <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems?.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.label}
                      className="nestedItem"
                      onClick={() => scrollToSection(subItem.sectionId)} // Scroll to the section
                    >
                      <ListItemText className="label" primary={subItem.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerComponent;

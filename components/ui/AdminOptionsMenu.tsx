import { AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { FC } from 'react';

interface Props{
    navigateTo: (url: string) => void
}

export const AdminOptionsMenu:FC<Props> = ({navigateTo}) => {
    return (
        <>
            <ListSubheader>Admin Panel</ListSubheader>

            <ListItem 
                button
                onClick={()=>navigateTo('/admin')}
            >
                <ListItemIcon>
                    <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
            </ListItem>
            <ListItem 
                button
            >
                <ListItemIcon>
                    <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={'Products'} />
            </ListItem>
            <ListItem 
                button
            >
                <ListItemIcon>
                    <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Orders'} />
            </ListItem>

            <ListItem 
                button
                onClick={()=>navigateTo('/admin/users')}
            >
                <ListItemIcon>
                    <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={'Users'} />
            </ListItem>
        </>
    );
};

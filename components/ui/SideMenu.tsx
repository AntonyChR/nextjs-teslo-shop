import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, UiContext } from '../../context';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    Input,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    AccountCircleOutlined,
    ConfirmationNumberOutlined,
    EscalatorWarningOutlined,
    FemaleOutlined,
    LoginOutlined,
    MaleOutlined,
    SearchOutlined,
    VpnKeyOutlined,
} from '@mui/icons-material';
import { AdminOptionsMenu } from './AdminOptionsMenu';

export const SideMenu = () => {
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const { user, isLoggedIn,logout } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const onChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    };

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        navigateTo(`/search/${searchTerm}`);
    };

    const onLogout = () =>{
        logout();
    }

    return (
        <Drawer
            open={isMenuOpen}
            anchor="right"
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={onChangeSearchTerm}
                            onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
                            type="text"
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={onSearchTerm}>
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {isLoggedIn && (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </>
                    )}

                    <ListItem
                        onClick={() => navigateTo('/category/men')}
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem
                        onClick={() => navigateTo('/category/women')}
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem
                        onClick={() => navigateTo('/category/kid')}
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>
                    {
                        isLoggedIn?
                            <ListItem button onClick={onLogout}>
                                <ListItemIcon>
                                    <LoginOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                            :
                            <ListItem button onClick={()=>navigateTo(`/auth/login?p=${router.asPath}`)}>
                                <ListItemIcon>
                                    <VpnKeyOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItem>
                    }

                        <Divider />
                    {/* Admin */}
                    {
                        user?.role === 'admin' && <AdminOptionsMenu/>
                    }

                </List>
            </Box>
        </Drawer>
    );
};

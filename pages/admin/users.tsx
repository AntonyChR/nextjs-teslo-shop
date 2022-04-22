import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { tesloApi } from '../../api';
import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';

const Users = () => {
    const { data, error } = useSWR('/api/admin/users');
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);
    if (!data && !error) return <></>;

    const onRoleUpdate = async (userId: string, newRole: string) => {
        const previousUsers = users.map(user=>({...user}));
        const updatedUsers = users.map((user) => ({
            ...user,
            role: userId === user._id ? newRole : user.role,
        }));
        setUsers(updatedUsers);
        try {
            await tesloApi.put('/admin/users', { userId, role: newRole });
        } catch (error) {
            setUsers(previousUsers);
            alert('Error updating user role');
        }
    };
    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'name', headerName: 'Name', width: 300 },
        {
            field: 'role',
            headerName: 'Role',
            width: 250,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Select
                        value={row.role}
                        label="Rol"
                        sx={{ width: '300px' }}
                        onChange={({ target }) => onRoleUpdate(row.id, target.value)}
                    >
                        <MenuItem value="client">Client</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                );
            },
        },
    ];

    const rows = users.map((user: any) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }));
    return (
        <AdminLayout title="Users" subTitle="Users Management" icon={<PeopleOutline />}>
            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default Users;

import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getUserList, userDelete} from '../actions/userActions'; 
import { Button, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';


const UserListScreen = ({history}) => {
    const userList = useSelector(state=> state.userList);
    const {loading,users,error} = userList;

    const deleteUser = useSelector(state=> state.deleteUser);
    const { success:successDelete } = deleteUser;

    //to not give access to this page for users if they are not admin
    const userLogin = useSelector(state=> state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    useEffect(() => {
        if(userInfo && userInfo.isAdmin)
            dispatch(getUserList());
        else    
            history.push('/login');

    }, [dispatch,history,successDelete,userInfo])    //we r passing successDelete as dependency bcoz we want useeffect to run again after we successfully deletes a user

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(userDelete(id));
        }
    }
    return (
        <>
         <h2>Users</h2>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map( user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin ? (
                                <i className='fas fa-check' style={{ color:'green'}}></i>
                            ) : (
                                 <i className='fas fa-times'style={{ color:'red'}}></i>
                            )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    className='btn-sm'
                                    variant='danger'
                                    onClick={() => deleteHandler(user._id)}
                                ><i className='fas fa-trash'></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
           
         )}   
        </>
    )
}

export default UserListScreen

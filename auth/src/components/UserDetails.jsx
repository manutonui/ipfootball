const UserDetails = ({user}) => {
    return (
        <tr>
            <td>{user.identity}</td>
            <td>{user.type}</td>
            <td>{new Date(user.logtime).toLocaleString()}</td>
        </tr>
    );
}
 
export default UserDetails;
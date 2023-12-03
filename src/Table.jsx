import TableRow from "./TableRow";

const Table = ({ data, deleteUser, selectedUsers, selectUser }) => {
  return (
    <table
      className="table px-2"
      style={{ boxSizing: "border-box", width: 100 + "%" }}
    >
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => {
          return (
            <TableRow
              key={user.id}
              name={user.name}
              role={user.role}
              id={user.id}
              email={user.email}
              deleteUser={deleteUser}
              selectedUsers={selectedUsers}
              selectUser={selectUser}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
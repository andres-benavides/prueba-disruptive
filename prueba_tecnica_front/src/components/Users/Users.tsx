import React, { useEffect, useState } from "react";
import { calculateInversion, fetchUsers } from "../../services/usersService";
import { BaseUser } from "../../models/User";
import styles from "./Users.module.scss";

const Users: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<BaseUser[]>([]);
  const [currentUsers, setCurrentUsers] = useState<BaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inversion, setInversion] = useState<any[]>([]);

  
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      const dataArray:BaseUser[] = Object.entries(data).map(([key, value]) => ({
        id: key,
        time: value.time,
        asset_id_base: value.asset_id_base,
        asset_id_quote: value.asset_id_quote,
        rate: value.rate
    }));
      setFilteredUsers(dataArray);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const currentItems = filteredUsers;
    setCurrentUsers(currentItems);
  }, [ filteredUsers]);

  if (loading) return <p>Loading Users...</p>;
  if (error) return <p>{error}</p>;

  

  // Función para manejar el cambio en el input
  const handleChange = (e:any) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos, por ejemplo, enviar una solicitud HTTP
   const payload = {
    "calculate":{
      "usd":inputValue
  }
   }
   setInversion(await calculateInversion(payload));
    console.log('Valinversion:', inversion);
  };
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      {/* Input controlado */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Escribe algo..."
      />
      {/* Botón para enviar el formulario */}
      <button type="submit">Enviar</button>
    </form>

    <div className={styles.tablasContainer}>
      <div>
        <h2>Datos</h2>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.asset_id_base}</td>
                <td>{user.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Inversion</h2>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Retorno de inversion</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(inversion).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Users;

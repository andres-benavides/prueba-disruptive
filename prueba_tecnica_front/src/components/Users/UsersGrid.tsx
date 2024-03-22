import React, { useEffect, useState } from "react";
import { BaseUser } from "../../models/User";
import { fetchUsers, deleteUser } from "../../services/usersService";
import Person from "../../assets/person.png";
import ModalConfirm from "../Modal/ModalConfirm";
import Alert from "../Alert/Alert";

const UsersGrid = () => {
  const [allUsers, setAllUsers] = useState<BaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setAllUsers(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);


  const handleCloseAlert = () => {
    setAlertInfo({ message: "", type: null });
  };

  if (loading) return <p>Loading Users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 mb-10">
      {alertInfo.type && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          onClose={handleCloseAlert}
        />
      )}
      <div className="row">
        {allUsers.map((user, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img src={Person} className="card-img-top" alt={user.asset_id_base} />
              <div className="card-body">
                <h5 className="card-title">{user.asset_id_base}</h5>
                <p className="card-text">{user.asset_id_base}</p>
                <div className="d-flex justify-content-center">
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersGrid;

import React, { createContext, useContext, useEffect, useState } from "react";
import { ShowUsersContext } from "../Home/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

function Home() {
  const [userList, setUserList] = useState([]);
  const [change, setIsChange] = useState(true);
  const navigation = useNavigate();
  useEffect(() => {
    setTimeout(function(){
      $('#example').DataTable();
       } ,1000);
    document.title = "Admin-Home"
    const info = async () => {
      await axios
        .get("/admin/userData")
        .then((data) => {
          if (data) {
            const userInfo = data.data.users;
            setUserList(userInfo);
          }
        })
        .catch((err) => {
          navigation("/admin");
        });
    };
    info();
  }, [change]);

  const BlockUser = (id) => {
    axios({
      method: "patch",
      url: "/admin/blockUser",
      data: {
        _id: id,
      },
    })
      .then(() => {
        console.log(" Block Succerr");
        change ? setIsChange(false) : setIsChange(true);
      })
      .catch(() => {
        console.log("Block Errrr");
      });
  };

  const unBlockUser = (id) => {
    axios({
      method: "patch",
      url: "/admin/unBlockUser",
      data: {
        _id: id,
      },
    })
      .then(() => {
        console.log(" unBlock Succerr");
        change ? setIsChange(false) : setIsChange(true);
      })
      .catch(() => {
        console.log("unblock Errrr");
      });
  };

  return (
    <div className="card">
      <h5 className="card-header">User List</h5>
      <div className="table-responsive text-nowrap">
        <table  id="example" className=" table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Phone</th> */}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {userList.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <i className="fab fa-angular fa-lg text-danger me-3"></i>{" "}
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.email}</td>
                  {/* <td>
                    <p>{user.phone}</p>
                  </td> */}
                  <td>
                    <span
                      className={
                        user.status
                          ? "badge bg-label-success me-1"
                          : "badge bg-label-danger me-1"
                      }
                    >
                      {user.status ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td>
                    <button
                      className={user.status?"btn btn-sm btn-danger" :"btn btn-sm btn-info" }
                      onClick={() => {
                        if (user.status) {
                          BlockUser(user._id);
                        } else {
                          unBlockUser(user._id);
                        }
                      }}
                    >
                      {user.status ? "Block" : "Active"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

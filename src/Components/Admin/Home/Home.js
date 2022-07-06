import React, { createContext, useContext, useEffect, useState } from "react";
import { ShowUsersContext } from "../Home/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

function Home() {
  const [userList, setUserList] = useState([]);
  const [change, setIsChange] = useState(true);
  const [error, setError] = useState("");
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
          console.log(err,'This is err');
          navigation("/admin");
        });
    };
    info();
  }, [change]);

  const BlockUser = (id, name) => {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block!'
    }).then((result) => {
      if (result.isConfirmed) {
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
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User Blocked',
              showConfirmButton: false,
              timer: 1000
            })
          })
          .catch((err) => {
            setError(err.response.data.message)
            console.log("Block Errrr");
          });
      
      }
    })
   
  };

  const unBlockUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Activate!'
    }).then((result) => {
      if (result.isConfirmed) {
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
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User activated',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch((err) => {
            setError(err.response.data.message)
            console.log("unblock Errrr");
          });
       
      }
    })
    
  };

  return (
    <div className="card">
       {error ? (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              ""
            )}
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
                          BlockUser(user._id, user.name);
                        } else {
                          unBlockUser(user._id,user.name);
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

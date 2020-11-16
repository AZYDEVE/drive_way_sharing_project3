import React from "react";
import "./css/userprofile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function UserProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");
  return (
    <div className="user">
      <div className="container-fluid d-flex justify-content-center">
        <div className="usercard3">
          <div className="card-header">
            <h3>My Account</h3>
          </div>
          <div className="card-body">
            <form id="update" action="/auth/update" method="post"></form>
            <form id="delete" action="/auth/delete" method="post"></form>
            <form>
              <div className="form-group">
                <label for="username">
                  Current Username:
                  <br />
                  (leave blank if deleting account)
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Alice"
                  form="update"
                />
              </div>

              <div className="form-group">
                <label for="newusername">
                  New Username: <br />
                  (leave blank if deleting account)
                </label>
                <input
                  type="text"
                  id="newusername"
                  name="newusername"
                  className="form-control"
                  placeholder="Alice Improved"
                  form="update"
                />
              </div>
              <div className="form group">
                <label for="newpassword">
                  New Password: <br />
                  (leave blank if deleting account)
                </label>
                <input
                  type="password"
                  id="newpassword"
                  name="newpassword"
                  className="form-control"
                  placeholder="xyz789"
                  form="update"
                />
              </div>
              <div className="form-group">
                <label for="deleting">
                  I would like to delete my account:
                  <br />
                  (leave blank if updating account)
                </label>
                <input
                  type="text"
                  id="delete"
                  name="delete"
                  className="form-control"
                  placeholder="Enter your username here to confirm"
                  form="delete"
                />
              </div>
              {error ? <div className="danger">{error}</div> : ""}
              <div className="submitButtons">
                <div className="form-group">
                  <input
                    type="submit"
                    className="buttons"
                    value="Update Account"
                    form="update"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="buttons"
                    value="Delete Account"
                    form="delete"
                  />
                </div>
              </div>
            </form>
            <div className="form-group">
              <Link to="/table">Cancel and return to previous page.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

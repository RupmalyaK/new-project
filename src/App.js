import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Card, Grid, Select, MenuItem, InputLabel } from "@material-ui/core";
import axios from "axios";

const api = "https://reqres.in/api/users?page=2";
const App = () => {
  const [users, setUsers] = useState(null);
  const [searchInput, setSearchInput] = useState("All");
  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showUsers = () => {
    if (!users || users.length === 0) {
      return;
    }

      const UserComponents = users.map(
        ({ first_name, email, last_name, avatar, id }) => {
          if(searchInput !== "All")
            {
              if (first_name.match(new RegExp(`^${searchInput}`, 'i')))
                {
                  return;
                }
            }
          return (
            <Card
              key={id}
              style={{
                height: "100px",
                width: "500px",
                marginBottom: "20px",
                marginRight: "30px",
                display: "flex",
              }}
            >
              <img src={avatar}></img>
              <div
                className="content"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span>{first_name}</span>
                <span>{last_name}</span>
                <span>{email}</span>
              </div>
            </Card>
          );
        }
      );
      return UserComponents;
    
  };

  const showDropdownList = () => {
    if(!users)
      {
        return<></>;
      }
    const MenuItemArr = users.map((user) => {
      return (
        <MenuItem onClick={(e) => setSearchInput()}>
          {user.first_name}
        </MenuItem>
      );
    });
    return MenuItemArr;
  };
  return (
    <div className="content">
      <div style={{ display: "flex" }}>
        <InputLabel>Name:</InputLabel>
        <Select>
          <MenuItem onClick={e => setSearchInput("All")}>All</MenuItem>
          {showDropdownList()}
        </Select>
      </div>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        xl={3}
        style={{ background: "orange", width: "100%" }}
      >
        {showUsers("all")}
      </Grid>
    </div>
  );
};

export default App;

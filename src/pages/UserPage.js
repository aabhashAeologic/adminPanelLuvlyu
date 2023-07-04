import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FormControlLabel, Checkbox, TextField, Radio, RadioGroup } from '@mui/material';
import { Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
// redux part
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from 'src/redux/features/userDataSlice';
import { suspendUser } from 'src/redux/features/suspendUserSlice';
import { useEffect, useState } from 'react';


console.log("usersfasdfasdfasd")
export default function BasicTable() {
  let loading = false;

  const dispatch = useDispatch();
  // this is to run the action of get users
  const [filter, setFilter] = useState({});



  const [value, setValue] = React.useState('');

  const handleGenderFilter = (event) => {
    setValue(event.target.value);
    console.log(event.target.value.toUpperCase())
    dispatch(getUser({
      gender: event.target.value.toUpperCase()
    }))
  };

  const handelCountryFilter = (event) => {
    console.log("country filter is ")
    console.log(event.target.value)
    dispatch(getUser({
      country: event.target.value.toUpperCase()
    }))
  }





  useEffect(() => {
    console.log("hello")
    // this is to trigger get all users action
    dispatch(getUser(filter));
  }, []);

  const allUserData = useSelector((state) => state.usersDataReducer)
  let allUsers = [];
  if (allUserData.loading === false) {
    if (allUserData.users.length != 0) {
      allUsers = allUserData.users.message
      loading = false;
    }
  } else {
    loading = true;
  }

  console.log(allUserData)



  const suspendUserFunc = (payload) => {
    // this will suspend the user
    dispatch(suspendUser(payload))
    // this will then fetch the changes
    // dispatch(getUser({}))
    window.location.reload();
  }
  const unSuspendUser = (payload) => {
    // this will suspend the user
    dispatch(suspendUser(payload))
    // this will then fetch the changes
    // dispatch(getUser({}))
    window.location.reload();


  }

  const suspendedUserOrNot = useSelector((state) => state.suspendReducer.suspensionResponse);

  console.log(suspendedUserOrNot)


  return (
    <>


      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="outlined" {...bindTrigger(popupState)}>
              <FilterListIcon />
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem >
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleGenderFilter}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />

                </RadioGroup>
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  // label="Country"
                  control={<TextField id="standard-basic" label="Country" variant="standard" onChange={handelCountryFilter} />}
                />
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell >Email</TableCell>
              <TableCell >Age</TableCell>
              <TableCell >Phone</TableCell>
              <TableCell >Gender</TableCell>
              <TableCell >IsVip</TableCell>
              <TableCell >Coins</TableCell>
              <TableCell >Wallet</TableCell>
              <TableCell>Suspended</TableCell>
              <TableCell>Action</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {loading ?
              <div
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                }}
              >
                <img src={require('../loader.gif')}></img>
              </div>

              : allUsers.map((user) => (
                <TableRow
                  key={user._id}
                >
                  <TableCell >
                    {user.name}
                  </TableCell>
                  <TableCell >{user.email}</TableCell>
                  <TableCell >{user.age === 0 ? "NIL" : user.age}</TableCell>
                  <TableCell >{user.phone === "" ? "NIL" : user.phone}</TableCell>
                  <TableCell >{user.gender===""?"NIL":user.gender}</TableCell>
                  <TableCell >{user.isVip.toString()}</TableCell>
                  <TableCell >{user.coins}</TableCell>
                  <TableCell >{user.wallet}</TableCell>
                  <TableCell >
                    {user.suspend === true ? <span style={{ "color": "red" }}>{user.suspend.toString().toUpperCase()}</span>
                      : <span style={{ "color": "blue" }}>{user.suspend.toString().toUpperCase()}
                      </span>}
                  </TableCell>




                  <TableCell>
                    {/* <Button  color="success">
                Success
              </Button> */}
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <Button variant="outlined" {...bindTrigger(popupState)}>
                            <CreateIcon />
                          </Button>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem >Profile</MenuItem>
                            <MenuItem >My account</MenuItem>

                            {user.suspend === false ? <MenuItem variant="outlined" onClick={() => {
                              console.log("clicked")
                              suspendUserFunc({
                                userid: user._id,
                                suspend: true
                              })

                            }} >
                              <DeleteOutlineIcon color='error' /> Suspend
                            </MenuItem> : <MenuItem variant="outlined" onClick={() => {
                              unSuspendUser({
                                userid: user._id,
                                suspend: false
                              })
                            }} >
                              <DeleteOutlineIcon color='info' /> UnSuspend
                            </MenuItem>}


                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

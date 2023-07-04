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
import { FormControlLabel, Checkbox, TextField, Radio, RadioGroup, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';


// redux part
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from 'src/redux/features/userDataSlice';
import { useEffect, useState, useRef } from 'react';
import { sendNotification } from 'src/redux/features/notificationSlice';


export default function notificationUser() {

    const dispatch = useDispatch();
    // this is to run the action of get users
    const [filter, setFilter] = useState({});


    const [value, setValue] = React.useState('');

    // this is to handel the filter based on the gender
    const handleGenderFilter = (event) => {
        setValue(event.target.value);
        console.log(event.target.value.toUpperCase())
        dispatch(getUser({
            gender: event.target.value.toUpperCase()
        }))
    };
    // this is to handel the filter based on the country
    const handelCountryFilter = (event) => {
        console.log("country filter is ")
        console.log(event.target.value)
        dispatch(getUser({
            country: event.target.value.toUpperCase()
        }))
    }

    // this is to make a initial dispatch on page load to
    useEffect(() => {
        console.log("hello")
        // this is to trigger get all users action
        dispatch(getUser(filter));

    }, []);

    const allUserData = useSelector((state) => state.usersDataReducer)
    let loading = false;
    let allUsers = [];
    if (allUserData.loading === false) {
        if (allUserData.users.length != 0) {
            allUsers = allUserData.users.message;
            loading = false;
        }
    } else {
        loading = true;
    }

    console.log(allUserData)

    const [selectedIds, setSelectedIds] = useState([]);
    const [messageTitle, setMessageTitle] = useState("");
    const [messageBody, setMessageBody] = useState("");

    const HandelCheckBox = (event, token) => {
        const id = token;

        if (event.target.checked) {
            setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
        } else {
            setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.filter((selectedId) => selectedId !== id)
            );
        }


    }

    console.log("all selected id's")
    console.log(selectedIds)
    const handelSendNotificationToSelectedUsers = () => {
        let payload = {
            notificationTitle: messageTitle,
            notificationMessageBody: messageBody,
            targetUserIds: selectedIds
        }
        dispatch(sendNotification(payload))
    }

    // this is to handle the notification title
    const handelNotificationTitle = (e) => {
        setMessageTitle(e.target.value);

    }
    //  this is to handel the notification body
    const handelNotificationBody = (e) => {
        setMessageBody(e.target.value);
    }


    const handelIndividualPersonNotificationSend = (token) => {
        let payload = {
            notificationTitle: messageTitle,
            notificationMessageBody: messageBody,
            targetUserIds: [token]
        }
        console
        dispatch(sendNotification(payload))
    }


    const handelSelectAllCheckbox = () => {
        var clist = document.getElementsByClassName("checkBox");
        let useridArray = [];

        for (var i = 0; i < clist.length; ++i) {
            console.log(clist[i])
            clist[i].checked = true;
            useridArray.push(clist[i].value);

        }
        console.log(useridArray)
        setSelectedIds(useridArray);
    }


    const notificationDetails = useSelector((state) => state.notificationReducer)

    let notificationMessage = null;
    if (notificationDetails.loading === false) {
        if (notificationDetails.notificationArr.length != 0) {
            notificationMessage = notificationDetails.notificationArr.message;
        }
    }




    return (
        <>

            {notificationMessage ? <Alert severity="info">{notificationMessage}</Alert> : ""}

            <br />

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
            <Button onClick={handelSelectAllCheckbox} variant='outlined'>Select All CheckBoxes</Button>

            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                        <Button variant="outlined" {...bindTrigger(popupState)}>
                            Send Notification To Selected Users
                        </Button>
                        <Menu {...bindMenu(popupState)}>

                            <MenuItem>
                                <FormControlLabel
                                    // label="Country"
                                    control={<TextField id="standard-basic" label="Notification Title" variant="standard" onChange={handelNotificationTitle} />}
                                />
                            </MenuItem>
                            <MenuItem>
                                <FormControlLabel
                                    // label="Country"
                                    control={<TextField id="standard-basic2" label="Notification Body" variant="standard" onChange={handelNotificationBody} />}
                                />
                            </MenuItem>
                            <MenuItem>
                                <FormControlLabel
                                    // label="Country"
                                    control={<Button onClick={
                                        handelSendNotificationToSelectedUsers
                                    } variant='outlined' color='info'>Send Notification</Button>}
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
                            <TableCell>Suspended</TableCell>
                            <TableCell>Select</TableCell>
                            <TableCell>Publish Notification</TableCell>



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
                                    <TableCell ><span style={{ "color": "red" }}>{user.suspend.toString()}</span></TableCell>




                                    <TableCell>

                                        <input type="checkbox" value={user._id} className="checkBox" onChange={(event) => {
                                            HandelCheckBox(event, user._id)
                                        }} />
                                    </TableCell>

                                    <TableCell>
                                        <PopupState variant="popover" popupId="demo-popup-menu">
                                            {(popupState) => (
                                                <React.Fragment>
                                                    <Button variant="outlined" {...bindTrigger(popupState)}>
                                                        <NotificationsIcon />
                                                    </Button>
                                                    <Menu {...bindMenu(popupState)}>

                                                        <MenuItem>
                                                            <FormControlLabel
                                                                // label="Country"
                                                                control={<TextField id="standard-basic" label="Notification Title" variant="standard" onChange={handelNotificationTitle} />}
                                                            />
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <FormControlLabel
                                                                // label="Country"
                                                                control={<TextField id="standard-basic2" label="Notification Body" variant="standard" onChange={handelNotificationBody} />}
                                                            />
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <FormControlLabel
                                                                // label="Country"
                                                                control={<Button onClick={() => {
                                                                    handelIndividualPersonNotificationSend(user._id);
                                                                }} variant='outlined' color='info'>Send Notification</Button>}
                                                            />
                                                        </MenuItem>
                                                    </Menu>
                                                </React.Fragment>
                                            )}
                                        </PopupState>
                                        {/* <Button onClick={handelSendNotification}>Send Notification</Button> */}
                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    );
}

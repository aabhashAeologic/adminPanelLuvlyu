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


// redux part
import { useSelector, useDispatch } from 'react-redux';
import { getLevels } from 'src/redux/features/levelsSlice';
import { useEffect, useState } from 'react';
import { getReportedUsers } from 'src/redux/features/reportedUsersSlice';
import { getUser } from 'src/redux/features/userDataSlice';


console.log("usersfasdfasdfasd")
export default function LevelsPage() {
    const [payload, setPayload] = useState({});
    const dispatch = useDispatch();
    // this is to run the action of get users


    useEffect(() => {
        dispatch(getReportedUsers());
        dispatch(getUser(payload));
    }, []);

    const allReportedUsers = useSelector((state) => state.reportedUsersReducer);
    console.log("all reported data in page is ");
    console.log(allReportedUsers)
    let allReportedUsersArr = [];
    let loading = false;
    if (allReportedUsers.loading === false) {
        if (allReportedUsers.reportedUsersData.length != 0) {
            allReportedUsersArr = allReportedUsers.reportedUsersData.message
            loading = false;
        }
    } else {
        loading = true;
    }








    const allUserData = useSelector((state) => state.usersDataReducer)
    let allUsers = [];

    if (allUserData.loading === false) {
        if (allUserData.users.length != 0) {
            allUsers = allUserData.users.message

        }
    }

    // this function will give the users name based on the user id passed
    function findUserById(userId) {
        const details = allUsers.find(user => user._id === userId);
        return details;
    }

    console.log(allUsers)



    return (
        <>



            <h2>Reported Users Data</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Reported By</TableCell>
                            <TableCell >Reported To</TableCell>
                            <TableCell >Reason</TableCell>

                    
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

                            : allReportedUsersArr.map((data) => (
                                <TableRow
                                    key={data._id}
                                >
                                    <TableCell >{allUsers.length != 0 ? findUserById(data.reportedBy).name : "loading"}</TableCell>
                                    <TableCell >{allUsers.length != 0 ? findUserById(data.reporteduserid).name : "loading"}</TableCell>
                                    <TableCell >{data.reason}</TableCell>
                                    

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

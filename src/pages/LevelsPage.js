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


console.log("usersfasdfasdfasd")
export default function LevelsPage() {
    const [payload, setPayload] = useState({});
    const dispatch = useDispatch();
    // this is to run the action of get users


    useEffect(() => {
        dispatch(getLevels(payload))
    }, []);

    const allLevelsData = useSelector((state) => state.levelDataReducer);
    console.log("all level data in page is ");
    console.log(allLevelsData)
    let allLevels = [];
    let loading = false;
    if (allLevelsData.loading === false) {
        if (allLevelsData.levels.length != 0) {
            allLevels = allLevelsData.levels.message[0].levels
            loading = false;
        }
    } else {
        loading = true;
    }








    // const allUserData = useSelector((state) => state.usersDataReducer)
    // let allLevels = [];
    // let loading = false;
    // if (allUserData.loading === false) {
    //     if (allUserData.users.length != 0) {
    //         allLevels = allUserData.users.message
    //         loading = false;
    //     }
    // } else {
    //     loading = true;
    // }

    // console.log(allUserData)



    return (
        <>



            <h2>Levels Data</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Level</TableCell>
                            <TableCell >Coin Start</TableCell>
                            <TableCell >Coin End</TableCell>

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

                            : allLevels.map((level) => (
                                <TableRow
                                    key={level.levelIncrement}
                                >
                                    <TableCell >{level.levelIncrement}</TableCell>
                                    <TableCell >{level.rangeStart}</TableCell>
                                    <TableCell >{level.rangeEnd}</TableCell>
                                    <TableCell>
                                        {/* <Button  color="success">
                Success
              </Button> */}
                                        <PopupState variant="popover" popupId="demo-popup-menu">
                                            {(popupState) => (
                                                <React.Fragment>
                                                    <Button variant="outlined" {...bindTrigger(popupState)}>
                                                        <FilterListIcon />
                                                    </Button>
                                                    <Menu {...bindMenu(popupState)}>
                                                        <MenuItem onClick={popupState.close}>Profile</MenuItem>
                                                        <MenuItem onClick={popupState.close}>My account</MenuItem>
                                                        <MenuItem onClick={popupState.close} variant="outlined" ><DeleteOutlineIcon color='error' /></MenuItem>
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

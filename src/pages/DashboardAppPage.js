import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
// ----------------------------------------------------------------------
import { useSelector, useDispatch } from "react-redux";  

import { useEffect, useState } from 'react';
import { getUser } from 'src/redux/features/userDataSlice';
import { getAllVideoCallUsers } from 'src/redux/features/videoCallUsersSlice';
import { getAllLivestreamUsers } from 'src/redux/features/liveStreamingUsersSlice';
import { refreshTokenAfterDelay } from 'src/auth/userLogin';

export default function DashboardAppPage() {
  // this is to refresh the bearer token in the local storage after 30 minutes
  refreshTokenAfterDelay(30);

  const theme = useTheme();

  const dispatch = useDispatch();
  // this is to run the action of get users
  useEffect(() => {
    console.log("hello")
    // this is to trigger get all users action
    dispatch(getUser());
    // this is to trigger get all live video all users action
    dispatch(getAllVideoCallUsers())
    // this is to get all livestreaming users action
    dispatch(getAllLivestreamUsers());
  }, [])

  // for all the users data
  const allUserData = useSelector((state) => state.usersDataReducer)
  console.log("all Users Data")
  console.log(allUserData);
  let usersDataLength = 0;
  let datesArray = [];
  let usersCountDateWise = [];
  let vipUsers = 0;
  let nonVipUsers = 0;
  let maleUserCount = 0;
  let femaleUserCount = 0;
  let loading = false;

  if (allUserData.loading === false) {
    if (allUserData.users.length != 0) {
      usersDataLength = allUserData.users.message.length;



      // THIS CODE IS FOR THE MAPPING OF THE USERS DAY WISE JOINED THE PLATFORM
      const userDates = allUserData.users.message.map(user => new Date(user.createdAt).toDateString());
      // Count the number of users for each createdAt date
      const userCounts = {};
      userDates.forEach(date => {
        userCounts[date] = (userCounts[date] || 0) + 1;
      });
      // Convert the userCounts object into an array of objects with key-value pairs
      const result = Object.entries(userCounts).map(([createdAt, count]) => ({ createdAt, count }));

      result.forEach((e) => {
        console.log(e);
        datesArray.push(e.createdAt);
        usersCountDateWise.push(e.count);
      });



      // get all the users who are vip and not vip
      const allVipUsers = allUserData.users.message.filter(user => user.isVip === true);
      const allNonVipUsers = allUserData.users.message.filter(user => user.isVip === false);
      vipUsers = allVipUsers.length;
      nonVipUsers = allNonVipUsers.length;
      console.log(allVipUsers)
      console.log(allNonVipUsers)
      // get all male and female users count
      const allMaleUser = allUserData.users.message.filter(user => user.gender === "MALE");
      const allFemaleUser = allUserData.users.message.filter(user => user.gender === "FEMALE");
      maleUserCount = allMaleUser.length;
      femaleUserCount = allFemaleUser.length


      loading = false;

    }
  } else {
    loading = true;
    usersDataLength = 0;
  }
  // for all the live video calling users data
  const allVideoCallUsersData = useSelector((state) => state.videoCallUsersReducer)
  console.log("all video call users data");
  console.log(allVideoCallUsersData);
  let allLiveVideoCallUsersLength = 0;
  if (allVideoCallUsersData.loading === false) {
    if (allVideoCallUsersData.liveVideoCallUsersArr.length != 0) {
      allLiveVideoCallUsersLength = allVideoCallUsersData.liveVideoCallUsersArr.message.data.length

    }
  }
  // for all the livestreaming users data
  const allLivestreamingUsersData = useSelector((state) => state.liveStreamingUsersReducer);
  let allLivestreamingUsersDatalength = 0;
  if (allLivestreamingUsersData.loading === false) {
    if (allLivestreamingUsersData.livestreaingUsersArr.length != 0) {
      allLivestreamingUsersDatalength = allLivestreamingUsersData.livestreaingUsersArr.message.data.length;
    }
  }

  console.log(usersCountDateWise)

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome To Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Users" total={loading ? "Loading..." : usersDataLength} icon={'uil:user'} ></AppWidgetSummary>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Active Users" total={loading ? "loading Data" : usersDataLength} color="success" icon={'uil:user'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Livestreaming Users" total={loading ? "loading Data" : allLivestreamingUsersDatalength} color="warning" icon={'ic:twotone-live-tv'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Video Calling Users" total={loading ? "loading Data" : allLiveVideoCallUsersLength} color="info" icon={'flat-color-icons:video-call'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Users Joined DayWise"

              // this chart labels will be the date of creations and will be dynamic   
              chartLabels={datesArray}
              chartData={[
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                {
                  name: 'User',
                  type: 'area',
                  fill: 'solid',
                  data: usersCountDateWise,

                },
              ]}
            // and data in team A will be also dynamic
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Memberships"
              chartData={[
                { label: 'Vip', value: vipUsers },
                { label: 'Non vip', value: nonVipUsers },
              ]}
              chartColors={[
                theme.palette.warning.main,
                theme.palette.info.main,
                // theme.palette.warning.main,
                // theme.palette.error.main,
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Gender"
              chartData={[
                { label: 'Male', value: maleUserCount },
                { label: 'Female', value: femaleUserCount },
              ]}
              chartColors={[
                // theme.palette.warning.main,
                // theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>


        </Grid>
      </Container>
    </>
  );
}

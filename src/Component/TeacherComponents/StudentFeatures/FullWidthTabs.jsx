import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function FullWidthTsabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="רגשי" {...a11yProps(0)} />
          <Tab label="חברתי" {...a11yProps(1)} />
          <Tab label="לימודי" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* Item One */}
          {props.emotionalArr.map((item, key) =>
              <div key={item.questionID} className={`classCategory${item.categoryID}`}>
                {/* <div className="textHeadlineNum" id={`que${item.questionID}`} >שאלה מספר {key + 1} - שאלה בתחום ה{item.categoryName}</div> */}
                <div><strong>{item.question}</strong></div>
                <div>
                  <RadioGroup row aria-label="position" className="justify-content-between" name="position" id={`ans${item.questionID}`} onChange={props.chooseAns} defaultValue="">
                    <FormControlLabel
                      value={`radio,1,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="1"
                      checked={(item.answer == 1 ? true : null)}
                      labelPlacement="top"
                      id={`radio,1,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,2,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="2"
                      checked={(item.answer == 2 ? true : null)}
                      labelPlacement="top"
                      id={`radio,2,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,3,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="3"
                      checked={(item.answer == 3 ? true : null)}
                      labelPlacement="top"
                      id={`radio,3,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,4,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="4"
                      checked={(item.answer == 4 ? true : null)}
                      labelPlacement="top"
                      id={`radio,4,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,5,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="5"
                      checked={(item.answer == 5 ? true : null)}
                      labelPlacement="top"
                      id={`radio,5,ans,${item.questionID}`}
                    />
                  </RadioGroup>
                </div>
              </div>
            )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {/* Item Two */}
          {props.socialArr.map((item, key) =>
              <div key={item.questionID} className={`classCategory${item.categoryID}`}>
                {/* <div className="textHeadlineNum" id={`que${item.questionID}`} >שאלה מספר {key + 1} - שאלה בתחום ה{item.categoryName}</div> */}
                <div><strong>{item.question}</strong></div>
                <div>
                  <RadioGroup row aria-label="position" className="justify-content-between" name="position" id={`ans${item.questionID}`} onChange={props.chooseAns} defaultValue="">
                    <FormControlLabel
                      value={`radio,1,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="1"
                      checked={(item.answer == 1 ? true : null)}
                      labelPlacement="top"
                      id={`radio,1,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,2,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="2"
                      checked={(item.answer == 2 ? true : null)}
                      labelPlacement="top"
                      id={`radio,2,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,3,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="3"
                      checked={(item.answer == 3 ? true : null)}
                      labelPlacement="top"
                      id={`radio,3,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,4,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="4"
                      checked={(item.answer == 4 ? true : null)}
                      labelPlacement="top"
                      id={`radio,4,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,5,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="5"
                      checked={(item.answer == 5 ? true : null)}
                      labelPlacement="top"
                      id={`radio,5,ans,${item.questionID}`}
                    />
                  </RadioGroup>
                </div>
              </div>
            )}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {/* Item Three */}
          {props.schoolArr.map((item, key) =>
              <div key={item.questionID} className={`classCategory${item.categoryID}`}>
                {/* <div className="textHeadlineNum" id={`que${item.questionID}`} >שאלה מספר {key + 1} - שאלה בתחום ה{item.categoryName}</div> */}
                <div><strong>{item.question}</strong></div>
                <div>
                  <RadioGroup row aria-label="position" className="justify-content-between" name="position" id={`ans${item.questionID}`} onChange={props.chooseAns} defaultValue="">
                    <FormControlLabel
                      value={`radio,1,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="1"
                      checked={(item.answer == 1 ? true : null)}
                      labelPlacement="top"
                      id={`radio,1,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,2,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="2"
                      checked={(item.answer == 2 ? true : null)}
                      labelPlacement="top"
                      id={`radio,2,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,3,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="3"
                      checked={(item.answer == 3 ? true : null)}
                      labelPlacement="top"
                      id={`radio,3,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,4,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="4"
                      checked={(item.answer == 4 ? true : null)}
                      labelPlacement="top"
                      id={`radio,4,ans,${item.questionID}`}
                    />
                    <FormControlLabel
                      value={`radio,5,ans,${item.questionID}`}
                      control={<Radio color="secondary" />}
                      label="5"
                      checked={(item.answer == 5 ? true : null)}
                      labelPlacement="top"
                      id={`radio,5,ans,${item.questionID}`}
                    />
                  </RadioGroup>
                </div>
              </div>
            )}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
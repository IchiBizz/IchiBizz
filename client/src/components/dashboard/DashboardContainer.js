import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import useStyles from "./DashboardStyles";
import DashboardSeller from "./DashboardSeller";
import DashboardBuyer from "./DashboardBuyer";

export default function DashboardContainer() {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTabs = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={selectedTab}
            onChange={handleChangeTabs}
            aria-label="dashboard-tabs"
            centered
          >
            <Tab
              label="Seller's page"
              id="simple-tab-0"
              aria-controls="simple-tabpanel-0"
            />
            <Tab
              label="Buyer's page"
              id="simple-tab-1"
              aria-controls="simple-tabpanel-1"
            />
          </Tabs>
        </AppBar>
        <DashboardSeller value={selectedTab} index={0} />

        <DashboardBuyer value={selectedTab} index={1} />
      </div>
    </div>
  );
}

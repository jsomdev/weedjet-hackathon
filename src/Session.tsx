import { AzureMapsProvider } from "react-azure-maps";
import React from "react";
import MapController from "./MapController.tsx";
import { Layout, MainContent, SideMenu } from "./layout.tsx";
import { Button, Text, makeStyles } from "@fluentui/react-components";
import { ArrowLeft16Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { SprayGeoJson} from "./scripts/geodata.ts";

const useStyles = makeStyles({
  backButton: {
    width: "100%",
    height: "40px",
  },
  sessionInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: "8px",
  },
});

const Session: React.FC<{sprayData: SprayGeoJson}> = ({ sprayData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <AzureMapsProvider>
      <Layout>
        <SideMenu>
          <div className={classes.sessionInfo}>
            <Button
              onClick={() => navigate("/")}
              className={classes.backButton}
              appearance="outline"
              icon={<ArrowLeft16Regular />}
            >
              Dashboard
            </Button>
            <Text size={700} weight="semibold">
              Session Info
            </Text>
            <Text size={400}>Lorem ipsum dolor</Text>
          </div>
        </SideMenu>
        <MainContent>
          <MapController sprayData={sprayData} />
        </MainContent>
      </Layout>
    </AzureMapsProvider>
  );
};

export default Session;

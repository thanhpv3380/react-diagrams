import * as React from "react";
import * as _ from "lodash";
import { Box, Drawer } from "@material-ui/core";
import {
  RecordVoiceOver as RecordVoiceOverIcon,
  Sms as SmsIcon,
  Close as CloseIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
} from "@material-ui/icons";
import { Application } from "../Application";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DemoCanvasWidget } from "../../helpers/DemoCanvasWidget";
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/styles";
import { IntentNodeModel } from "../../node/IntentNode/IntentNodeModel";
import { ConditionNodeModel } from "../../node/ConditionNode/ConditionNodeModel";
import { ActionNodeModel } from "../../node/ActionNode/ActionNodeModel";

const useStyle = makeStyles({
  siderBar: {
    background: "rgb(20, 20, 20)",
    display: "flex",
    flexDirection: "column",
    WebkitBoxPack: "center",
    justifyContent: "center",
    WebkitBoxAlign: "center",
    alignItems: "center",
    // position: "relative",
    // padding: 2rem 1rem,
  },
  sideBarItem: {
    color: "white",
    fontFamily: "Helvetica, Arial",
    padding: 5,
    margin: "0px 10px",
    border: "solid 1px ${(p) => p.color}",
    borderRadius: 5,
    marginBottom: 2,
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flexGrow: 1,
  },
  layer: {
    position: "relative",
    flexGrow: 1,
  },
});

export interface BodyWidgetProps {
  app: Application;
}

namespace S {
  export const Body = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  `;

  export const Content = styled.div`
    display: flex;
    flex-grow: 1;
  `;

  export const Layer = styled.div`
    position: relative;
    flex-grow: 1;
  `;
}

const BodyWidget = (props: BodyWidgetProps) => {
  const classes = useStyle();
  const forceUpdate: () => void = React.useState()[1].bind(null, {});

  const addNode = (node) => {
    node.setPosition(550, 300);
    props.app.getDiagramEngine().getModel().addNode(node);
    forceUpdate();
  };

  const handleAddIntent = (event) => {
    var node: IntentNodeModel = new IntentNodeModel();
    addNode(node);
  };
  const handleAddCondition = () => {
    var node: ConditionNodeModel = new ConditionNodeModel();
    addNode(node);
  };

  const handleAddAction = () => {
    var node: ActionNodeModel = new ActionNodeModel();
    addNode(node);
  };

  return (
    <Box
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <Box className={classes.content}>
        <Box className={classes.layer}>
          <Drawer
            open={true}
            anchor="left"
            variant="permanent"
            classes={{ paper: classes.siderBar }}
          >
            <Box className={classes.sideBarItem}>
              <RecordVoiceOverIcon onClick={handleAddIntent} />
            </Box>
            <Box className={classes.sideBarItem}>
              <DeviceHubSharpIcon onClick={handleAddCondition} />
            </Box>
            <Box className={classes.sideBarItem}>
              <SmsIcon onClick={handleAddAction} />
            </Box>
            <Box className={classes.sideBarItem}>
              <CloseIcon />
            </Box>
          </Drawer>
          <DemoCanvasWidget>
            <CanvasWidget engine={props.app.getDiagramEngine()} />
          </DemoCanvasWidget>
        </Box>
      </Box>
    </Box>
  );
};

export default BodyWidget;

import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.css";
import createEngine, {
  DefaultLinkModel,
  DiagramModel,
  PathFindingLinkFactory,
  DefaultPortModel,
  DefaultNodeModel,
} from "@projectstorm/react-diagrams";

import { IntentNodeFactory } from "./node/IntentNode/IntentNodeFactory";
import { CustomDeleteItemsAction } from "./actionEvent/CustomDeleteItemsAction";
import { ActionNodeFactory } from "./node/ActionNode/ActionNodeFactory";
import { ActionNodeModel } from "./node/ActionNode/ActionNodeModel";
import { IntentNodeModel } from "./node/IntentNode/IntentNodeModel";
import { ConditionNodeFactory } from "./node/ConditionNode/ConditionNodeFactory";
import { ConditionNodeModel } from "./node/ConditionNode/ConditionNodeModel";
import { MenuNodeFactory } from "./node/MenuNode/MenuNodeFactory";
import { MenuNodeModel } from "./node/MenuNode/MenuNodeModel";
import { DemoCanvasWidget } from "./helpers/DemoCanvasWidget";

import { BodyWidget } from "./BodyWidget";
import { DefaultState } from "./state/DefaultState";

import {} from "./link";

import DragTest from "./WorkFlow";
import {
  AdvancedLinkModel,
  AdvancedPortModel,
  AdvancedLinkFactory,
} from "./link";

// create an instance of the engine
const engine = createEngine({ registerDefaultDeleteItemsAction: false });

// register the two engines
// engine.getNodeFactories().registerFactory(new JSCustomNodeFactory() as any);
engine.getNodeFactories().registerFactory(new IntentNodeFactory());
engine.getNodeFactories().registerFactory(new ConditionNodeFactory());
engine.getNodeFactories().registerFactory(new ActionNodeFactory());
engine.getNodeFactories().registerFactory(new MenuNodeFactory());
engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());

// create a diagram model
const model = new DiagramModel();
// ===================================================
// var node5 = new DefaultNodeModel("Source", "rgb(0,192,255)");
// let port1 = node5.addPort(new AdvancedPortModel(false, "out-1", "Out thick"));
// let port2 = node5.addPort(new DefaultPortModel(false, "out-2", "Out default"));
// node5.setPosition(100, 100);

// var node6 = new DefaultNodeModel("Target", "rgb(192,255,0)");
// var port3 = node6.addPort(new AdvancedPortModel(true, "in-1", "In thick"));
// var port4 = node6.addPort(new DefaultPortModel(true, "in-2", "In default"));
// node6.setPosition(300, 100);

// var node7 = new DefaultNodeModel("Source", "rgb(0,192,255)");
// node7.addPort(new AdvancedPortModel(false, "out-1", "Out thick"));
// node7.addPort(new DefaultPortModel(false, "out-2", "Out default"));
// node7.setPosition(100, 200);

// var node4 = new DefaultNodeModel("Target", "rgb(192,255,0)");
// node4.addPort(new AdvancedPortModel(true, "in-1", "In thick"));
// node4.addPort(new DefaultPortModel(true, "in-2", "In default"));
// node4.setPosition(300, 200);

// this.activeModel.addAll(node5, node6, link1);
// model.addAll(port1.link(port3));
// model.addAll(node5, node6, node7, node4);

//####################################################
// now create two nodes of each type, and connect them

const node1 = new ConditionNodeModel({ color: "rgb(192,255,0)" });
node1.setPosition(50, 50);

const node2 = new IntentNodeModel({ color: "rgb(0,192,255)" });
node2.setPosition(400, 100);
console.log(node2);

const node3 = new ActionNodeModel({ color: "rgb(0,192,255)" });
node3.setPosition(400, 300);

const link1 = new AdvancedLinkModel();
link1.setSourcePort(node1.getPort("out"));
link1.setTargetPort(node2.getPort("in"));

const link2 = new AdvancedLinkModel();
link2.setTargetPort(node1.getPort("out"));
link2.setSourcePort(node3.getPort("in"));

model.addAll(node1, node2, link1, node3);

//####################################################

// install the model into the engine
engine.setModel(model);
engine.getActionEventBus().registerAction(new CustomDeleteItemsAction());
engine.getStateMachine().pushState(new DefaultState());

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    // <DemoCanvasWidget>
    //   <BodyWidget engine={engine}></BodyWidget>
    // </DemoCanvasWidget>,
    <DragTest />,
    document.querySelector("#application")
  );
});

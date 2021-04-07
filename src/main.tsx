import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './main.css';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { DefaultState } from './DefaultState';
import { BodyWidget } from './BodyWidget';
import { TSCustomNodeFactory as TSCustomNodeActionFactory } from './custom-node-ts/custom-node-action/CustomNodeFactory';
import { TSCustomActionNodeModel as TSCustomNodeActionModel } from './custom-node-ts/custom-node-action/CustomNodeModel';
import { TSCustomNodeFactory as TSCustomNodeSelectFactory } from './custom-node-ts/custom-node-select/CustomNodeFactory';
import { TSCustomSelectNodeModel as TSCustomNodeSelectModel } from './custom-node-ts/custom-node-select/CustomNodeModel';
const engine = createEngine();

// register the two engines
engine.getNodeFactories().registerFactory(new TSCustomNodeActionFactory());
engine.getNodeFactories().registerFactory(new TSCustomNodeSelectFactory());

const model = new DiagramModel();

const node1 = new TSCustomNodeActionModel({ color: 'rgb(192,255,0)' });
node1.setPosition(50, 50);

const node2 = new TSCustomNodeActionModel({ color: 'rgb(0,192,255)' });
node2.setPosition(200, 50);

model.addAll(node1, node2);

engine.setModel(model);

// Use this custom "DefaultState" instead of the actual default state we get with the engine
engine.getStateMachine().pushState(new DefaultState());

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BodyWidget engine={engine} />,
    document.querySelector('#application'),
  );
});

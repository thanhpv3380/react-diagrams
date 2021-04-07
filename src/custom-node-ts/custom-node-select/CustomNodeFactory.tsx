import * as React from 'react';
import { TSCustomSelectNodeModel } from './CustomNodeModel';
import { TSCustomNodeWidget } from './CustomNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class TSCustomNodeFactory extends AbstractReactFactory<TSCustomSelectNodeModel, DiagramEngine> {
  constructor() {
    super('ts-custom-node-select');
  }

  generateModel(initialConfig) {
    return new TSCustomSelectNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return <TSCustomNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
  }
}

import * as React from 'react';
import { TSCustomActionNodeModel } from './CustomNodeModel';
import { TSCustomNodeWidget } from './CustomNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class TSCustomNodeFactory extends AbstractReactFactory<
  TSCustomActionNodeModel,
  DiagramEngine
> {
  constructor() {
    super('ts-custom-node-action');
  }

  generateModel(initialConfig) {
    return new TSCustomActionNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <TSCustomNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}

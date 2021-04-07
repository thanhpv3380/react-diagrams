import * as React from 'react';
import { Button, Paper } from '@material-ui/core';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { TSCustomActionNodeModel } from './CustomNodeModel';

export interface TSCustomNodeWidgetProps {
  node: TSCustomActionNodeModel;
  engine: DiagramEngine;
}

export interface TSCustomNodeWidgetState {}

export class TSCustomNodeWidget extends React.Component<
  TSCustomNodeWidgetProps,
  TSCustomNodeWidgetState
> {
  constructor(props: TSCustomNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  handleDelete = (e) => {
    e.preventDefault();
    console.log(this.props.node);

    this.props.node.remove();
    this.props.engine.repaintCanvas();
  };

  render() {
    return (
      <Paper>
        <div>test</div>
        <Button variant="contained" color="primary" onClick={this.handleDelete}>
          Delete
        </Button>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort('in')}
        >
          <div className="circle-port-in">In</div>
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort('out')}
        >
          <div className="circle-port-out">Out</div>
        </PortWidget>
      </Paper>
    );
  }
}

// <PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
// <div className="circle-port" />
// </PortWidget>

import * as React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import { Inbox as InboxIcon, Drafts as DraftsIcon } from '@material-ui/icons';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { TSCustomSelectNodeModel } from './CustomNodeModel';
import { TSCustomActionNodeModel } from '../custom-node-action/CustomNodeModel';
export interface TSCustomNodeWidgetProps {
  node: TSCustomSelectNodeModel;
  engine: DiagramEngine;
}

export interface TSCustomNodeWidgetState {}

const items = [
  {
    id: 1,
    heading: 'Intent',
    icon: <InboxIcon />,
    link: '',
  },
  {
    id: 2,
    heading: 'Action',
    icon: <DraftsIcon />,
    link: '',
  },
  {
    id: 3,
    heading: 'Condition',
    icon: <DraftsIcon />,
    link: '',
  },
];
export class TSCustomNodeWidget extends React.Component<
  TSCustomNodeWidgetProps,
  TSCustomNodeWidgetState
> {
  constructor(props: TSCustomNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  handleClick = (id) => {
    const listNode = this.props.engine
      .getModel()
      .getActiveNodeLayer()
      .getModels();
    const keys = Object.keys(listNode);
    const lastNode = listNode[keys[keys.length - 1]];

    if (lastNode instanceof TSCustomSelectNodeModel) {
      // get position of last node
      const positionX = lastNode.getX();
      const positionY = lastNode.getY();

      //create node and set position
      const node = new TSCustomActionNodeModel({ color: 'rgb(0,192,255)' });
      node.setPosition(positionX, positionY);

      // add node to model
      const model = this.props.engine.getModel();
      model.addNode(node);

      // get port in of new node
      const element_select_port = node.getPort('in');

      // get link from last node
      const links = lastNode.getPorts()['in']['links'];
      const listKeysLink = Object.keys(links);
      const link = links[listKeysLink[listKeysLink.length - 1]];

      link.getLastPoint().setPosition(positionX, positionY);
      if (link.getSourcePort().canLinkToPort(element_select_port)) {
        link.setTargetPort(element_select_port);
        element_select_port.reportPosition();
      }

      // remove last node
      lastNode.remove();

      // update canvas
      this.props.engine.repaintCanvas();
    }
  };

  render() {
    return (
      <List component="nav" aria-label="main mailbox folders">
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort('in')}
        >
          <div className="circle-select-port" />
        </PortWidget>
        {items.map((el) => (
          <ListItem key={el.id} button onClick={() => this.handleClick(el.id)}>
            <ListItemIcon>{el.icon}</ListItemIcon>
            <ListItemText>
              <ListItemText primary={el.heading} />
            </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}

// <PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
// <div className="circle-port" />
// </PortWidget>

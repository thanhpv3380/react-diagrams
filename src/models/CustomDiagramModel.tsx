import {
  DiagramModel,
  DiagramModelGenerics,
} from "@projectstorm/react-diagrams";
import { AdvancedLinkModel } from "../link";

export class CustomDiagramModel extends DiagramModel<DiagramModelGenerics> {
  addLink(link: AdvancedLinkModel): AdvancedLinkModel {
    this.getActiveLinkLayer().addModel(link);
    this.fireEvent(
      {
        link,
        isCreated: true,
      },
      "linksUpdated"
    );
    return link;
  }
}

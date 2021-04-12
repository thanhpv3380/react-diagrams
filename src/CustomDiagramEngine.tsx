import { DiagramEngine } from "@projectstorm/react-diagrams";
import { CustomDiagramModel } from "./models/CustomDiagramModel";

export class CustomDiagramEngine extends DiagramEngine {
  setModel(model: CustomDiagramModel) {
    this.model = model;
    if (this.canvas) {
      requestAnimationFrame(() => {
        this.repaintCanvas();
      });
    }
  }
}

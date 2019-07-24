import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare let mxClient: any;
declare let mxUtils: any;
declare let mxEvent: any;
declare let mxGraphHandler: any;
declare let mxDragSource: any;
declare let mxGuide: any;
declare let mxGeometry: any;
declare let mxCell: any;

@Component({
  selector: 'ngx-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements AfterViewInit {

  @ViewChild('graphContainer', { static: false }) graphContainer: ElementRef;
  @ViewChild('components', { static: false }) components: ElementRef;

  ngAfterViewInit() {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error('Browser is not supported!', 200, false);
    } else {
      // Enables guides
      mxGraphHandler.prototype.guidesEnabled = true;

      // Alt disables guides
      mxGuide.prototype.isEnabledForEvent = (evt) => {
        return !mxEvent.isAltDown(evt);
      };

      // Enables snapping waypoints to terminals
      mxEdgeHandler.prototype.snapToTerminals = true;

      const graph: any = new mxGraph(this.graphContainer.nativeElement);
      graph.graphHandler.scaleGrid = true;
      graph.setPanning(true);

      try {
        const parent = graph.getDefaultParent();
        graph.getModel().beginUpdate();

        const vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 120, 60);

        // graph.insertEdge(parent, '', '', vertex1, vertex2);
      } finally {
        graph.getModel().endUpdate();
        new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
      }

      // Creates a DOM node that acts as the drag source
      const img = mxUtils.createImage('assets/images/gear.png');
      img.style.width = '48px';
      img.style.height = '48px';
      this.components.nativeElement.appendChild(img);

      // Disables built-in DnD in IE (this is needed for cross-frame DnD, see below)
      if (mxClient.IS_IE) {
        mxEvent.addListener(img, 'dragstart', (evt) => {
          evt.returnValue = false;
        });
      }

      // Creates the element that is being for the actual preview.
      const dragElt = document.createElement('div');
      dragElt.style.border = 'dashed black 1px';
      dragElt.style.width = '120px';
      dragElt.style.height = '40px';

      // Drag source is configured to use dragElt for preview and as drag icon
      // if scalePreview (last) argument is true. Dx and dy are null to force
      // the use of the defaults. Note that dx and dy are only used for the
      // drag icon but not for the preview.
      const ds = mxUtils.makeDraggable(
        img,
        graph,
        this.insertCellAtLocation,
        dragElt,
        null,
        null,
        graph.autoscroll,
        true);

      // Redirects feature to global switch. Note that this feature should only be used
      // if the the x and y arguments are used in funct to insert the cell.
      ds.isGuidesEnabled = () => {
        return graph.graphHandler.guidesEnabled;
      };

      // Restores original drag icon while outside of graph
      ds.createDragElement = mxDragSource.prototype.createDragElement;
    }
  }

  insertCellAtLocation(graphSh, evt, target, x, y) {
    const cell = new mxCell('Test', new mxGeometry(0, 0, 120, 40));
    cell.vertex = true;
    const cells = graphSh.importCells([cell], x, y, target);
    if (cells != null && cells.length > 0) {
      graphSh.scrollCellToVisible(cells[0]);
      graphSh.setSelectionCells(cells);
    }
  }

}

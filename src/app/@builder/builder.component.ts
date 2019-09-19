import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare let mxClient: any;
declare let mxUtils: any;
declare let mxEvent: any;


@Component({
  selector: 'ngx-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements AfterViewInit {

  @ViewChild('graphContainer', { static: false }) graphContainer: ElementRef;
  graph;
  cellCreatedFunc;
  valueChangeFunc;

  ngAfterViewInit() {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error('Browser is not supported!', 200, false);
    } else {
      const containerEle = this.graphContainer.nativeElement;
      const graph: any = new mxGraph(containerEle);
      // Disables the built-in context menu
      mxEvent.disableContextMenu(containerEle); // eslint-disable-line
      mxVertexHandler.prototype.rotationEnabled = true; // eslint-disable-line

      this.initEditor({
        // ...props,
        graph,
      });

      this.graph = graph;
      /* this.cellCreatedFunc = cellCreatedFunc;
      this.valueChangeFunc = valueChangeFunc; */
    }
  }

  initEditor(config) {

  }
}

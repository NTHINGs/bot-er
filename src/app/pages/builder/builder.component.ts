import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { jsPlumb } from 'jsplumb';

@Component({
  selector: 'ngx-builder',
  templateUrl: './builder.component.html',
})
export class BuilderComponent implements AfterViewInit {
  jsPlumbInstance;  
  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.jsPlumbInstance.draggable(this.jsPlumbInstance.getSelector('#card'),{
      containment: 'parent'
    });

    this.jsPlumbInstance.draggable(this.jsPlumbInstance.getSelector('#card2'),{
      containment: 'parent'
    });

    this.jsPlumbInstance.addEndpoint(this.jsPlumbInstance.getSelector('#card'), { 
      anchor:"Bottom"
    }, {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isSource:true,
      connectorStyle : { stroke:"#666" },
      isTarget:true
    }); 

    this.jsPlumbInstance.addEndpoint(this.jsPlumbInstance.getSelector('#card2'), { 
      anchor:"Bottom"
    }, {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isSource:true,
      connectorStyle : { stroke:"#666" },
      isTarget:true
    }); 

    // this.jsPlumbInstance.connect({source:this.jsPlumbInstance.getSelector('#card'), target:this.jsPlumbInstance.getSelector('#card2')});
  }
}

import { NgModule } from '@angular/core';

import { BuilderComponent } from './builder.component';

const COMPONENTS = [
  BuilderComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [],
  providers: [],
  exports: [...COMPONENTS],
})
export class BuilderModule { }

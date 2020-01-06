import { NgModule } from '@angular/core';
import { QuillModule } from "ngx-quill";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [HttpClientModule, QuillModule.forRoot()],
  exports: [HttpClientModule, QuillModule],
  providers: []
})
export class SharedModule {}

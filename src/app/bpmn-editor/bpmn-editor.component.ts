import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bpmn-editor',
  standalone: true,
  template: `
    <div class="editor-container">
      <div class="editor-header">
        <h2>BPMN Editor</h2>
        <p>Business Process Model and Notation Editor</p>
      </div>
      <div class="editor-wrapper">
        <div #bpmnContainer class="bpmn-editor" id="bpmn-editor-container"></div>
      </div>
      <div class="editor-footer">
        <p class="editor-info">
          Design workflows, process flows, and business process models using the BPMN 2.0 standard.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .editor-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .editor-header {
      background: #f8f9fa;
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      text-align: center;
    }

    .editor-header h2 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }

    .editor-header p {
      margin: 0;
      color: #6c757d;
      font-size: 1rem;
    }

    .editor-wrapper {
      flex: 1;
      padding: 1rem;
      background: #ffffff;
    }

    .bpmn-editor {
      width: 100%;
      height: 600px;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      background: #fafafa;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #6c757d;
      position: relative;
    }

    .bpmn-editor::before {
      content: "BPMN Editor will load here...";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .editor-footer {
      background: #f8f9fa;
      padding: 1rem 1.5rem;
      border-top: 1px solid #e9ecef;
    }

    .editor-info {
      margin: 0;
      color: #6c757d;
      font-size: 0.9rem;
      text-align: center;
    }

    @media (max-width: 768px) {
      .editor-wrapper {
        padding: 0.5rem;
      }

      .bpmn-editor {
        height: 500px;
      }

      .editor-header {
        padding: 1rem;
      }

      .editor-header h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class BpmnEditorComponent implements OnInit, OnDestroy {
  @ViewChild('bpmnContainer', { static: true }) bpmnContainer!: ElementRef;
  private editor: any;

  async ngOnInit() {
    try {
      const BpmnEditor = await import('@kie-tools/kie-editors-standalone/dist/bpmn');
      
      this.editor = await BpmnEditor.open({
        container: this.bpmnContainer.nativeElement,
        initialContent: Promise.resolve(''),
        readOnly: false,
        resources: new Map([])
      });

      console.log('BPMN Editor initialized successfully with readOnly: false');
    } catch (error) {
      console.error('Failed to initialize BPMN Editor:', error);
      this.bpmnContainer.nativeElement.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #dc3545;">
          <h3>Failed to load BPMN Editor</h3>
          <p>Error: ${error}</p>
          <p>Please check the console for more details.</p>
        </div>
      `;
    }
  }

  ngOnDestroy() {
    if (this.editor) {
      try {
        this.editor.close();
        console.log('BPMN Editor closed successfully');
      } catch (error) {
        console.error('Error closing BPMN Editor:', error);
      }
    }
  }
}

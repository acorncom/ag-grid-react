import {ICellRenderer, MethodNotImplementedException} from 'ag-grid';

var React = require('react');
var ReactDOM = require('react-dom');

export function reactCellRendererFactory(reactComponent: any, parentComponent?: any): {new(): ICellRenderer} {

    class ReactCellRenderer implements ICellRenderer {

        private eParentElement: HTMLElement;
        private componentRef: any;

        public init(params: any): void {
            this.eParentElement = params.eParentOfValue;

            var ReactComponent = React.createElement(reactComponent, { params: params });
            if (!parentComponent) {
                this.componentRef = ReactDOM.render(ReactComponent, this.eParentElement);
            } else {
                this.componentRef = ReactDOM.unstable_renderSubtreeIntoContainer(parentComponent, ReactComponent, this.eParentElement);
            }
        }

        public getGui(): HTMLElement {
            // return null to the grid, as we don't want it responsible for rendering
            return null;
        }

        public destroy(): void {
            ReactDOM.unmountComponentAtNode(this.eParentElement);
        }

        public refresh(params: any): void {
            if (this.componentRef.refresh) {
                this.componentRef.refresh(params);
            } else {
                throw new MethodNotImplementedException();
            }
        }

    }

    return ReactCellRenderer;

}
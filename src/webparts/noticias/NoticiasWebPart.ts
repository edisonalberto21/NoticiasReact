import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NoticiasWebPartStrings';
import Noticias from './components/Noticias';
import { INoticiasProps } from './components/INoticiasProps';

export interface INoticiasWebPartProps {
  description: string;
  siteUrl : string;
  categoria: string;
  titulo:string;
  numero: number
}

export default class NoticiasWebPart extends BaseClientSideWebPart <INoticiasWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INoticiasProps> = React.createElement(
      Noticias,
      {
        description: this.properties.description,
        siteUrl :this.context.pageContext.web.absoluteUrl,
        categoria: this.properties.categoria,
        titulo: this.properties.titulo,
        numero: this.properties.numero

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('categoria', {
                  label: 'Categoría'
                }),
                PropertyPaneTextField('description', {
                  label: 'Descripcion'
                }),
                PropertyPaneTextField('titulo', {
                  label: 'Titulo'
                }),
                PropertyPaneTextField('numero', {
                  label: 'Número Módulo'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}

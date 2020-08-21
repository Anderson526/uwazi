import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Immutable from 'immutable';

import Doc from 'app/Library/components/Doc';

import { TilesViewer } from 'app/Layout/TilesViewer';

import { RowList } from '../Lists';
import { CollectionViewerProps } from '../CollectionViewerProps';

describe('TilesViewer', () => {
  let component: ShallowWrapper<CollectionViewerProps, {}, TilesViewer>;
  let props: any;
  const documents = Immutable.fromJS({
    rows: [
      { title: 'Document one', _id: '1' },
      { title: 'Document two', _id: '2' },
    ],
    totalRows: 10,
  });

  beforeEach(() => {
    props = {
      rowListZoomLevel: 0,
      documents,
      storeKey: 'library',
      clickOnDocument: { apply: jasmine.createSpy('clickOnDocumentApply') },
      onSnippetClick: jasmine.createSpy('onSnippetClick'),
      deleteConnection: () => {},
      search: { sort: 'sort' },
    };
  });

  const render = () => {
    component = shallow(<TilesViewer {...props} />);
  };

  describe('Tiles viewer', () => {
    beforeEach(() => {
      render();
    });

    it('should pass to RowList the zoom level passed to component', () => {
      expect(component.find(RowList).props().zoomLevel).toBe(0);
      props.rowListZoomLevel = 3;
      render();
      expect(component.find(RowList).props().zoomLevel).toBe(3);
    });

    it('should render a Doc element for each document, passing the search options', () => {
      const docs = component.find(Doc);
      expect(docs.length).toBe(2);
      const { doc } = docs.first().props() as any;
      expect(doc.get('title')).toBe('Document one');
      expect(docs.first().props().searchParams).toEqual({ sort: 'sort' });
      expect(docs.first().props().deleteConnection).toBe(props.deleteConnection);
    });

    it('should pass onClickSnippet to Doc', () => {
      const docProps = component
        .find(Doc)
        .at(0)
        .props();
      expect(docProps.onSnippetClick).toBe(props.onSnippetClick);
    });

    describe('Clicking on a document', () => {
      it('should call on props.clickOnDocument if present', () => {
        component
          .find(Doc)
          .at(0)
          .simulate('click', 'e', 'other args');
        expect(props.clickOnDocument.apply.calls.mostRecent().args[1][0]).toBe('e');
        expect(props.clickOnDocument.apply.calls.mostRecent().args[1][1]).toBe('other args');
      });
    });
  });
});

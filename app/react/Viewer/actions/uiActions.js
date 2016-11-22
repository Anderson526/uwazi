import * as types from 'app/Viewer/actions/actionTypes';
import {actions} from 'app/BasicReducer';
import scroller from 'app/Viewer/utils/Scroller';
import {setTargetSelection} from 'app/Viewer/actions/selectionActions';
import {events} from 'app/utils';

export function closePanel() {
  return {
    type: types.CLOSE_PANEL
  };
}

export function openPanel(panel) {
  return {
    type: types.OPEN_PANEL,
    panel
  };
}

export function resetReferenceCreation() {
  return function (dispatch) {
    dispatch({type: types.RESET_REFERENCE_CREATION});
    dispatch(actions.unset('viewer/targetDoc'));
    dispatch(actions.unset('viewer/targetDocHTML'));
    dispatch(actions.unset('viewer/targetDocReferences'));
  };
}

export function selectTargetDocument(id) {
  return {
    type: types.SELECT_TARGET_DOCUMENT,
    id
  };
}

export function highlightReference(reference) {
  return {
    type: types.HIGHLIGHT_REFERENCE,
    reference
  };
}

export function deactivateReference() {
  return {
    type: types.DEACTIVATE_REFERENCE
  };
}

export function showTab(tab) {
  return {
    type: types.SHOW_TAB,
    tab
  };
}

export function activateReference(reference, docInfo, tab) {
  const tabName = tab && !Array.isArray(tab) ? tab : 'references';
  events.removeAllListeners('referenceRendered');

  //
  let page = Object.keys(docInfo).find((pageNumber) => {
    return docInfo[pageNumber].chars >= reference.range.start;
  });
  //

  return function (dispatch) {
    dispatch({type: types.ACTIVE_REFERENCE, reference: reference._id});
    dispatch({type: types.OPEN_PANEL, panel: 'viewMetadataPanel'});
    dispatch(showTab(tabName));

    setTimeout(() => {
      if (document.querySelector(`.document-viewer a[data-id="${reference._id}"]`, '.document-viewer')) {
        scroller.to(`.document-viewer a[data-id="${reference._id}"]`, '.document-viewer', {duration: 100});
      } else {
        let scroll = scroller.to(`.document-viewer div#page-${page}`, '.document-viewer', {duration: 0, dividerOffset: 1});

        events.on('referenceRendered', (renderedReference) => {
          if (renderedReference._id === reference._id && document.querySelector(`.document-viewer a[data-id="${reference._id}"]`, '.document-viewer')) {
            window.clearInterval(scroll);
            scroller.to(`.document-viewer a[data-id="${reference._id}"]`, '.document-viewer', {duration: 100});
            events.removeAllListeners('referenceRendered');
          }
        });
      }

      scroller.to(`.metadata-sidepanel .item[data-id="${reference._id}"]`, '.metadata-sidepanel .sidepanel-body', {duration: 100});
    });
  };
}

export function selectReference(reference, docInfo) {
//export function selectReference(referenceId, references, docInfo) {
  //let reference = references.find(item => item._id === referenceId);

  return function (dispatch) {
    dispatch(activateReference(reference, docInfo));
    dispatch(setTargetSelection(reference.range));
  };
}

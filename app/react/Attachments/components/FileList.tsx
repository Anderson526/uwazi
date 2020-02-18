import React, { Component } from 'react';

import { advancedSort } from 'app/utils/advancedSort';
import { Translate } from 'app/I18N';
import { ConnectedFile as File } from './File';
import { FileType } from 'shared/types/fileType';

const defaultProps = {
  files: [],
  entitySharedId: null,
  readOnly: false,
};

type FileListProps = {
  files: Array<FileType>;
  entitySharedId: String;
  readOnly: Boolean;
};

export class FileList extends Component<FileListProps> {
  static arrangeFiles(files: Array<FileType> = []) {
    return advancedSort(files, { property: 'originalname' });
  }

  static defaultProps = defaultProps;

  static renderFile(file: FileType) {
    return (
      <li key={Math.random()}>
        <File file={file} />
      </li>
    );
  }

  render() {
    const { files } = this.props;

    return (
      <div className="filelist">
        <h2>
          <Translate>Documents</Translate>
        </h2>
        <ul>{files.map(FileList.renderFile)}</ul>
      </div>
    );
  }
}

export default FileList;

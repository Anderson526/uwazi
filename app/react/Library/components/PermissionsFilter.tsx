import React from 'react';
import SelectFilter from 'app/Library/components/SelectFilter';
import FormGroup from 'app/DocumentForm/components/FormGroup';
import { Aggregations } from 'shared/types/aggregations';
import { NeedAuthorization } from 'app/Auth';
import { Translate } from 'app/I18N';
import { Icon } from 'app/UI';

export interface PermissionsFilterProps {
  onChange: () => void;
  aggregations: Aggregations;
}

const filteredAggregation = (aggregations: Aggregations, key: string) => {
  const bucket = (aggregations?.all?.permissions?.buckets || []).find(a => a.key === key) || {
    filtered: { doc_count: 0 },
  };
  return bucket.filtered.doc_count;
};

const options = (aggregations: Aggregations) => [
  {
    label: (
      <>
        <Icon icon="pencil-alt" />
        &nbsp;
        <Translate>Can edit</Translate>
      </>
    ),
    value: 'write',
    results: filteredAggregation(aggregations, 'write'),
  },
  {
    label: (
      <>
        <Icon icon="file" />
        &nbsp;
        <Translate>Can view</Translate>
      </>
    ),
    value: 'read',
    results: filteredAggregation(aggregations, 'read'),
  },
];

export const PermissionsFilter = ({ onChange, aggregations }: PermissionsFilterProps) => (
  <NeedAuthorization roles={['admin', 'editor', 'collaborator']}>
    <FormGroup key="permissions.level" className="admin-filter">
      <SelectFilter
        model=".customFilters['permissions.level']"
        prefix="permissions.level"
        onChange={onChange}
        options={options(aggregations)}
        showBoolSwitch={false}
      />
    </FormGroup>
  </NeedAuthorization>
);

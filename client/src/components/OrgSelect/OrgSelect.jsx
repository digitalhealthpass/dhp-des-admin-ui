import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectItem } from 'carbon-components-react';

const OrgSelect = ({ orgNames, onChangeCallback }) => {
  const { t } = useTranslation();
  const PLACEHOLDER_TEXT = t('nls.ORG_SELECT.placeholder');
  const ORG_LABEL_TEXT = t('nls.ORG_SELECT.organization');

  return (
    <Select inline
      className="orgSelect"
      labelText={ORG_LABEL_TEXT}
      defaultValue="placeholder-item"
      id="orgSelect"
      onChange={(e) => {
        const value =
          e.target.value === 'placeholder-item' ? undefined : e.target.value;
        onChangeCallback(value);
      }}
    >
      <SelectItem text={PLACEHOLDER_TEXT} value="placeholder-item" />
      {orgNames.map((orgName) => (
        <SelectItem text={orgName} value={orgName} key={orgName} />
      ))}
    </Select>
  );
};

export default OrgSelect;

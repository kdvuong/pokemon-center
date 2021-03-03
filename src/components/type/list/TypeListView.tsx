import Card from "components/common/components/Card";
import ResponsiveSelect, { AnchorProps } from "components/common/components/ResponsiveSelect";
import TypeMultiplierPill from "components/pokemon/detail/components/matchup/TypeMultiplierPill";
import useFilter from "hooks/FilterHook";
import { useTypeMultiplier } from "hooks/TypeMultiplierHook";
import React, { useEffect, useState } from "react";
import { Type } from "shared/enums";
import { FilterProps } from "shared/interfaces";
import styled from "styled-components";
import { getTypeGradientColor, getTypeIcon, getTypeId, TypeFilter } from "utils/TypeFilter";

const Button = styled.button<{ pokemonType: Type | undefined }>`
  ${(props) =>
    props.pokemonType
      ? `background-image: ${getTypeGradientColor(props.pokemonType)}`
      : "background: #ccd4db"};
  border: none;
  flex: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 35px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & > span {
    text-transform: uppercase;
    color: ${(props) => (props.pokemonType ? "white" : "#6e7a8a")};
  }

  & > img {
    margin-right: 1rem;
  }
`;

const TypePillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SelectContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  & > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CardContent = styled.div`
  flex: 1;
`;

const TypeListView = () => {
  const { filter: primaryType, onChange: onPrimaryTypeChange } = useFilter<Type>(TypeFilter);
  const { filter: secondaryType, onChange: onSecondaryTypeChange } = useFilter<Type>(TypeFilter);
  const [typeIds, setTypeIds] = useState<number[]>([]);
  const { map, weakAgainst, resistAgainst, normal } = useTypeMultiplier(typeIds);

  const primaryFilterProps: FilterProps = {
    filter: TypeFilter,
    currentItem: primaryType,
    onChange: onPrimaryTypeChange,
  };

  const secondaryFilterProps: FilterProps = {
    filter: TypeFilter,
    currentItem: secondaryType,
    onChange: onSecondaryTypeChange,
  };

  useEffect(() => {
    const ids = [];
    primaryType && ids.push(getTypeId(primaryType));
    secondaryType && ids.push(getTypeId(secondaryType));
    setTypeIds(ids);
  }, [primaryType, secondaryType]);

  const renderButton = (anchorProps: AnchorProps) => {
    const { onClick, onRef, currentName } = anchorProps;
    const type = TypeFilter.getTypeFromValue(currentName);
    return (
      <Button onClick={onClick} ref={onRef} pokemonType={type}>
        {type && <img src={getTypeIcon(type)} alt={`${type}-icon`} />}
        <span>{currentName}</span>
      </Button>
    );
  };

  return (
    <div className="container">
      <SelectContainer>
        <ResponsiveSelect
          {...primaryFilterProps}
          renderAnchor={renderButton}
          label="Primary Type"
        />
        <ResponsiveSelect
          {...secondaryFilterProps}
          renderAnchor={renderButton}
          label="Secondary Type"
        />
      </SelectContainer>
      <Card>
        <CardContent>
          <span>Weak against</span>
          <TypePillContainer>
            {weakAgainst.map((type) => (
              <TypeMultiplierPill
                key={`${type}-pill`}
                type={type}
                multiplier={map.get(type) ?? 1}
              />
            ))}
          </TypePillContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <span>Resist against</span>
          <TypePillContainer>
            {resistAgainst.map((type) => (
              <TypeMultiplierPill
                key={`${type}-pill`}
                type={type}
                multiplier={map.get(type) ?? 1}
              />
            ))}
          </TypePillContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <span>Normal damage from</span>
          <TypePillContainer>
            {normal.map((type) => (
              <TypeMultiplierPill
                key={`${type}-pill`}
                type={type}
                multiplier={map.get(type) ?? 1}
              />
            ))}
          </TypePillContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypeListView;

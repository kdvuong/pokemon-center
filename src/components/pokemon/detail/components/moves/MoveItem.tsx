import React, { FunctionComponent } from "react";

interface IProps {}

const MoveItem: FunctionComponent<IProps> = (props) => {
  return (
    <tr>
      {/* {learnType === LearnType.LEVEL_UP && <td>{move.level}</td>}
      {learnType === LearnType.MACHINE && <td>{move.tm && move.tm.replace("tm", "")}</td>}
      <StyledCell>{formatName(move.name)}</StyledCell>
      <td>{formatNumberValue(move.power)}</td>
      <td>{formatNumberValue(move.accuracy)}</td>
      <td>{formatNumberValue(move.pp)}</td> */}
    </tr>
  );
};

export default MoveItem;

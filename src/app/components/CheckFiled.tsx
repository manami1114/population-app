import React from "react";
type Props = {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];
  onChange: (prefName: string, prefCode: number, check: boolean) => void;
  checkedPrefCodes: number[];
};

const CheckFiled: React.FC<Props> = ({
  prefectures,
  onChange,
  checkedPrefCodes,
}) => {
  return (
    <>
      <div className="grid">
        {prefectures.map((prefecture) => (
          <div className="checkcard" key={prefecture.prefName}>
            <input
              className="card"
              type="checkbox"
              name="Prefecture name"
              id={`checkbox${prefecture.prefCode}`}
              onChange={(e) =>
                onChange(
                  prefecture.prefName,
                  prefecture.prefCode,
                  e.target.checked
                )
              }
              checked={checkedPrefCodes.includes(prefecture.prefCode)}
            />
            <label htmlFor={`checkbox${prefecture.prefCode}`}>
              {prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckFiled;

"use client";
import {
  IAllowedKeys,
  IProductDictionary,
  ITableRow,
} from "@/app/lib/interfaces";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

type tableHeaders = Pick<IProductDictionary, "tableHeaders">;

interface IProps {
  tableRows: ITableRow[];
  dictionary: tableHeaders;
}

const TABLE_FIELDS: Array<keyof ITableRow> = [
  "article",
  "diameter",
  "length",
  "weight",
  "coating_thickness",
  "cross_section",
  "volume",
  "wall_thickness",
];

const TableTh = ({ children }: { children: ReactNode }): React.JSX.Element => {
  return (
    <Th
      fontSize={{ base: "12px", lg: "14px" }}
      fontWeight="500"
      textTransform="none"
      textAlign="center"
      color="hText"
    >
      {children}
    </Th>
  );
};

const TableTd = ({ children }: { children: ReactNode }): React.JSX.Element => {
  return (
    <Td fontSize={{ base: "12px", lg: "14px" }} py="14px" textAlign="center">
      {children}
    </Td>
  );
};

const isNotSavedEmpty = (arr: ITableRow[]) => {
  const keys: Array<keyof ITableRow> = TABLE_FIELDS;

  return arr.every((el) => {
    return keys.some((key) => el[key] !== null);
  });
};

const tableHeading = (
  arr: ITableRow[],
  nameOfField: IAllowedKeys,
  dictionary: tableHeaders,
): React.ReactElement<HTMLTableCellElement> | null => {
  const res = arr.some((el) => el[nameOfField] !== null);

  return res ? <TableTh>{dictionary.tableHeaders[nameOfField]}</TableTh> : null;
};

export const ProductTable = ({ tableRows, dictionary }: IProps) => {
  return (
    <>
      {tableRows?.length > 0 && isNotSavedEmpty(tableRows) && (
        <TableContainer mb={{ base: "41px", lg: "121px" }}>
          <Table>
            <Thead bg="tableRow">
              <Tr>
                {TABLE_FIELDS.map((el) => {
                  if (el === "id") return;

                  return tableHeading(tableRows, el, dictionary);
                })}
              </Tr>
            </Thead>
            <Tbody>
              {tableRows.map((row, index) => {
                const {
                  id,
                  article,
                  diameter,
                  length,
                  weight,
                  coating_thickness,
                  cross_section,
                  volume,
                  wall_thickness,
                } = row;

                return (
                  <Tr
                    key={id}
                    bg={index % 2 !== 0 ? "tableRow" : "transparent"}
                  >
                    {article?.length > 0 && <TableTd>{article}</TableTd>}
                    {diameter?.length > 0 && <TableTd>{diameter}</TableTd>}
                    {length?.length > 0 && <TableTd>{length}</TableTd>}
                    {weight?.length > 0 && <TableTd>{weight}</TableTd>}
                    {coating_thickness?.length > 0 && (
                      <TableTd>{coating_thickness}</TableTd>
                    )}
                    {cross_section?.length > 0 && (
                      <TableTd>{cross_section}</TableTd>
                    )}
                    {volume?.length > 0 && <TableTd>{volume}</TableTd>}
                    {wall_thickness?.length > 0 && (
                      <TableTd>{wall_thickness}</TableTd>
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

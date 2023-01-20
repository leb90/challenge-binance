import * as React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
} from "@mui/material";
import useOrderBookData from "../hooks/useOrderBookData";
import useCurrentPrice from "../hooks/useCurrentPrice";
import DecimalSelector from "./decimalSelector";
import { styled } from "@mui/material";

type FormattedOrder = {
  price: number;
  quantity: number;
  total: number;
};

const BodyBox = styled(Box)`
  &.selected {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
const TableBox = styled(TableCell)`
    &.selected {
        color: white;
    }
`;

function FormattedOrderBookData(data: any): {
  bids: FormattedOrder[];
  asks: FormattedOrder[];
} {
  const bids: FormattedOrder[] =
    data?.bids instanceof Array
      ? data.bids.map((bid: any) => {
          return {
            price: bid[0],
            quantity: bid[1],
            total: bid[0] * bid[1],
          };
        })
      : [];
  const asks: FormattedOrder[] =
    data?.asks instanceof Array
      ? data.asks.map((ask: any) => {
          return {
            price: ask[0],
            quantity: ask[1],
            total: ask[0] * ask[1],
          };
        })
      : [];

  return { bids, asks };
}

function decimalPlaceAggregator(num: any, decimalPlaces: number): string {
  const parsedNum = parseFloat(num);
  if (isNaN(parsedNum)) {
    throw new Error("The input is not a valid number");
  }
  return parsedNum.toFixed(decimalPlaces);
}

const OrderBookTable: React.FC = () => {
  const orderBookData = useOrderBookData("btcusdt", 5);
  const currentPrice = useCurrentPrice("btcusdt");
  const [backgroundColor, setBackgroundColor] = React.useState("white");

  const [decimal, setDecimalValue] = React.useState(10);

  if (Array.isArray(orderBookData) || orderBookData.length === 0)
    return <div>Loading...</div>;
  const formattedData = FormattedOrderBookData(orderBookData);

    const handleChangeBackground = () => {
        if (backgroundColor === "white") {
            setBackgroundColor("black");
        } else {
            setBackgroundColor("white");
        }
    }

  return (
    <BodyBox className={`${backgroundColor !== "white" ? "selected" : ""}`}>
      <Table>
        <TableHead>
          <TableRow>
            <TableBox className={`${backgroundColor !== "white" ? "selected" : ""}`}>Price</TableBox>
            <TableBox className={`${backgroundColor !== "white" ? "selected" : ""}`}>Amount</TableBox>
            <TableBox className={`${backgroundColor !== "white" ? "selected" : ""}`}>Total</TableBox>
          </TableRow>
          <TableRow>
            <TableCell>
              <DecimalSelector
                onSelect={setDecimalValue}
                decimalValue={decimal}
              />
              <Button color="warning" size="medium" onClick={()=> handleChangeBackground()}>background : {backgroundColor}</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedData.bids.map((bid: any, rowIndex: number) => (
            <TableRow key={rowIndex}>
              <TableCell style={{ color: "green" }}>
                {decimalPlaceAggregator(bid.price, decimal)}
              </TableCell>
              <TableCell style={{ color: "green" }}>
                {decimalPlaceAggregator(bid.quantity, decimal)}
              </TableCell>
              <TableCell style={{ color: "green" }}>
                {decimalPlaceAggregator(bid.price * bid.quantity, decimal)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableBox colSpan={3} align="center" className={`${backgroundColor !== "white" ? "selected" : ""}`}>
              Current Price: {decimalPlaceAggregator(currentPrice, decimal)}
            </TableBox>
          </TableRow>
          {formattedData.asks.map((ask: any, rowIndex: number) => (
            <TableRow key={rowIndex}>
              <TableCell style={{ color: "red" }}>
                {decimalPlaceAggregator(ask.price, decimal)}
              </TableCell>
              <TableCell style={{ color: "red" }}>
                {decimalPlaceAggregator(ask.quantity, decimal)}
              </TableCell>
              <TableCell style={{ color: "red" }}>
                {decimalPlaceAggregator(ask.price * ask.quantity, decimal)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BodyBox>
  );
};

export default OrderBookTable;

export type RowLetter = 'A' | 'B' | 'C' | 'D';
export type RowNumber = '1' | '2' | '3' | '4' | '5' | '6';

export type Row = {
  [Number in RowNumber]: {
    reserved?: boolean;
    user?: string;
  };
};

export type AllSeats = {
  [Letter in RowLetter]: Row;
};

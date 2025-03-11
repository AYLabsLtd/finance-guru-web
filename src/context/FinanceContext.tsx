import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FinanceContextType {
  moneyAtHand: number;
  setMoneyAtHand: (value: number) => void;
  downPaymentOptional: number;
  setDownPaymentOptional: (value: number) => void;
  useRestAsLumpSumSip: string;
  setUseRestAsLumpSumSip: (value: string) => void;
  downPaymentForCar: number;
  setDownPaymentForCar: (value: number) => void;
  useRestAsCarDownPayment: string;
  setUseRestAsCarDownPayment: (value: string) => void;
  resetAllValues: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [moneyAtHand, setMoneyAtHand] = useState<number>(0);
  const [downPaymentOptional, setDownPaymentOptional] = useState<number>(0);
  const [useRestAsLumpSumSip, setUseRestAsLumpSumSip] = useState<string>('No');
  const [downPaymentForCar, setDownPaymentForCar] = useState<number>(0);
  const [useRestAsCarDownPayment, setUseRestAsCarDownPayment] = useState<string>('No');

  const resetAllValues = () => {
    setMoneyAtHand(0);
    setDownPaymentOptional(0);
    setUseRestAsLumpSumSip('No');
    setDownPaymentForCar(0);
    setUseRestAsCarDownPayment('No');
  };

  return (
    <FinanceContext.Provider
      value={{
        moneyAtHand,
        setMoneyAtHand,
        downPaymentOptional,
        setDownPaymentOptional,
        useRestAsLumpSumSip,
        setUseRestAsLumpSumSip,
        downPaymentForCar,
        setDownPaymentForCar,
        useRestAsCarDownPayment,
        setUseRestAsCarDownPayment,
        resetAllValues,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
} 
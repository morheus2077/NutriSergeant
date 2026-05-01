'use client'
import { useState } from "react";
import DietForm from "./_components/diet-form";
import { DietGenerator } from "./_components/diet-generator";

export interface DietData {
  name: string,
  age: number,
  height: number,
  weight: number,
  gender: "masculino" | "feminino",
  activity_level: "sedentário" | "2x_semana" | "3x_semana" | "6x_semana",
  goal: "hipertrofia" | "manter_massa_muscular" | "perda de peso"
}

export default function Home() {
  const[data, setData] = useState<DietData | null>(null)
  const[goBack, setGoBack] = useState<boolean>(false);

  const handleSubmit = (UserPrompt: DietData) =>{
    setData(UserPrompt)
    setGoBack(false)
  }

  return (
    <>
    {!data || goBack ?(
      <DietForm onSubmit={handleSubmit}/>
    ) : (
      <DietGenerator data={data} goBack={goBack} setGoback={setGoBack}/>
    )}
    </>
    
  );
}

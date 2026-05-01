'use client '
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SparkleIcon, StopCircleIcon } from "@phosphor-icons/react";
import { DietData } from "../page";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import { Spinner } from "@/components/ui/spinner";

interface DietGeneratorProps {
    data: DietData
}

export function DietGenerator(data: DietGeneratorProps)
{
    const[output, setOutPut] = useState<string>("")
    const[isStreaming, setIsStreaming] = useState<boolean>(false)
    
    const controllerRef = useRef<AbortController | null>(null)

    async function startStreaming(){
        
        const controller = new AbortController();
        controllerRef.current = controller

        setOutPut("")
        setIsStreaming(true) 

        try{
            const response = await fetch("http://localhost:3333/plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: data.data.name,
                    age: data.data.age,
                    height: data.data.height,
                    weight: data.data.weight,
                    gender: data.data.gender,
                    activity_level: data.data.activity_level,
                    goal: data.data.goal
                }),
                //permite cancelar a requisicao a qualquer momento
                signal: controller.signal
            })

            const reader = await response.body?.getReader()
            const decoder = new TextDecoder("utf-8")

            //enquanto ainda estiver a receber dados, continua decodificar e exibir o texto
            while(true){
                const { done, value } = await reader!.read()

                if(done) break; //se nao houver mais texto para ler, sai do loop 

                //caso ainda tenha texto para ler, ele continua a decodificar e coloca dentro do estado output (concatenando com o valor anterior)
                setOutPut((output) => output + decoder.decode(value))
            }
        } catch (error: any){
            if(error.name === "AbortError"){
                console.log("REQUISICAO CANCELADA!")
                return
            }
            console.log(error)
        } finally {
            setIsStreaming(false)
            controllerRef.current = null;         
        }
    }

    async function handleGenerate(){
        if(isStreaming){
            controllerRef.current?.abort()
            setIsStreaming(false)
            return
        }

        await startStreaming();
    }

    return(
        <>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6">
            <Card className="w-full max-w-4xl border-0">

                <div className="flex justify-center gap-4">
                    <Button onClick={handleGenerate} className="cursor-pointer gap-2 rounded-2xl" >
                        {isStreaming ? <Spinner name="w-6 h-6"/> : <SparkleIcon name="w-6 h-6" />}
                        {isStreaming ? "Cancelar" : "Gerar dieta"}
                    </Button>
                </div>

                {output &&(
                    <div className="bg-card rounded-lg p-6 border border-border max-h-[500px] overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                        <Markdown
                        components={{
                            h2: ({ node, ...props }) => (
                                <h2
                                className="text-xl font-bold text-green-600 my-1"
                                {...props}
                                />
                            ),
                            h1: ({ node, ...props }) => (
                              <h2
                              className="text-2xl font-bold text-zinc-900 mb-1"
                              {...props}/>  
                            ),
                           h3: ({ node, ...props }) => (
                              <h3
                              className="text-lg font-bold text-blue-500 mb-1"
                              {...props}/>  
                            ),
                            strong: ({ node, ...props }) => (
                                <strong
                                className=""
                                {...props}
                                />
                            ),
                            li: ({ node, ...props }) => (
                                <li
                                className="before:content-['-'] before:mr-1"
                                {...props}
                                />
                            )                        
                        }}
                        >
                            {output}
                        </Markdown>
                    </div>
                </div>
                )}
            </Card>
        </div>
        </>
    )
}
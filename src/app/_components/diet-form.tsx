'use client'
import { Card } from '@/components/ui/card';
import { ForkKnifeIcon } from '@phosphor-icons/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import TextType from '../../components/TextType';
import Orb from '@/components/Orb';

export const DietPlanRequestSchema = z.object({
    name: z.string().min(2, "O nome é obrigatório"),
    age: z.number().positive(),
    height: z.number().positive(),
    weight: z.number().positive(),
    gender: z.enum(["masculino","feminino"], { error: "Erro, selecione o sexo" }),
    activity_level: z.enum(["sedentário", "2x_semana", "3x_semana", "6x_semana"], { error: "Erro, selecione o nível de actividade" }),
    goal: z.enum(["hipertrofia", "manter massa muscular", "perda de peso"], { error: "Erro, selecione o objectivo" })
})

export type DietSchemaFormData = z.infer<typeof DietPlanRequestSchema>;

interface DietFormProps {
    onSubmit: (data: DietSchemaFormData) => void;
}

export default function DietForm({ onSubmit }: DietFormProps){

    const form = useForm<DietSchemaFormData>({
        resolver: zodResolver(DietPlanRequestSchema),
        defaultValues: {
            name: "",
            age: undefined,
            height: undefined,
            gender: undefined,
            activity_level: undefined,
            goal: undefined   
        }
    })

    return(
        <>
        <div className='min-h-screen flex items-center justify-center lg:p-4 rounded bg-blue-950'>
            <Card className='w-full lg:max-w-2xl border-0 h-screen  lg:h-auto overflow-y-auto lg:rounded-4xl'>
                <div className='p-8 '>
                  <div className="text-center mb-8 text-blue-600">
                    <div className="flex items-center justify-center mb-4 mx-auto">
                      <ForkKnifeIcon className="w-14 h-14" />
                      </div>
                      <TextType
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor
                      cursorCharacter="_"
                      className='text-2xl md:text-3xl'
                      deletingSpeed={100}
                    >
                      Calcule a sua dieta
                    </TextType>
                    </div>
                    
                    <Form 
                    {...form}
                    >
                        <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                        >

                            <div className='space-y-3 md:space-y-4'>
                                <h3 className='text-lg font-semibold text-gray-900 flex items-center'>
                                    Dados pessoais
                                </h3>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) =>(
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder='Digite o seu nome...'
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />

                                <div className="flex gap-3">
                                  <FormField
                                  control={form.control}
                                  name="age"
                                  render={({ field }) =>(
                                      <FormItem>
                                          <FormLabel>Idade</FormLabel>
                                          <FormControl>
                                              <Input
                                              type='number'
                                              step="any"
                                              {...form.register("age", {
                                                  setValueAs: (v) => v === "" ? undefined : Number(v)
                                              })}
                                              placeholder='Ex: 19'
                                              />
                                          </FormControl>
                                      </FormItem>
                                  )}
                                  />
                                                    <FormField
                                                      control={form.control}
                                                      name="weight"
                                                      render={({ field }) => (
                                                        <FormItem>
                                                          <FormLabel>Peso em kg</FormLabel>
                                                          <FormControl>
                                                            <Input
                                                              type='number'
                                                              step="any"
                                                              {...form.register("weight", {
                                                                setValueAs: (v) => v === "" ? undefined : parseFloat(v),
                                                              })}
                                                              placeholder='Ex: 28'
                                                            />
                                                          </FormControl>
                                                        </FormItem>
                                                      )}
                                                    />
                                </div>

                            </div>

                              {/* SEXO E ALTURA*/}
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                <div className="flex gap-3">

                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Altura em cm</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            step="any"
                            {...form.register("height", {
                              setValueAs: (v) => v === "" ? undefined : parseFloat(v),
                            })}
                            placeholder='Ex: 28'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione o sexo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* CAMPOS ATIVIDADE, NIVEL */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name="activity_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível de atividade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione o nivel de atividade" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="sedentário">Sedentário</SelectItem>
                          <SelectItem value="2x_semana">2x por semana</SelectItem>
                          <SelectItem value="3x_semana">3x por semana</SelectItem>
                          <SelectItem value="6x_semana">6x por semana</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione o seu objetivo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="perda de peso">Perda de peso</SelectItem>
                          <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                          <SelectItem value="manter massa muscular">Manter massa muscular</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' className='w-full mt-4 hover:opacity-90 cursor-pointer bg-blue-600'>
                Gerar minha dieta
              </Button>
            </form>
            </Form>
                </div>       
            </Card>
        </div>
        </>
    )
}
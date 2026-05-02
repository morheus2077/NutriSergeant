'use client'

import Orb from '@/components/Orb';
import ElectricBorder from '../../components/ElectricBorder'
import { Button } from '@base-ui/react';
import SplitText from "../../components/SplitText";
import ShinyText from '../../components/ShinyText';
import Link from 'next/link';


export default function HomePage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">

      <div className="absolute inset-0 z-0">
        <Orb
        hoverIntensity={2}
        rotateOnHover
        hue={0}
        forceHoverState={false}
        backgroundColor=""  
        />
      </div>

      {/* conteúdo */}
      <section className="relative z-10 flex h-full items-center justify-center">
        <div className='flex flex-col gap-3 justify-center items-center'>
            <SplitText
            text="Gere a sua dieta em menos de 30 segundos!🚀"
            className="md:text-5xl 
            text-2xl
            font-extrabold text-white max-w-xl"
            delay={30}
            duration={1.20}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            />
            
            <ElectricBorder
            className='mt-5'
            color="#7df9ff"
            speed={1}
            chaos={0.12}
            style={{ borderRadius: 16, width: 200, height: 50 }}
            >
            <Link href="/generate">
                <Button className="text-xl font-extrabold text-white flex items-center justify-center py-3 px-8 cursor-pointer bg-transparent hover:bg-white     transition-all duration-200 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/20 hover:text-black
                active:scale-95 rounded-2xl hover:border-black">
                    <span>Gerar Dieta</span>
                </Button>
            </Link>
        </ElectricBorder>
        </div>
      </section>
    </main>
  );
}